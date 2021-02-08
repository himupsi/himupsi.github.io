-----
title: Github SSH key 로 접속하기
summary: SSH key를 이용해 Github Desktop을 사용하지 않고 CLI에서 커밋하고 푸시하기.
thumbnail: github_logo.jpg
createDate: 202101120100
category: 개발
tags: [ Github SSH ]
-----

# Github SSH key로 접속하기

보통은  Github Desktop을 이용해 Github를 이용하지만 [Azure DevOps](https://azure.microsoft.com/ko-kr/services/devops/) 의 pipeline에서 Github에 접근하기 위해 SSH key를 사용했다.

SSH key 생성 및 등록 방법은 Github에 잘 설명되어 있어 링크로 대체한다.
1. 먼저 SSH key를 생성한다.
    * https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
    * **참고**
        * SSH 접속시 터미널 로그를 보니 `> Permission denied (publickey).` 가 발생해서 한참을 삽질했는데 key 생성시 passphrase를 사용해서 일어난 문제였다.
        * pipeline(외부 linux 환경)에서 키파일의 passphrase를 쉡스크립트에 넣기도 이상해서 그냥 passphrase 없는 key를 사용하는게...(나는 그렇게 사용하기로 결정했다.)

1. 생성된 key 파일 중 공개키를 Github에 등록한다.
    * https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account
1. SSH key로 접속하기
    * 생성된 private key 권한을 수정하고 known_hosts에 등록한다.
        ```zsh
        chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
        ```
    * git 설정하기
        ```zsh
        git config --local user.name "깃허브ID"
        git config --local user.email "이메일"
        ```
    * Push 예시*
        ```zsh
        chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
        git config --local user.name "깃허브ID"
        git config --local user.email "이메일"
        git add .
        git commit -m "커밋 메세지"
        git remote set-url --push origin git@github.com:깃허브ID/레포지토리이름.git
        git push origin HEAD:master
        ```
1. 테스트
    * https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/error-permission-denied-publickey


* 절차는 아래에 잘나와있다.
    * https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh
