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
        title: '힘없이 Devlog'
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
