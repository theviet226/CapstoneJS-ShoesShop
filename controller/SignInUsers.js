function signInUser() {
    let email = document.querySelector("#signInEmail").value;
    let password = document.querySelector("#signInPass").value;

    console.log(email, password);

    const usersSignIn = new SignInUsers(email, password);

    axios({
        method: 'post',
        url: 'https://shop.cyberlearn.vn/api/Users/signin',
        data: usersSignIn,
    }).then(function (result) {

        alert('Đăng nhập thành công');
        console.log(result.data)

        // Lấy thông tin người dùng từ localStorage
        let nameUser = localStorage.getItem('name');
        console.log(nameUser);
        // let loggedInUserName = window.opener.document.querySelector("#loggedInUserName");
        // loggedInUserName.innerHTML = nameUser;
        // let accessToken = result.data.content.accessToken;

        // // Lưu trữ thông tin AccessToken vào Local Storage
        // localStorage.setItem('accessToken', accessToken);

        // // Gọi API để lấy thông tin người dùng từ AccessToken
        // getProfile(accessToken);



        //Chuyển hướng tới trang chủ
        let homeURL = '/index.html?name=' + encodeURIComponent(nameUser);
        window.location.href = homeURL;
    }).catch(function (error) {
        console.log(error);
        alert('Sai tên đăng nhập/mật khẩu');
    });
}
function getProfile(Token) {
    axios({
      method: 'get',
      url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
      headers: {
        Authorization: 'Bearer ' + Token
      }
    }).then(function (result) {
      console.log(result.data);
  
    //   let nameUser = localStorage.getItem('name');
  
    //   // Lưu trữ thông tin người dùng vào Local Storage
    //   localStorage.setItem('name', nameUser);
  
      // Chuyển hướng tới trang khác
    //   window.location.href = '/index.html';
    }).catch(function (error) {
      console.log(error);
      alert('Lỗi khi lấy thông tin người dùng');
    });
  }



// function getUserName() {
//     return localStorage.getItem('name')
// }



        // axios({
        //     method: 'post',
        //     url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
        //     headers: {
        //         Authorization: `Bearer ${res.data.content.accessToken}`,
        //     },
        // }).then(function (response) {
        //     console.log(response, "response");
        //     document.getElementById("loginLink").innerHTML = `
        //         <i class="fa-solid fa-user"></i>
        //         span>${userName}</span>
        //         `;

        // }).catch(function (error) {
        //     console.log(error);
        // }),

            //     const userName = result.data.name;
            //     document.getElementById("loginLink").innerHTML = `
            //   <i class="fa-solid fa-user"></i>
            //   <span>${userName}</span>
            // `;
            // localStorage.setItem('name', userName)
