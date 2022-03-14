
let g_products;

let productList = document.querySelector('#product-list');
let searchInput = document.querySelector('#search-input');

$.ajax({
  url: "./store.json",
  type: "GET",
}).done((data)=>{
  g_products = data.products;
  console.log(data);
  showList(data.products);
});

function showList(products){
  productList.innerHTML = "";
  products.forEach ((a, i) => {

    let template = $(`
    <div class="col" id="${a.id}">
      <div class="card h-100">
        <img src="${a.photo}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title product-name">${a.product_name}</h5>
          <p class="card-text brand-name">${a.brand_name}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted price">${a.price}</small>
        </div>
      </div>
    </div>
    `).draggable({
      zIndex: 999,
      revert: 'invalid'
    });
    //console.log(template);
    // productList.insertAdjacentHTML("beforeend", template);
    $('#product-list').append(template);
  });
}

searchInput.addEventListener('input', ()=>{
  //console.log(searchInput.value);
  let inputString = searchInput.value.trim();
  if (inputString.length == 0){
    showList(g_products);
    return;
  }
  let c = [...g_products];
  for (let i = 0; i < c.length; ++i){
    c[i] = {... g_products[i]};
  }
  let newProducts = c.filter ((a) => {
    let idx = a.product_name.search(inputString)
    if (idx != -1){
      let b = {...a}
      a.product_name = "";

      for (let i = 0; i < b.product_name.length; ++i){
        if (i == idx){
          a.product_name += `<span style="background: yellow;">`;
        }

        a.product_name += b.product_name[i];

        if (i == idx + inputString.length - 1){
          a.product_name += `</span>`;
        }
      }
      return true;
    }
  })
  showList(newProducts);
});

let cartList = [];

$('#drop-box').droppable({
  drop: function(event, ui) {
    var item = $(ui.draggable);
    console.log(item);
    // console.log(ui.draggable);

    var id = item.attr('id');
    var img = item.find('img');
    var productName = item.find('.product-name').text();
    var brandName = item.find('.brand-name').text();
    var price = item.find('.price').text();

    console.log(id);
    console.log(img);
    console.log(productName);
    console.log(brandName);
    console.log(price);
    // 상품 원위치 시키기
    item.css({
      position: 'relative',
      top: 'auto',
      left: 'auto'
    });




    let template = `
    <div class="ms-3 me-3">
      <p>${productName}</p>
      <p>${brandName}</p>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">수량</span>
        <input id="input-cnt" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
      </div>
    </div>
    `;
    //console.log(template);
    document.querySelector('#cart-list').insertAdjacentHTML("beforeend", template);
    //$('#product-list').append(template);




  },
});
