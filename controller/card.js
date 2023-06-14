function btnAdd(id) {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantityOrder++;
  updateCart();
  updateSubTotal();
}


function btnMinus(id) {
  let cartItem = findItemById(cart, id);
  if (cartItem) {
    if (cartItem.quantityOrder > 1) {
      cartItem.quantityOrder--;
      updateCart();
      updateSubTotal();
    }
  }
}



function findItemById(cart, id) {
  return cart.find(function (item) {
    return item.id === id;
  });
}

function updateCart() {
  if (cart.length === 0) {
    localStorage.removeItem('cart');
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  renderCart(cart);
  
}
export default updateCart;;


function renderCart(cart) {
  var cartList = document.getElementById('cartList');
  cartList.innerHTML = '';

  cart.forEach(function (item) {
    var total = item.price * item.quantityOrder;
    var itemHTML = `
      <tr>
        <td><img src="${item.image}" alt="${item.name}" width="50" height="50"></td>
        <td>${item.name}</td>
        <td>
          <div class="cart-left-middle-product-quantity">
            <div class="cart-left-middle-product-quantity-content">
              <div class="cart-left-middle-product-quantity-icon">
                <span class="btnUpdate btn-minus" onclick="btnMinus(${item.id})">
                  <i class="fa-solid fa-minus"></i>
                </span>
                <input id="input-quantity" class="cart-left-middle-product-quantity-content-number" value="${item.quantityOrder}">
                <span class="btnUpdate btn-plus" onclick="btnAdd(${item.id})">
                  <i class="fa-solid fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${total.toFixed(2)}</td>
        <td><button class="btn btn-danger" onclick="removeFromCart(${item.id})"><i class="fa-sharp fa-solid fa-trash"></i></button></td>
      </tr>
    `;

    cartList.innerHTML += itemHTML;
  });
}
function removeFromCart(id) {
  var index = cart.findIndex(function(item) {
    return item.id === id;
  });

  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
    updateSubTotal();
  }
}


function updateSubTotal() {
  var subTotal = calSubTotal(cart);
  var shippingFee = calculateShippingFee(cart);
  var total = subTotal + shippingFee;

  document.getElementById('subtotal-value').innerHTML = '$' + subTotal.toFixed(2);
  document.getElementById('shipping-value').innerHTML = '$' + shippingFee.toFixed(2);
  document.getElementById('total-value').innerHTML = '$' + total.toFixed(2);
}

function calTotal(){
  var shippingFee = calculateShippingFee(cart);
  var subTotal = calSubTotal(cart);
  var total = shippingFee + subTotal;
  return total; 
}
function calSubTotal(cart) {
  var subTotal = 0;
  cart.forEach(function (item) {
    var total = item.price * item.quantityOrder;
    subTotal += total;
  });
  return subTotal;
}

var savedCart = localStorage.getItem('cart');
if (savedCart) {
  cart = JSON.parse(savedCart);
  renderCart(cart);
  updateSubTotal()
}


function calculateShippingFee(cart) {
  var totalQuantity = 0;
  cart.forEach(function(item) {
    totalQuantity += item.quantityOrder;
  });

  if (totalQuantity <= 3) {
    return 5;
  } else if (totalQuantity <= 5) {
    return 10;
  } else if(totalQuantity > 5) {
    return 15;
  }else{
    return 0;
  }
}
