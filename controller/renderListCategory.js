// function renderListCategory(categories) {
//     const boxCategory = document.getElementById('category-list');
//     const contentCategory = categories.map((category) => {
//         return `
//         <div class="product-left-category-item-item" id="category">
//             <div class="product-left-category-item-item-input" id="category-${category.id}">
//                 <label class="checkbox_item">
//                     <input type="checkbox" id="${category.id}" class="category">
//                     <i class="fa-solid fa-check checkbox_item_icon"></i>
//                     <div class="product-left-category-item-item-color"></div>
//                     <span>${category.category}</span>
//                 </label>
//             </div>
//         </div>
//         `;
//     });
//     console.log(contentCategory);
//     boxCategory.innerHTML = contentCategory.join('');
// }

// function getProductByCategory(category) {
//     axios.get(`https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${category.id}`)
//         .then(function (response) {
//             console.log(`Danh mục: ${category.category}`);
//             console.log('Danh sách sản phẩm:', response.data);
//             // Xử lý dữ liệu sản phẩm ở đây
//         })
//         .catch(function (error) {
//             console.log(error);
//             // Xử lý lỗi ở đây
//         });
// }

// function getAllCategory() {
//     axios.get("https://shop.cyberlearn.vn/api/Product/getAllCategory")
//         .then(function (response) {
//             const categories = response.data.content.map(item => ({
//                 id: item.id,
//                 category: item.category
//             }));
//             console.log('Danh sách danh mục:', categories);
//             renderListCategory(categories);
//             // Xử lý dữ liệu danh mục ở đây
//             if (categories && categories.length > 0) {
//                 categories.forEach(function (category) {
//                     getProductByCategory(category);
//                 });
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//             // Xử lý lỗi ở đây
//         });
// }

// getAllCategory();

// var productList = [];
// function handleCheckboxClick(categoryId) {
//     // Lọc danh sách sản phẩm dựa trên categoryId
//     var filteredProducts = productList.filter(function (product) {
//       return product.categoryId === categoryId;
//     });
  
//     // Hiển thị sản phẩm đã lọc
//     hienThiSanPham(filteredProducts);
//   }
  