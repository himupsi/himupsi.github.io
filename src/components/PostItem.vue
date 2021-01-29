<template>
    <div class="u-post-item" @click="viewPost()" >
        <div class="u-post-item-wrapper u-post-item-inprogress" v-if="! content">
            <b-icon icon="three-dots" animation="cylon" font-scale="1"></b-icon>
        </div>
        <div class="u-post-item-wrapper" v-if="content">
            <div class="u-post-item-thumbnail"
                v-if="display === 'list' && content.thumbnailUrl">
                <img class="u-post-item-image" :src="content.thumbnailUrl"/>
            </div>
            <div class="u-post-item-content">
                <div class="u-post-item-header">
                    <div class="u-post-item-title"
                        v-if="content.title">
                        {{content.title}}
                    </div>
                </div>
                <div class="u-post-item-body">
                    <div class="u-post-item-thumbnail"
                        v-if="display === 'grid' && content.thumbnailUrl">
                        <img class="u-post-item-image" :src="content.thumbnailUrl"/>
                    </div>
                    <div class="u-post-item-summary"
                        v-if="content.summary">
                        {{content.summary}}
                    </div>
                </div>
                <div class="u-post-item-footer">
                    <div class="u-post-item-tags">
                        <b-badge class="u-post-item-tag"
                            v-for="tag in content.tags" :key="tag">
                            {{tag}}
                        </b-badge>
                    </div>
                    <b-badge class="u-post-item-date"
                        v-if="relativeDate"
                        variant="light"
                        v-b-tooltip.hover
                        :title="createDate">
                        {{relativeDate}}
                    </b-badge>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import moment from 'moment';
import 'moment/locale/ko';
import { mapActions } from 'vuex'

export default {
    name: 'PostItem',
        props: ['post', 'display'],
    data: function ()
    {
        return {
            content: undefined,
            createDate: undefined,
            relativeDate: undefined
        };
    },
    methods: {
        viewPost: function () {
            if (this.content !== undefined)
                this.$router.push({ name: 'post', params: { postid: this.content.id } })
        },
        ...mapActions(['setPostContent']),
        setDisplayDate: function (dateStr)
        {
            if (dateStr === undefined)
                return;
            let dateMoment = moment(dateStr, 'YYYYMMDDhhmm')
            this.relativeDate = dateMoment.fromNow();
            this.createDate = dateMoment.format('LLL');
        }
    },
    mounted: function ()
    {
        let thisPostItem = this;
        this.content = this.$store.state.postContentMap[this.post.id]
        if (this.content.thumbnail !== undefined)
            this.content.thumbnailUrl = (this.$Config.IMAGE_URL + this.content.thumbnail + '?raw=true');
        this.setDisplayDate(this.content.createDate);
    }
}
</script>