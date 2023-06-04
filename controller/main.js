function layDuLieu() {
    axios({
      method: 'get',
      url: 'https://shop.cyberlearn.vn/api/Product'
    })
      .then(function (result) {
        var data = result.data.content;
        hienThiSanPham(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  // Hiển thị sản phẩm
  function hienThiSanPham(data) {
    var shoesList = document.getElementById('shoesList');
  
    // Xóa nội dung trong phần tử shoesList trước khi hiển thị
    shoesList.innerHTML = '';
  
    // Duyệt qua từng sản phẩm và tạo HTML tương ứng
    data.forEach(function (product) {
      var productHTML = `
      <div class="col-lg-4 col-md-6">
        <div class="content-overlay"></div>
        <img src="${product.image}" class="card-img" alt="Phone Image" />
        <div class="card-body text-center">
          <div class="text-center">
            <h5 class="card-title pt-3">${product.name}</h5>
            <span class="text-muted mb-2">$${product.price}</span>
          </div>
          <button class="btn btn-success">Mua ngay</button>
        </div>
      </div>
      `;
  
      // Thêm sản phẩm vào phần tử shoesList
      shoesList.innerHTML += productHTML;
    });
  }
  
  // Gọi hàm lấy dữ liệu và hiển thị sản phẩm khi trang web được tải
  document.addEventListener('DOMContentLoaded', function () {
    layDuLieu();
  });
  