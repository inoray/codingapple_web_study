console.log($(".tab-button").length);

for (let i = 0; i < $(".tab-button").length; i++) {
  console.log(i);
  $(".tab-button").eq(i).click(function () {
    console.log(i);
    $(".tab-button").removeClass("active");
    $(".tab-content").removeClass("show");
    $(".tab-button").eq(i).addClass("active");
    $(".tab-content").eq(i).addClass("show");
  });
}

// $(".tab-button").eq(1).click(function () {
//     $(".tab-button").removeClass("active");
//     $(".tab-content").removeClass("show");
//     $(".tab-button").eq(1).addClass("active");
//     $(".tab-content").eq(1).addClass("show");
// })

// $(".tab-button").eq(2).click(function () {
//     $(".tab-button").removeClass("active");
//     $(".tab-content").removeClass("show");
//     $(".tab-button").eq(2).addClass("active");
//     $(".tab-content").eq(2).addClass("show");
// })
