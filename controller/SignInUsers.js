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
        console.log(result, "result");
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
            alert('Đăng nhập thành công');
    }).catch(function (error) {
        console.log(error);
        alert('Sai tên đăng nhập/mật khẩu');

    });
}
function getUserName() {
    return localStorage.getItem('name')
}
// function displayUserName() {
//     const userName = getUserName();
//     if (userName) {
//         document.getElementById('loginLink').innerHTML = `
//         <i class="fa-solid fa-user></i>
//         <span>${userName}</span>
//         `
//     }
// }
// // displayUserName();
