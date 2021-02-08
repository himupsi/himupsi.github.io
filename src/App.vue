<template>
    <div>
        <Header></Header>
        <Content></Content>
    </div>
</template>


<script>
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import {mapActions} from 'vuex';

export default {
    name: 'App',
    metaInfo: function () {
        return {
            title: this.$Config.BLOG_TITLE,
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$Config.BLOG_DESCRIPTION
                },
                {
                    property: 'og:site_name',
                    content: this.$Config.BLOG_TITLE,
                    vmid: 'og:site_name'
                },
                {
                    property: 'og:description',
                    content: this.$Config.BLOG_DESCRIPTION,
                    vmid: 'og:description'
                },
                {
                    property: 'og:image',
                    content: `${this.$Config.BLOG_URL}/og_image.jpg`,
                    vmid: 'og:image'
                },
                {
                    property: 'og:type',
                    content: 'website',
                    vmid: 'og:type'
                },
                {
                    property: 'og:url',
                    content: this.$Config.BLOG_URL,
                    vmid: 'og:url'
                }
            ]
        }
    },
    methods: {
        ...mapActions(['patchPostList'])
    },
    mounted: function ()
    {
        this.patchPostList();
    },
    components:
    {
        Header, Content
    }
}
</script>


<style>

@import './styles/app.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
