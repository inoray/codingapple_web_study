var name_ = "kim";
var arr = ["kim", "lee"];
var obj = { name: "kim" };
var name_2 = 3;
name_2 = "kim";
var name_3 = "lee";
// 함수 타입지정
function f(x) {
    return x * 2;
}
var func = function (a) {
    return 10;
};
var info = {
    name: "kim",
    plusOne: function (a) {
        return a + 1;
    },
    changeName: function () {
        console.log("hi");
    }
};
var image = document.getElementById("image");
if (image instanceof HTMLImageElement) {
    image.src = "test.jpg";
}
var link = document.getElementsByClassName("naver");
for (var i = 0; i < link.length; ++i) {
    var a = link[i];
    if (a instanceof HTMLAnchorElement) {
        a.href = "https://kakao.com";
    }
}
var link2 = document.querySelectorAll(".naver");
link2.forEach(function (a) {
    if (a instanceof HTMLAnchorElement) {
        a.href = "https://kakao.com";
    }
});
