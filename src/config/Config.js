const Config = {
    BLOG_TITLE: 'HIMUPSI DEVLOG',
    HIDE_HEADER_SCROLL_TOP: 50,
    POSTS_URL: 'https://himupsi.github.io/posts.json',
    POSTS_REPO_URL: 'https://api.github.com/repos/himupsi/himupsi.github.io/contents/posts/',
    IMAGE_URL: '/images/',
    BLOG_URL: 'https://himupsi.github.io',
    PAGE_SIZE: 10,
    DISQUS_SHORTNAME: 'himupsi-github',
    EMAIL: 'u123u123@naver.com',
    GITHUB_URL: 'https://github.com/himupsi?tab=repositories',
    CATEGORIES: 
    [ 
        { name: '전체', value: 'all', icon: 'heart-fill', variant: 'danger' },
        { name: '개발', value: '개발', icon: 'code-square' , variant: 'dark' },
        { name: '일상', value: '일상', icon: 'emoji-laughing-fill', variant: 'warning' },
        { name: '생각', value: '생각', icon: 'chat-dots-fill', variant: 'info' },
        //{ name: '기타', value: undefined, icon: 'grip-horizontal', variant: 'secondary' },
        { name: '임시', value: 'temp', icon: 'box', variant: 'secondary' }
    ]
}

export default Config;
