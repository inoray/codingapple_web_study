$(document).ready(function(){
  첫로드시실행할거();
});



function 첫로드시실행할거() {

  var products = [];

  //데이터 가져와서 박아넣는기능
  getProducts();

  // Drop할 수 있는 영역 만들기
  $('#drop-area').droppable({
    drop: function (event, ui) {
      var item = $(ui.draggable);
      var index = item.attr('data-index');
      var img = item.find('img');
      var productName = item.find('.product-name').text();
      var brandName = item.find('.brand-name').text();
      var price = item.find('.price').text();

      // 상품 원위치 시키기
      item.css({
        position: 'relative',
        top: 'auto',
        left: 'auto'
      });

      var productInBasket = $(`#basket-list [data-index=${index}]`);
      if (productInBasket.length) {
        // 중복되는 상품이 있을 경우
        alert('이미 장바구니에 담긴 상품입니다.');
        return;
      }


      //드롭했을 시 그 밑에 상품목록 생성해주기
      var 장바구니상품 = $(`
            <div class="card-deck">
                <div class="card mb-3" style="max-width: 540px;" data-index="${index}">
                    <div class="row no-gutters">
                        <div class="col-md-4 overflow-hidden">
                            <img src="${img.attr('src')}" class="card-img h-100 w-auto" alt="${productName}" title="${productName}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                            <h5 class="card-title product-name">${productName}</h5>
                            <p class="card-text brand-name">${brandName}</p>
                            <p class="card-text"><small class="text-muted price">${price}</small></p>
                            <p class="card-text">
                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroup-sizing-sm-${index}">수량</span>
                                    </div>
                                    <input type="number" min="1" value="1" class="form-control number" >
                                </div>
                            </p>
                            <p class="card-text">합계 <span class="sum">${price}</span>원</p>
                            </div>
                        </div>
                        <button type="button" class="col-md-1 btn-delete">X</button>
                    </div>
                </div>
            </div>
            `);

      장바구니상품.find("input[type='number']").on('keyup change', function () {
        var sum = parseInt(price, 10) * $(this).val();
        장바구니상품.find('.sum').text(sum);

        setTotalSum();
      });

      장바구니상품.find('button.btn-delete').on('click', function () {
        장바구니상품.remove();
        setTotalSum();
      });

      $('#basket-list').append(장바구니상품);
      setTotalSum();
    }
  });
}






//장바구니 변동될 때마다 총 금액 계산해주는 기능
function setTotalSum() {
  var totalSum = 0;

  $('#basket-list .sum').each(function () {
    totalSum += parseInt($(this).text(), 10);
  });

  $('#total-sum').text(totalSum);
}



//json 데이터 ajax로 가져오고 데이터바인딩
function getProducts() {
  $.get('resources/json/store.json').done(function (data) {
    //cb(data.products);
    data.products.forEach(function (상품, i) {
      appendProduct(상품, i)
    })
  });
}



//상품 박아넣는 코드, 그리고 박아넣자마자 drag 가능하게 설정하기
function appendProduct(product, index) {
  var newItem = $(`
        <div class="card col-4 p-0" data-index="${index}">
            <img src="resources/images/${product.photo}" class="card-img-top" alt="${product.product_name}" title="${product.product_name}">
            <div class="card-body">
                <h5 class="card-title product-name">${product.product_name}</h5>
                <p class="card-text brand-name">${product.brand_name}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted price">${product.price}</small>
            </div>
        </div>
    `).draggable({
    zIndex: 999,
    revert: 'invalid'
  });

  $('#product-list').append(newItem);
}



//구매버튼 눌렀을 때 동작할 내용,
//공식 풀이에선 jquery dialog라는걸 썼지만 꼭 그럴필요는 없습니다.
function openBuyPopup() {
  var basketList = $('#basket-list *');
  if (!basketList.length) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  $('#name, #address').val('');
  $('#popup-buy').dialog({
    // autoOpen: false,
    width: 350,
    height: 250,
    modal: true,
    open: function (event, ui) {
      $(event.target).dialog('widget')
    },
    buttons: {
      //구매완료 버튼 누르면 실행할 코드
      '구매완료': function () {
        $(this).dialog('close');

        openReceiptPopup();
        $('#basket-list').html('');
        setTotalSum();
      },
      //닫기 버튼 누르면 실행할 코드
      '닫기': function () {
        $(this).dialog('close');
      }
    }
  });
}




function openReceiptPopup() {
  // 영수증 이미지 생성
  var cvs = $('#receipt');
  var ctx = cvs[0].getContext('2d');
  var itemLen = $('#basket-list > div').length;

  cvs.attr({
    width: 500,
    height: 200 + (120 * itemLen)
  });

  ctx.font = 'bold 20px Malgun Gothic';
  ctx.fillText('영수증', 10, 20);

  var date = new Date();
  ctx.font = 'bold 14px Malgun Gothic';
  ctx.fillText(date, 10, 50);

  $('#basket-list > div').each(function (i) {
    var productName = $(this).find('.product-name').text();
    var brandName = $(this).find('.brand-name').text();
    var price = $(this).find('.price').text();
    var number = $(this).find('.number').val();
    var sum = $(this).find('.sum').text();

    ctx.fillText(productName, 10, 120 * (i + 1));
    ctx.fillText(brandName, 10, 120 * (i + 1) + 20);
    ctx.fillText(`가격 : ${price}`, 10, 120 * (i + 1) + 40);
    ctx.fillText(`수량 : ${number}`, 10, 120 * (i + 1) + 60);
    ctx.fillText(`합계 : ${sum}`, 10, 120 * (i + 1) + 80);
  });

  var totalSum = $('#total-sum').text();
  ctx.fillText(`총 합계 : ${totalSum}`, 10, 120 * itemLen + 150);

  //영수증 닫기버튼
  $('#popup-receipt').dialog({
    width: 500,
    height: 500,
    modal: true,
    buttons: {
      '닫기': function () {
        $(this).dialog('close');
      }
    },
    open: function (event, ui) {
      $(event.target).dialog('widget')
    }
  })
}



//검색기능
//검색창에 뭔가 입력할 때마다 이거 실행됨
function onSearch(val) {
  var resultCount = 0;

  $('#product-list > div').each(function () {
    var productName = $(this).find('.product-name');
    var brandName = $(this).find('.brand-name');

    if (val === '') {
      $(this).show();
      $('#msg-empty').hide();
      return;
    } else {
      $(this).hide();
    }


    //replace는 원하는 글자를 찾아서 다른 글자로 교체해줍니다.
    if (productName.text().indexOf(val) !== -1) {
      var pnHighlight = productName.text().replace(val, `<span class='highlight'>${val}</span>`);
      productName.html(pnHighlight);
      $(this).css('display', 'block');
      resultCount++;
    }

    if (brandName.text().indexOf(val) !== -1) {
      var bnHighlight = brandName.text().replace(val, `<span class='highlight'>${val}</span>`);
      brandName.html(bnHighlight);
      $(this).css('display', 'block');
      resultCount++;
    }
  });

  if (resultCount === 0) {
    $('#msg-empty').show();
  } else {
    $('#msg-empty').hide();
  }
}
