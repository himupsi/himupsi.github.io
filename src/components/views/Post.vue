<template>
<section class="u-main-wrapper u-post">
    <div class="u-main-content">
        <section class="u-post-title">
            <b-button squared variant="light" size="sm" class="u-back-btn" @click="back()">
                <b-icon icon="chevron-left"></b-icon>
                뒤로
            </b-button>
            <span v-if="content">{{content.title}}</span>
        </section>
        <article class="u-post-content">
            <div class="u-post-inprogress" v-if="! content">
                <b-icon icon="three-dots" animation="cylon" font-scale="2"></b-icon>
            </div>
            <div v-if="content" class="markdown-body" v-html="content.markdown"></div>
        </article>
        <aside v-if="content" class="u-post-info">
            <div class="u-post-tags">
                <b-badge class="u-post-tag"
                    v-for="tag in content.tags" :key="tag">
                    {{tag}}
                </b-badge>
            </div>
            <b-badge v-if="relativeDate" class="u-post-date"
                v-b-tooltip.hover :title="createDate">
                {{relativeDate}}
            </b-badge>
        </aside>
        <aside v-show="content" class="u-post-comments">
            <div id="disqus_thread"></div>
        </aside>
    </div>
</section>
</template>

<script>

import marked from "marked";
import hljs from 'highlight.js';
import moment from 'moment';
import 'moment/locale/ko';
import {mapActions, mapGetters} from 'vuex';

marked.setOptions({
    highlight: function(code, lang) {
        return lang !== '' ? hljs.highlight(lang, code).value : code;
    }
});

export default {
    name: 'Post',
    data: function ()
    {
        return {
            content: undefined,
            createDate: undefined,
            relativeDate: undefined
        };
    },
    metaInfo: function ()
    {
        let metaInfo;

        metaInfo = {
            title: this.$Config.BLOG_TITLE,
            meta:[
                {
                    property: 'og:type',
                    content: 'article',
                    vmid: 'og:type'
                }
            ]
        }

        if (this.content === undefined)
            return metaInfo;

        if (this.content.title)
        {
            metaInfo.title += (' - ' + this.content.title);
            metaInfo.meta.push({
                property: 'og:title',
                content: metaInfo.title,
                vmid: 'og:title'
            });
        }
            
        if (this.content.summary)
        {
            metaInfo.meta.push({
                vmid: "description",
                name: "description",
                content: this.content.summary
            });
            metaInfo.meta.push({
                property: 'og:description',
                content: this.$Config.BLOG_DESCRIPTION,
                vmid: 'og:description'
            });
        }
        if (this.content.thumbnail)
        {
            metaInfo.meta.push({
                property: 'og:image',
                content: `${this.$Config.BLOG_URL}${this.$Config.IMAGE_PATH}${this.content.thumbnail}?raw=true`,
                vmid: 'og:image'
            });
        }
        return metaInfo;
    },
    methods:
    {
        back: function ()
        {
            this.$router.push({ name: 'posts' });
        },
        init: function ()
        {
            let thisPost = this;
            let postid = this.$route.params.postid;
            this.content = this.$store.state.postContentMap[postid];

            if (this.content === undefined)
            {
                thisPost.$router.push({ name: 'notFound' });
                return;
            }
            this.content.markdown = marked(this.content.md);
            this.setDisplayDate(this.content.createDate);
            let disqus_config = function () {
            this.page.url = (window.location.host + window.location.pathname);
            this.page.identifier = this.$route.params.postid;
            };

            (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://' + thisPost.$Config.DISQUS_SHORTNAME + '.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
        },
        setDisplayDate: function (dateStr)
        {
            if (dateStr === undefined)
                return;
            let dateMoment = moment(dateStr, 'YYYYMMDDhhmm')
            this.relativeDate = dateMoment.fromNow();
            this.createDate = dateMoment.format('LLL');
        },
        ...mapActions(['setPostContent']),
    },
    computed:
    {
        ...mapGetters([ 'isInitialized' ]),
    },
    mounted: function ()
    {
    },
    beforeMount: function ()
    {
        let thisPost = this;

        if (this.isInitialized)
            this.init();
    },
    watch: {
        isInitialized: function (newVal)
        {
            if (! newVal)
                return;
            this.init();
        },
    },
}
</script>
