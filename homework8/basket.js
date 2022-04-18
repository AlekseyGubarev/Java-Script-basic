"use strict";
document.querySelector('.icon_basket').addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('.basket_window').classList.toggle('hidden');
});

const basket = {};
document.querySelector('.items').addEventListener('click', event => {
  if (!event.target.closest('.add_basket')) {
    return;
  }
      const cardItems = event.target.closest('.card_items');
      const id = cardItems.dataset.id;
      const name = cardItems.dataset.name;
      const price = cardItems.dataset.price;

      addToCart(id, name, price);
      document.querySelector('.ellipse span').innerText = getSummProducts();
      document.querySelector('.basket_total_value').innerText = getSummPrice();
      addingProductRow(id);
      
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {
    id: id,
    name: name,
    price: price,
    count: 0,
    };  
    }
    basket[id].count++;
    console.log(basket);  
}

function getSummProducts() {
  const productsArr = Object.values(basket);
  let count = 0;
  for (const product of productsArr) {
    count += product.count;
  }
  return count;
}

function getSummPrice() {
  const productsArr = Object.values(basket);
  let price = 0;
  let count = 0;
  for (const product of productsArr) {
    price += product.price * product.count;
  }
  return price;
}
function addingProductRow(id) {
  const basketRowEl = document
    .querySelector(`.basket_row[data-productId ="${id}"]`);
  if (!basketRowEl) {
    addingNewProductRow(id);
    return;
  } 
  basketRowEl.querySelector('.productCount').innerText = basket[id].count;
  basketRowEl.querySelector('.productTotalRow')
  .innerText = basket[id].price * basket[id].count;
}

function addingNewProductRow (productId) {
  const productRow = `
    <div class="basket_row basket_row_text" data-productId = "${productId}">
      <div>${basket[productId].name}
      </div>
      <div>
          <span class="productCount">${basket[productId].count}</span>
      </div>
      <div>
          <span>${basket[productId].price}</span>
      </div>
      <div>
        <span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span>
      </div>
    </div>
    `;
  document.querySelector('.basket_total')
  .insertAdjacentHTML('beforebegin', productRow);
    
}
