# 준비하기

```
# npm 초기화
npm init
# 중간에 entry point는 server.js 를 입력
# 나머지는 enter 입력

# express 설치
npm install express
```

# 서버실행
```
# 서버실행. 소스가 수정되면 실행중인 서버를 내리고 다시 실행해야 함.
node server.js

# 수정된 소스가 자동 반영되는 라이브러리 설치
npm install -g nodemon

# nodemon으로 서버 실행
nodemon server.js
```