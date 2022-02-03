# node js & mongodb 실습

## 준비하기

```bash
# npm 초기화
npm init
# 중간에 entry point는 server.js 를 입력
# 나머지는 enter 입력

# express 설치
npm install express
```

## 서버실행

```bash
# 서버실행. 소스가 수정되면 실행중인 서버를 내리고 다시 실행해야 함.
node server.js

# 수정된 소스가 자동 반영되는 라이브러리 설치
npm install -g nodemon

# nodemon으로 서버 실행
nodemon server.js
```

## ejs 설치

```bash
npm install ejs
```

## form에서 delete 요청가능하게 해주는 라이브러리 설치

```bash
npm install method-override
```

## mongo db

```bash
npm install mongodb
```

## 파일저장 도와주는 라이브러리

```bash
npm install multer
```

## 로그인 & 세션생성 관련 라이브러리

```bash
npm install passport passport-local express-session
```

## 환경변수 라이브러리

```bash
npm install dotenv
```
