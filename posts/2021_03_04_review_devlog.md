-----
title: Github 페이지(Devlog) 개발 후기
summary: Vue.js 로 Devlog 만들면서 느낀점.
thumbnail: devlog_kakaotalk.png
createDate: 202103040100
category: 개발
tags: [ Vue.js, Github Page ]
-----

## Github Page

무료로 블로그를 호스팅 할수 있어서 좋다. 물론 WAS 쪽을 구현할 수 없다는 한계도 있지만 **무료** 라서 만족한다.
**정적 웹페이지**로 만들어야 한다... ㅎㅎ
 이미 Github Page 블로그를 쉽게 만들수 있는 번들(?)도 존재 하지만 Vue.js로 직접 블로그를 개발해서 사용할수 있다는 것에 매우 만족한다.

## SEO(검색 엔진 최적화)

블로그를 만들면서 최고의 난관이었다. 이전까지의 개발에서는 검색엔진에 관해 생각해지도 않았었는데 블로그가 검색되지 않으면 결국 혼자만의 일기장이 될까봐 걱정했었다. 다행히 누군가 해결책([spa-github-pages](https://github.com/rafgraph/spa-github-pages))을 제시해주었다. 문제점을 수정하고 반영되는데 시간이 많이 걸려 해결하는데 시간이 많이 걸렸다. sitemap.xml 이 구글에 반영되는데 일주일은 넘게 소요되는 듯하다.

SPA 와  Github page 조합일 때 문제점들을 간단히 요약하자면

1. 블로그의 하위 주소로 치고 들어오면 Github page 에서 404 페이지로 보내버린다.
1. 404 페이지에서 리다이렉트를 해주어도 검색엔진이 크롤링 할때에는 이것을 인지하지 못하고  404 에러로 받아들인다. 
* [spa-github-pages](https://github.com/rafgraph/spa-github-pages)의 해결책을 간단히 설명하자면 URL을 파라미터 처럼 인식하도록 도메인 뒤에 `?`를 추가해서 sitemap.xml을 만들고  index.html 에서도 `?`뒤에 들어온 URL을 처리하는 로직을 추가하는 방법이다.

## Azure pipeines

Microsoft Azure 에서 CI/CD를 무료로 사용할수 있게 해줘서 포스팅을 작성할 때마다 빌드 해야했던 번거로움을 없앨수 있었다. Azure pipeines에서 포스팅 파일 파싱하고 sitemap.xml 이 자동으로 생성되도록 했다. 역시 머리를 써야 손발이 고생을 안한다..