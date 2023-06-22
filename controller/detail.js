// import { addToCart } from "./main";
// addToCart(item.id)
// Trích xuất productId từ tham số truy vấn trong URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log('paramas', productId);


// Gọi API để lấy thông tin chi tiết sản phẩm
function layChiTietSanPham(productId) {
    axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`
    })
        .then(function (result) {
            const product = result.data.content;
            //   console.log(product);

            console.log(result.data)
            
            // Xử lý dữ liệu chi tiết sản phẩm
            hienThiChiTietSanPham(product);

        })
        .catch(function (error) {
            console.log(error);
        });
}

// Cập nhật thông tin chi tiết sản phẩm trên trang
function hienThiChiTietSanPham(product) {
    const productNameElement = document.querySelector('.detail-product-right-top-description h2.title');
    const productPriceElement = document.querySelector('.detail-product-right-top-description span.price');
    const productDescriptionElement = document.querySelector('.detail-product-right-bottom-description');
    const productImageElement = document.querySelector('.detail-product-left-top-item .img-product');

    // const productImages = product.image;

    // Cập nhật tên sản phẩm
    productNameElement.innerHTML = product.name;

    productPriceElement.innerHTML = '$' + product.price
    // Cập nhật mô tả sản phẩm
    productDescriptionElement.innerHTML = product.description;

    // Cập nhật hình ảnh sản phẩm
    // if (productImages && productImages.length > 0) {
    //     productImageElement.src = product.image[0];
    //     productImageElement.alt = product.name;
    // }
    productImageElement.src = product.image;

}

// Gọi hàm layChiTietSanPham(productId) để lấy thông tin sản phẩm khi trang được tải

layChiTietSanPham(productId);

var cart = [];
var cartItemId = 1;
function generateItemId() {
    var maxId = 0;
    cart.forEach(function (item) {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId + 1;
  }
const sizeButtons = document.querySelectorAll('.size-button');
function addToCart(event) {
    var productName = event.currentTarget.closest('.detail-product').querySelector('.title').innerText;
    var productPrice = parseFloat(event.currentTarget.closest('.detail-product').querySelector('.price').innerText.replace('$', ''));
    var productImage = event.currentTarget.closest('.detail-product').querySelector('.img-product').src;
  
    var existingCartItem = cart.find(function (item) {
      return item.name === productName;
    });
  
    if (existingCartItem) {
      existingCartItem.quantityOrder += 1;
    } else {
      var cartItem = new CartItem(productName, productPrice, 1, productImage);
      cartItem.id = generateItemId();
      cart.push(cartItem);
    }
  console.log(cart);
  updateCart()
}
// function btnAdd(id) {
//     console.log('btnAdd called with id:', id);
//     let cartItem = findItemById(cart, id);
//     if (cartItem) cartItem.quantityOrder++;
//     updateCart();
//     updateSubTotal();
//   }
  
  
//   function btnMinus(id) {
//     console.log('btnMinus called with id:', id);
//     let cartItem = findItemById(cart, id);
//     if (cartItem) {
//       if (cartItem.quantityOrder > 1) {
//         cartItem.quantityOrder--;
//         updateCart();
//         updateSubTotal();
//       }
//     }
//   }
  
  
  
//   function findItemById(cart, id) {
//     return cart.find(function (item) {
//       return item.id === parseInt(id);
//     });
//   }
  
  
//   function updateCart() {
//     var cartItemCountElement = document.querySelector('.cart-item-count');
//     var totalQuantity = 0;
//     cart.forEach(function (item) {
//       totalQuantity += item.quantityOrder;
//     });
  
//     // Cập nhật số lượng sản phẩm trong biểu tượng giỏ hàng
//     cartItemCountElement.textContent = totalQuantity;
    
//     if (cart.length === 0) {
//       localStorage.removeItem('cart');
//     } else {
//       localStorage.setItem('cart', JSON.stringify(cart));
//     }
//     renderCart(cart);
  
//   }
  
  
//   function renderCart(cart) {
//     var cartList = document.getElementById('cartList');
//     cartList.innerHTML = '';
  
//     cart.forEach(function (item) {
//       var total = item.price * item.quantityOrder;
//       var itemHTML = `
//         <tr>
//           <td><img src="${item.image}" alt="${item.name}" width="50" height="50"></td>
//           <td>${item.name}</td>
//           <td>
//             <div class="cart-left-middle-product-quantity">
//               <div class="cart-left-middle-product-quantity-content">
//                 <div class="cart-left-middle-product-quantity-icon">
//                   <span class="btnUpdate btn-minus" onclick="btnMinus(${item.id})">
//                     <i class="fa-solid fa-minus"></i>
//                   </span>
//                   <input id="input-quantity" class="cart-left-middle-product-quantity-content-number" value="${item.quantityOrder}">
//                   <span class="btnUpdate btn-plus" onclick="btnAdd(${item.id})">
//                     <i class="fa-solid fa-plus"></i>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </td>
//           <td>$${item.price.toFixed(2)}</td>
//           <td>$${total.toFixed(2)}</td>
//           <td><button class="btn btn-danger" onclick="removeFromCart(${item.id})"><i class="fa-sharp fa-solid fa-trash"></i></button></td>
//         </tr>
//       `;
  
//       cartList.innerHTML += itemHTML;
//     });
//   }
//   function removeFromCart(id) {
//     var index = cart.findIndex(function (item) {
//       return item.id === id;
//     });
  
//     if (index !== -1) {
//       cart.splice(index, 1);
//       updateCart();
//       updateSubTotal();
//     }
//   }
  
  
//   function updateSubTotal() {
//     var subTotal = calSubTotal(cart);
//     var shippingFee = calculateShippingFee(cart);
//     var total = subTotal + shippingFee;
  
//     document.getElementById('subtotal-value').innerHTML = '$' + subTotal.toFixed(2);
//     document.getElementById('shipping-value').innerHTML = '$' + shippingFee.toFixed(2);
//     document.getElementById('total-value').innerHTML = '$' + total.toFixed(2);
//   }
  
//   function calTotal() {
//     var shippingFee = calculateShippingFee(cart);
//     var subTotal = calSubTotal(cart);
//     var total = shippingFee + subTotal;
//     return total;
//   }
//   function calSubTotal(cart) {
//     var subTotal = 0;
//     cart.forEach(function (item) {
//       var total = item.price * item.quantityOrder;
//       subTotal += total;
//     });
//     return subTotal;
//   }
  
//   var savedCart = localStorage.getItem('cart');
//   if (savedCart) {
//     cart = JSON.parse(savedCart);
//     renderCart(cart);
//     updateSubTotal()
//   }
  
  
//   function calculateShippingFee(cart) {
//     var totalQuantity = 0;
//     cart.forEach(function (item) {
//       totalQuantity += item.quantityOrder;
//     });
  
//     if (totalQuantity <= 3) {
//       return 5;
//     } else if (totalQuantity <= 5) {
//       return 10;
//     } else if (totalQuantity > 5) {
//       return 15;
//     } else if (totalQuantity = 0) {
//       return 0;
//     }
//   }

