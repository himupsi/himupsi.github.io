const Config = {
    BLOG_HEADER_TITLE: 'HIMUPSI DEVLOG',
    BLOG_TITLE: '힘없이 Devlog',
    BLOG_DESCRIPTION: '직접 만드는 블로그..',
    HIDE_HEADER_SCROLL_TOP: 50,
    POSTS_URL: 'https://himupsi.github.io/posts.json',
    POSTS_REPO_URL: 'https://api.github.com/repos/himupsi/himupsi.github.io/contents/posts/',
    IMAGE_PATH: '/images/',
    BLOG_URL: 'https://himupsi.github.io',
    PAGE_SIZE: 10,
    DISQUS_SHORTNAME: 'himupsi-github',
    EMAIL: 'u123u123@naver.com',
    GITHUB_URL: 'https://github.com/himupsi?tab=repositories',
    CATEGORIES: 
    [ 
        { name: '전체', value: 'all', icon: 'heart-fill', variant: 'danger' },
        { name: '개발', value: '개발', icon: 'code-square' , variant: 'dark' },
        { name: '리뷰', value: '리뷰', icon: 'box', variant: 'primary' },
        { name: '일상', value: '일상', icon: 'emoji-laughing-fill', variant: 'warning' },
        { name: '생각', value: '생각', icon: 'chat-dots-fill', variant: 'info' }
    ]
}

export default Config;
