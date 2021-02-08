<template>
<div class="u-main-wrapper">
    <nav class="u-main-menu">
        <div class="u-menu-body" v-if="isInitialized">
            <div class="u-menu-title">카테고리</div>
            <div v-if="categories" class="u-menu-categories">
                <div class="u-menu-category" v-for="category in categories"
                    :key="category.name"
                    :class="{ 'u-menu-active-category' : activeCategory && category.value === activeCategory.value }"
                    @click="changeCategory(category)">
                    <b-icon :icon="category.icon" :variant="category.variant"></b-icon>
                    {{category.name}}
                </div>
            </div>
            <div v-if="categoryTags.length > 0" class="u-menu-title">
                태그
                <b-badge class="u-menu-all-tag-toggle-btn"
                    pill
                    v-if="categoryTags.length > 0"
                    @click="toggleAllTags()"
                    :variant="activeTagCount > 0 ? 'dark': 'secondary'">
                    <b-icon icon="check"></b-icon>
                    전체
                </b-badge>
            </div>
            <div v-if="categoryTags.length > 0" class="u-menu-tags">
                <b-badge class="u-menu-tag"
                    v-for="tag in categoryTags"
                    :key="tag.name"
                    :class="tag.class"
                    @click="toggleTag(tag)">
                    {{tag.name}}
                </b-badge>
            </div>
            <div v-if="demos.length > 0" class="u-menu-title">
                데모
            </div>
            <div class="u-menu-demos">
                <div class="u-menu-dmove" v-for="demo in demos"
                    :key="demo.name">
                    <b-icon icon="link45deg"></b-icon>
                    <a target="_blank" :href="demo.src">{{demo.name}}</a>
                </div>
            </div>
        </div>
        <footer class="u-menu-footer">
            <a v-if="isInitialized" class="u-mene-readme-link" target="_blank" :href="readmeUrl">
                <b-icon  class="u-menu-about-icon" icon="question-circle-fill"></b-icon>
                about
            </a>
        </footer>
    </nav>
    <section class="u-main-content">
        <b-sidebar v-if="isInitialized" class="u-mobile-posts-menu"
            id="sidebar-posts-menu"  width="180px"
            no-header
            backdrop
            shadow
            backdrop-variant="transparent">
            <aside class="u-menu-body" v-if="isInitialized">
                <div class="u-menu-title">카테고리</div>
                <div v-if="categories" class="u-menu-categories">
                    <div class="u-menu-category" v-for="category in categories"
                        :key="category.name"
                        :class="{ 'u-menu-active-category' : activeCategory && category.value === activeCategory.value }"
                        @click="changeCategory(category)">
                        <b-icon :icon="category.icon" :variant="category.variant"></b-icon>
                        {{category.name}}
                    </div>
                </div>
                <div v-if="categoryTags.length > 0" class="u-menu-title">
                    태그
                    <b-badge class="u-menu-all-tag-toggle-btn"
                        pill
                        v-if="categoryTags.length > 0"
                        @click="toggleAllTags()"
                        :variant="activeTagCount > 0 ? 'dark': 'secondary'">
                        <b-icon icon="check"></b-icon>
                        전체
                    </b-badge>
                </div>
                <div v-if="categoryTags.length > 0" class="u-menu-tags">
                    <b-badge class="u-menu-tag"
                        v-for="tag in categoryTags"
                        :key="tag.name"
                        :class="tag.class"
                        @click="toggleTag(tag)">
                        {{tag.name}}
                    </b-badge>
                </div>
                <div v-if="demos.length > 0" class="u-menu-title">
                    데모
                </div>
                <div class="u-menu-demos">
                    <div class="u-menu-dmove" v-for="demo in demos"
                        :key="demo.name">
                        <b-icon icon="link45deg"></b-icon>
                        <a target="_blank" :href="demo.src">{{demo.name}}</a>
                    </div>
                </div>
            </aside>
            <aside class="u-menu-footer">
                <a v-if="isInitialized" class="u-mene-readme-link" target="_blank" :href="readmeUrl">
                    <b-icon  class="u-menu-about-icon" icon="question-circle-fill"></b-icon>
                    about
                </a>
            </aside>
        </b-sidebar>
        <aside class="u-main-title">
            <div>
                <b-button squared class="u-menu-toggle-btn" v-b-toggle.sidebar-posts-menu variant="light" size="sm">
                    <i class="icon-menu"></i>
                </b-button>
                <b-button-group class="u-posts-display-type-btn">
                    <b-button squared variant="light" size="sm"
                        v-for="displayType in displayTypes"
                        :class="{'active': displayType.value === display.value}"
                        :key="displayType.value"
                        @click="changeDisplay(displayType)"
                        >
                        <i :class="displayType.class"></i>
                    </b-button>
                </b-button-group>
            </div>
            <div>
                <b-button squared class="u-posts-orderby-btn" variant="light" size="sm" @click="toggleOrderby()">
                    <b-icon-arrow-down-up></b-icon-arrow-down-up>
                    {{activeOrderby.name}}
                </b-button>
            </div>
        </aside>
        <section class="u-posts" v-bind:class="[postsClass]">
            <post-item v-for="post in postList" :key="post.name" :post="post" :display="postsDisplay"></post-item>
            <div class="u-no-post" v-if="isInitialized && postList.length === 0">
                <b-icon icon="exclamation-circle-fill" variant="warning"></b-icon>
                등록된 포스트가 없습니다.
            </div>
            <div class="u-posts-inprogress" v-if="! isInitialized">
                <b-icon icon="three-dots" animation="cylon" font-scale="2"></b-icon>
            </div>
        </section>
    </section>
</div>

</template>

<script>

import PostItem from "../PostItem.vue";
import { mapGetters, mapActions, mapState} from 'vuex';

export default {
    name: 'Posts',
    data: function ()
    {
        return {
            post: undefined,
            display: undefined,
            displayTypes:
            [
                { class: 'icon-list', value: 'list' },
                { class: 'icon-grid', value: 'grid' },
            ],
            orderby:
            [
                { name: '최신순', value: 'desc' },
                { name: '오래된순', value: 'asc' }
            ],
            demos:
            [
                // { name: 'Test', src: 'https://himupsi.github.io/test.html'}
            ],
            readmeUrl: 'https://github.com/himupsi/himupsi.github.io/blob/master/README.md'
        }
    },
    methods:
    {
        init: function ()
        {   
            this.setCategory(this.categories[0]);
            this.setInitialPosts();
        },
        ...mapActions([ 'setCategory', 'setOrderby', 'toggleTag' ]),
        toggleOrderby: function ()
        {
            let i;

            for(i = 0; i < this.orderby.length; i++)
            {
                if (this.orderby[i].value !== this.activeOrderby.value)
                {
                    this.setOrderby(this.orderby[i]);
                    break;
                }
            }
        },
        viewPage: function (page)
        {
            this.$router.push({ name: 'page', params: { pagename: page.name, src: page.src } });
        },
        viewAbout: function ()
        {
            this.$router.push({ name: 'about' });
        },
        changeDisplay: function (displayType)
        {
            this.display = displayType;
            this.setInitialPosts();
        },
        changeCategory(category)
        {
            let thisPosts = this;
            if (category === this.activeCategory)
                return;
            this.setCategory(category).then(function ()
            {
                thisPosts.setInitialPosts();
            });
        },
        setInitialPosts()
        {
            let thisPosts = this;
            let mainElem = document.getElementById('main');
            let intervalid = setInterval(function ()
            {
                if (thisPosts.hasNext && (mainElem.offsetHeight === mainElem.scrollHeight))
                    thisPosts.$parent.getNextPosts();
                else
                    clearInterval(intervalid);
            });
        },
        toggleAllTags()
        {
            if (this.activeTagCount === 0)
                this.toggleTag('all');
            else
                this.toggleTag('empty');
        }
    },
    components: {
        PostItem
    },
    computed: {
        postsDisplay()
        {
            return this.display.value;
        },
        postsClass: function ()
        {
            return 'u-posts-' + this.postsDisplay;
        },
        ...mapGetters([ 'postList', 'isInitialized', 'hasTemp', 'hasNext', 'categoryTags', 'categories' ]),
        ...mapState({ activeCategory: 'category', activeOrderby: 'orderby' }),
        activeTagCount: function ()
        {
            let i, cnt;

            cnt = 0;
            for (i = 0; i < this.categoryTags.length; i++)
            {
                if (this.categoryTags[i].isActive)
                    cnt++;
            }
            return cnt;
        }
    },
    beforeMount: function () {
        this.setOrderby(this.orderby[0]);
        this.display = this.displayTypes[0]     
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
