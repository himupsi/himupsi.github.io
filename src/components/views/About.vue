<template>
<div class="u-main-wrapper u-about">
    <div class="u-main-content">
        <div class="u-about-title">
            <b-button squared variant="light" size="sm" class="u-back-btn" @click="back()">
                <b-icon icon="chevron-left"></b-icon>
                뒤로
            </b-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'About',
    methods:
    {
        back: function ()
        {
            this.$router.push({ name: 'posts' });
        }
    }
}
</script>