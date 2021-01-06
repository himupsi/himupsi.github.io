-----
title: marked.js 코드 블록 하이라이트 시키기
thumbnail: marked_highlight.png
summary: marked.js 에 highlight.js 적용하기
createDate: 202012231100
category: 개발
tags: [ marked.js, highlight.js ]
-----

#### marked.js 에 코드 블록 하이라이트

[marked](https://marked.js.org/)로 파싱한 마크다운에서 코드 블록이 심심하게 표시된다. 검색해보니 [highlight.js](https://highlightjs.org/) 를 적용할 수 있다고 한다.

* 적용하기

    ``` javascript
    import marked from "marked";
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark-reasonable.css';

    marked.setOptions({
        highlight: function(code, lang) {
            // lang 값이 없을 경우 highlight 함수에서 에러가 발생한다.
            return lang !== '' ? hljs.highlight(lang, code).value : code;
        }
    });
    ```

* 코드 테마 미리보기
    * https://highlightjs.org/static/demo/ 여기를 참고
    * css 파일은 `/node_modules/highlight.js/styles` 안에 들어있다. 테마 이름과 거의 비슷한 이름으로 css파일이 존재한다. css 파일 이름을 확인하고 import 하면 된다.
    * 이상하게 백그라운드 색은 적용이 안되는 것 같다.. 보기 나쁘지 않으므로 그냥 사용한다.

* 참고
    * https://stackoverflow.com/questions/48843806/how-to-use-npm-marked-with-highlightjs