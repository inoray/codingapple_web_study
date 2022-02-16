let name_: string = "kim";
let arr: string[] = ["kim", "lee"];
let obj: { name: string } = { name: "kim" };
let name_2: string | number = 3;
name_2 = "kim";

// 타입정의. 타입명은 대문자로 시작
type MyType = string | number;
let name_3: MyType = "lee";

// 함수 타입지정
function f(x: number): number {
  return x * 2;
}

type FuncType = (a : string) => number;

let func : FuncType = function(a){
  return 10;
}

// 객체 내부 함수 타입 지정
type InfoType = {
  name: string,
  plusOne: (a: number) => number,
  changeName: () => void
}

let info: InfoType = {
  name: "kim",
  plusOne(a){
    return a + 1;
  },
  changeName: () => {
    console.log("hi");
  }
}

let image = document.getElementById("image");
if (image instanceof HTMLImageElement) {
  image.src = "test.jpg";
}

let link = document.getElementsByClassName("naver");
for (let i = 0; i < link.length; ++i){
  let a = link[i];
  if (a instanceof HTMLAnchorElement){
    a.href = "https://kakao.com";
  }
}

let link2 = document.querySelectorAll(".naver");
link2.forEach((a) =>{
  if (a instanceof HTMLAnchorElement){
    a.href = "https://kakao.com";
  }
})
