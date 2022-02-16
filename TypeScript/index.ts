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
