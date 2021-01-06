<template>
<div class="u-main-wrapper u-about">
    <div class="u-main-content">
        <div class="u-resume-title">
            <b-button squared variant="light" size="sm" class="u-back-btn" @click="back()">
                <b-icon icon="chevron-left"></b-icon>
                뒤로
            </b-button>
            이력
        </div>
        <div class="u-resume-content">
            <div class="markdown-body" v-html="resume"></div>
        </div>
    </div>
</div>
</template>

<script>

import marked from "marked";

const resume = `
작성중.
`;

export default {
    name: 'Resume',
    metaInfo: function () {
        return {
            title: '힘없이 Devlog - 이력'
        }
    },
    data: function ()
    {
        return {
            resume: marked(resume)
        }

    },
    methods:
    {
        back: function ()
        {
            this.$router.push({ name: 'posts' });
        }
    }
}
</script>