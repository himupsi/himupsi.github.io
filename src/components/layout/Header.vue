<template>
    <header class="u-header" id="blogHeader">
        <div onclick="location.href='https://himupsi.github.io';" class="u-home-title">
            {{$Config.BLOG_HEADER_TITLE}}
        </div>    
        <div class="u-right-links">
            <a class="u-header-mail-link" :href="mailToHref">
                <i class="icon-paper-plane"></i>
            </a>
            <a class="u-header-github-link" target="_blank" :href="githubHref">
                <i class="icon-github"></i>
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data: function ()
    {
        return {
            mailToHref: 'mailto:' + this.$Config.EMAIL,
            githubHref: this.$Config.GITHUB_URL
        }
    }
}
</script>
