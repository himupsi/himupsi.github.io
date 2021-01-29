<template>
<main class="u-main" id="main">
    <router-view></router-view>
</main>
</template>

<script>

import debounce from 'lodash/debounce';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Content',
    data: function ()
    {
        return {}
    },
    computed:
    {
        ...mapGetters([ 'hasNext' ]),
    },
    methods:{
        ...mapActions([ 'nextPage' ]),
        handleScroll(e) {
            let thisContent = this;

            if (e.target.scrollTop > 80)
            {
                this.blogHeaderELem.style.opacity = 0;
                this.blogHeaderELem.style.pointerEvents = 'none';
            }
            else
                this.setBlogHaerDisplay(e.target.scrollTop);

            if (this.$route.name !== 'posts')
                return;
            if (this.hasNext && (e.target.scrollHeight - e.target.scrollTop) <= e.target.offsetHeight)
                this.getNextPosts();
        },
        getNextPosts: function ()
        {
            let thisContent = this;
            return this.nextPage();
        },
        setBlogHaerDisplay(scrollTop)
        {
            let opacity;

            if (this.blogHeaderELem !== undefined)
            {
                opacity = Math.max((this.$Config.HIDE_HEADER_SCROLL_TOP - scrollTop) / this.$Config.HIDE_HEADER_SCROLL_TOP, 0)
                this.blogHeaderELem.style.opacity = opacity;
                if (opacity < 0.7)
                    this.blogHeaderELem.style.pointerEvents = 'none';
                else
                    this.blogHeaderELem.style.pointerEvents = 'auto';
            }
        }
    },
    mounted() {
        this.mainElem = document.getElementById('main');
        this.blogHeaderELem = document.getElementById('blogHeader')
        this.handleDebouncedScroll = debounce(this.handleScroll, 10);
        this.mainElem.addEventListener('scroll', this.handleDebouncedScroll);
        this.setBlogHaerDisplay(this.mainElem.scrollTop);
    },
    beforeDestroy() {
        this.mainElem.removeEventListener('scroll', this.handleDebouncedScroll);
    }
}
</script>