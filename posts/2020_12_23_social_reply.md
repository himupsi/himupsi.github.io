-----
title: 블로그에 소셜 댓글 기능 추가하기
thumbnail: disqus_logo.png
summary: Disqus를 이용해 댓글 기능 추가하기(Vue.js에서 적용하기)
createDate: 202012231330
category: 개발
tags: [ Disqus, Vue.js ]
-----

고맙게도 무료로 댓글을 사용할수 있게 해주는 [Disqus](https://disqus.com/) 가 있다. 

적용하는 절차는 다음과 같다.

1. Disqus에 가입한다.

1. 가입하고 화면의 `GET STARTED`를 누른다.

    ![스크린샷](/images/20201223_2_1.png?raw=true)

1. `I want to install diqus on my site`를 선택한다.

    ![스크린샷](/images/20201223_2_2.png?raw=true)

1. 사이트 정보를 입력하고 `Create Site`를 누른다.

    ![스크린샷](/images/20201223_2_3.png?raw=true)

1. 그냥 무료인 `Basic`를 선택한다.

    ![스크린샷](/images/20201223_2_4.png?raw=true)

1. 블로그를 어떤 걸로 구축했는지에 따라 선택하면 된다. 이 블로그는 vue.js기반으로 만들고 있기 때문에 맨아래 `Universal code`를 선택했다.

    ![스크린샷](/images/20201223_2_5.png?raw=true)

1. `Universal code`를 선택하면 아래와 같은 코드가 생성된다.

    ![스크린샷](/images/20201223_2_6.png?raw=true)

* VueJs 에서 적용하는 방법 아래를 참고!

    ```html
    <template>
        <div id="disqus_thread"></div>
    <template>
    ```
    ```javascript
    <script>
    export default {
        mounted: function ()
            var disqus_config = function () {

            // Replace PAGE_URL with your page's canonical URL variable
            this.page.url = (window.location.host + window.location.pathname);
            // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            this.page.identifier = this.$route.params.postid;

            };

            (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://himupsi-github.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
        }
    }
    </script>
    ```