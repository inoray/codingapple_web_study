# TypeScript

## 라이브러리 설치

```bash
npm install -a typescript
```

## 그다음

ts파일 생성후 코딩 시작

## java script로 컴파일

컴파일 옵션을 tsconfig.json 생성후 내용작성

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs"
  }
}
```

아래 명령어를 콘솔에 입력하면 자동으로 js파일 변환(컴파일)됨.

```bash
tsc -w
```
