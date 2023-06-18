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


const sizeButtons = document.querySelectorAll('.size-button');

