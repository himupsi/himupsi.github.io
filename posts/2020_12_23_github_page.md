-----
title: GitHub Page 만들기 - hello world
summary: 시작이 반. hello world 페이지 만들기
thumbnail: github_logo.jpg
createDate: 202012230900
category: 개발
tags: [ Github, Github Page ]
-----

#### Github page

Github repository 를 이용하여 개인 홈페이지 또는 블로그를 만들수 있다. 공식적으로 [Github page]((https://pages.github.com/))라는 이름으로 서비스하고 있다.
백엔드는 사용할 수 없기때문에 정적 웹 페이지(Static web page)로 만들어야 한다.

* 참고로 보통 아래 두개의 번들?을 이용해 블로그를 만듷어 사용하는 것 같다. 둘다 테마도 지원하고 npm 또는 gem 명령으로 쉽게 설치가 가능하다.
    * [Jekyll](https://jekyllrb.com/): Github page에서 언급하고 있다. rubygems 명령을 이용해야되서 조금 불편하다.
    * [Hexo](https://hexo.io/docs/github-pages): 사용해보지는 않았지만 npm 명령만으로 설치가 끝나는거 같다.

#### hello world 페이지 만들기

1. GitHub에 레파지토리를 만든다.
    * 레파지토리 이름: `{사용자ID}.github.io`
1. index.html 을 만들고 커밋하고 푸쉬한다.
    * 간단히 아래 처럼 hello world만 입력하고 커밋한다.
        ```
            hello world
        ```
1. `https://{사용자ID}.github.io/` 에 접속하고 확인해본다.
    * 푸쉬 후 바로 적용되지는 않는다. 푸시하고 좀 기다려야한다.(10초?)

1. Github의 repository 설정을 통해 경로와 branch를 설정할 수 있다.

    ![스크린샷](/images/20201223_1_1.png)