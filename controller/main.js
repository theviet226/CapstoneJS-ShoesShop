var productList = [];

function layDuLieu() {
  axios({
    method: 'get',
    url: 'https://shop.cyberlearn.vn/api/Product'
  })
    .then(function (result) {
      productList = result.data.content;
      console.log(productList)
      renderPorudct(productList);

    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hiển thị sản phẩm
function renderPorudct(data) {
  var sortOptions = document.getElementById('sortOptions');
  var sortBy = sortOptions.value;

  if (sortBy === 'Giá (Từ cao đến thấp)') {
    data.sort(function (a, b) {
      return b.price - a.price;
    });
  } else if (sortBy === 'Hàng (Từ thấp đến cao)') {
    data.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  var shoesList = document.getElementById('wrapper-list-products');


  shoesList.innerHTML = '';


  data.forEach(function (product) {
    var productHTML = `
      <div class="product-wrap col-lg-4 m-12 c-12">
          <a href="">
              <div class="product-item">
                  <div class="swiper swiper-slide">
                      <div class="swiper-wrapper">
                          <div class="swiper-slide product-item-img">
                              <img src="${product.image}" />
                          </div>
                      </div>
                  </div>
                  <div class="product-item-description">
                      <span class="card-title">${product.name}</span>
                      <span class="text-muted">${product.price}$</span>
                  </div>
                  <div class="product-item-options">  
                      <div class="product-item-options-button row">
                          <div class="col-lg-8 col1">
                          <button><a class="text-product" href="./detail.html?id=${product.id}"> Xem sản phẩm</a></button>
                          </div>
                          <div class="col-lg-4 col1">
                              <button id="btnAddToCart" onclick="addToCart(event)"><i class="fa-solid fa-cart-plus"></i></button>
                          </div>
                      </div>
                  </div>
              </div>
          </a>
      </div>
      `;


    shoesList.innerHTML += productHTML;
  });
}

function getAllCategory() {
  axios
    .get("https://shop.cyberlearn.vn/api/Product/getAllCategory")
    .then(function (response) {
      const categories = response.data.content.map((item) => ({
        id: item.id,
        category: item.category,
      }));
      // console.log('Danh sách danh mục:', categories);
      renderListCategory(categories);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function handleCheckboxClick() {
  var checkboxes = document.getElementsByClassName('category');
  const selectedCategoryIds = [];

  Array.from(checkboxes).forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedCategoryIds.push(checkbox.id);
    }
  });

 

  var filteredProducts = [];
  if (selectedCategoryIds.length > 0) {
    filteredProducts = productList.filter(function (product) {

      const categories = JSON.parse(product.categories)[0].id;
    
      return selectedCategoryIds.includes(categories);
    });
  } else {
    filteredProducts = productList;
  }
 

  renderPorudct(filteredProducts);
}

function getProductByCategory(category) {
  axios({
    method: 'get',
    url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${category.id}`
  })
    .then(function (response) {
      // console.log(`Danh mục: ${category.category}`);
      console.log('Danh sách sản phẩm:', response.data);
      // productList = productList.concat(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function renderListCategory(categories) {
  const boxCategory = document.getElementById('category-list');
  const contentCategory = categories.map((category) => {
    return `
        <div class="product-left-category-item-item" id="category">
            <div class="product-left-category-item-item-input" id="category-${category.id}">
                <label class="checkbox_item">
                    <input type="checkbox" id="${category.id}" class="category" onchange="handleCheckboxClick(${category.id})">
                    <i class="fa-solid fa-check checkbox_item_icon"></i>
                    <div class="product-left-category-item-item-color"></div>
                    <span>${category.category}</span>
                </label>
            </div>
        </div>
    `;
  });

  boxCategory.innerHTML = contentCategory.join('');

  // Gọi hàm getProductByCategory cho mỗi danh mục
  categories.forEach(function (category) {
    getProductByCategory(category);
  });
}


document.addEventListener('DOMContentLoaded', function () {
  layDuLieu();
  getAllCategory();
  updateCart();
});


// Tìm kiếm sản phẩm
function searchProducts(keyword) {

  var lowerCaseKeyword = keyword.toLowerCase();


  var filteredProducts = productList.filter(function (product) {
    var lowerCaseName = product.name.toLowerCase();
    return lowerCaseName.includes(lowerCaseKeyword);
  });


  renderPorudct(filteredProducts);
}

document.getElementsByClassName('search-form')[0].addEventListener('submit', function (event) {
  event.preventDefault();

  var keyword = document.getElementById('searchKeyword').value.trim();
  searchProducts(keyword);
});


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
  event.preventDefault();

  // Kiểm tra trạng thái đăng nhập
  var userLoggedIn = localStorage.getItem('loggedInUser');
  if (!userLoggedIn) {
    // Người dùng chưa đăng nhập, không cho phép thêm sản phẩm vào giỏ hàng
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
    window.location.href = '/view/signIn.html';
    return;
  }

  var productName = event.target.closest('.product-item').querySelector('.card-title').innerText;
  var productPrice = parseFloat(event.target.closest('.product-item').querySelector('.text-muted').innerText.replace('$', ''));
  var productImage = event.target.closest('.product-item').querySelector('.product-item-img img').src;

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




function btnAdd(id) {
  console.log('btnAdd called with id:', id);
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantityOrder++;
  updateCart();
  updateSubTotal();
}


function btnMinus(id) {
  console.log('btnMinus called with id:', id);
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
    return item.id === parseInt(id);
  });
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

  renderCart(cart);
}



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
  var index = cart.findIndex(function (item) {
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

function calTotal() {
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
  cart.forEach(function (item) {
    totalQuantity += item.quantityOrder;
  });

  if (totalQuantity <= 3) {
    return 5;
  } else if (totalQuantity <= 5) {
    return 10;
  } else if (totalQuantity > 5) {
    return 15;
  } else if (totalQuantity = 0) {
    return 0;
  }
}

function sortProducts() {
  var sortOptions = document.getElementById('sortOptions');
  var sortBy = sortOptions.value;

  // Sắp xếp danh sách sản phẩm dựa trên tùy chọn đã chọn
  if (sortBy === 'Giá (Từ cao đến thấp)') {
    productList.sort(function (a, b) {
      return b.price - a.price;
    });
  } else if (sortBy === 'Hàng (Từ thấp đến cao)') {
    productList.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  // Hiển thị lại danh sách sản phẩm đã được sắp xếp
  renderPorudct(productList);
}

// Danh sách các câu hỏi mặc định và phản hồi tương ứng

// Lấy các phần tử từ DOM
var openChatBtn = document.getElementById("open-chat-btn");
var closeChatBtn = document.getElementById("close-chat-btn");
var chatPopup = document.getElementById("chat-popup");
var chatMessages = document.getElementById("chat-messages");
var userInput = document.getElementById("user-input");

var chatboxOpen = false;


function openChatbox() {
  chatPopup.style.display = "block";
  openChatBtn.style.display = "none";
  chatboxOpen = true;
}

function closeChatbox() {
  chatPopup.style.display = "none";
  openChatBtn.style.display = "block";
  chatboxOpen = false;
}

var options = [
  {
    question: "Có sản phẩm mới không?",
    answer: "Chúng tôi luôn cập nhật sản phẩm mới. Bạn có thể xem danh sách sản phẩm mới nhất trên trang web của chúng tôi."
  },
  {
    question: "Làm thế nào để đặt hàng?",
    answer: "Để đặt hàng, bạn có thể truy cập trang web của chúng tôi và chọn sản phẩm bạn muốn mua. Sau đó, điền thông tin giao hàng và thanh toán để hoàn tất đơn hàng."
  },
  {
    question: "Bao lâu để nhận được đơn hàng?",
    answer: "Thời gian giao hàng phụ thuộc vào địa chỉ của bạn và phương thức vận chuyển bạn chọn. Thông thường, đơn hàng sẽ được giao trong khoảng từ 3-7 ngày làm việc."
  },
  {
    question: "Có hỗ trợ đổi trả sản phẩm không?",
    answer: "Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng. Bạn có thể đọc chính sách đổi trả trên trang web của chúng tôi để biết thêm chi tiết."
  },
  {
    question: "Làm thế nào để liên hệ với chúng tôi?",
    answer: "Bạn có thể liên hệ với chúng tôi qua số điện thoại XXX-XXXX hoặc gửi email tới địa chỉ email của chúng tôi. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất."
  }
];


function processOptionClick(event) {
  var selectedOption = event.target.innerHTML;
  appendMessage("Bạn", selectedOption);

  // Tìm câu hỏi tương ứng trong danh sách
  var matchedOption = options.find(function (option) {
    return option.question === selectedOption;
  });

  // Nếu tìm thấy câu hỏi, bot sẽ trả lời
  if (matchedOption) {
    var answer = matchedOption.answer;
    appendMessage("Bot", answer);
  }

}

// Gắn sự kiện click cho các tùy chọn
var optionBtns = document.getElementsByClassName("option-btn");
for (var i = 0; i < optionBtns.length; i++) {
  optionBtns[i].addEventListener("click", processOptionClick);
}


// Thêm tin nhắn vào chatbox
function appendMessage(sender, message) {
  var messageElement = document.createElement("p");
  messageElement.innerHTML = "<strong>" + sender + ":</strong> " + message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Sự kiện khi người dùng nhấp vào nút mở chatbox
openChatBtn.addEventListener("click", openChatbox);

// Sự kiện khi người dùng nhấp vào nút đóng chatbox
closeChatBtn.addEventListener("click", closeChatbox);

// Xử lý sự kiện khi người dùng nhấn phím Enter trong input
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    processUserInput();
  }
});
