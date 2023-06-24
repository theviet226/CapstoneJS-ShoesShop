// Lấy phần tử nút "Proceed to checkout"
var proceedBtn = document.querySelector('.btn-1');

// Lấy phần tử popup
var popup = document.getElementById('checkoutPopup');

// Khi click vào nút "Proceed to checkout"
proceedBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // Thêm class 'show' vào popup để hiển thị nó
    popup.classList.add('show');
});
var proceedBtn = document.querySelector('.btn-1');
var popup = document.getElementById('checkoutPopup');
var form = document.getElementById('checkoutForm');
var subTotal = calSubTotal(cart) + calculateShippingFee(cart);
document.getElementById('total-pay').innerHTML = '$'+ subTotal;

proceedBtn.addEventListener('click', function (event) {
    event.preventDefault();
    popup.classList.add('show');
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Lấy thông tin từ các input
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;

    // Xử lý thông tin thanh toán tại đây
    cart = []; // Xoá toàn bộ sản phẩm trong giỏ hàng bằng cách gán giá trị mới là một mảng rỗng
    localStorage.removeItem('cart'); // Xoá dữ liệu giỏ hàng trong localStorage
    updateCart(); // Cập nhật lại giao diện giỏ hàng để hiển thị giỏ hàng trống
    updateSubTotal();

    // Đóng popup sau khi xử lý
    popup.classList.remove('show');

});