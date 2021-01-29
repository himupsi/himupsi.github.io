<template>
<section>
    <div class="u-main-content">
        <div class="u-page-not-found">
            <div class="u-align-center">
                <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
                페이지를 찾을 수 없습니다.
            </div>
            <div class="u-align-center">
                <b-button squared variant="ligth" size="sm" class="u-home-btn" @click="back()">
                    <b-icon icon="house-door-fill"></b-icon>
                    홈으로
                </b-button>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'NotFound',
    metaInfo: function () {
        return {
            title: '힘없이 Devlog - 페이지를 찾을 수 없습니다.'
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