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

function addToCart(event) {
  

  // Kiểm tra trạng thái đăng nhập
  var userLoggedIn = localStorage.getItem('loggedInUser');
  if (!userLoggedIn) {
    // Người dùng chưa đăng nhập, không cho phép thêm sản phẩm vào giỏ hàng
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
    window.location.href = '/view/signIn.html';
    return;
  }

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

  updateCart();
}
function updateCart() {
  var cartItemCountElement = document.querySelector('.cart-item-count');
  var totalQuantity = 0;
  cart.forEach(function (item) {
    totalQuantity += item.quantityOrder;
  });

  // Cập nhật số lượng sản phẩm trong biểu tượng giỏ hàng
  cartItemCountElement.textContent = totalQuantity;

  if (cart.length === 0) {
    localStorage.removeItem('cart');
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  var loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    // Người dùng chưa đăng nhập, xoá toàn bộ giỏ hàng
    cart = [];
    localStorage.removeItem('cart');
  }

  
}
