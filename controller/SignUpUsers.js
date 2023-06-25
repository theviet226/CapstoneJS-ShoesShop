function signUpUser() {
  let email = document.querySelector("#signUpEmail").value;
  let password = document.querySelector("#signUpPass").value;
  let nameUser = document.querySelector("#signUpName").value;
  var confirmPassword = document.getElementById("confirmPass").value;
  let gender = document.querySelector('input[name="gender"]:checked').value === 'true' ? true : false;
  let phone = document.querySelector("#signUpPhoneNumber").value;
  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp. Vui lòng kiểm tra lại!");
    return;
  }

  console.log(email, password, nameUser, gender, phone);
  const defaultProfileImage = "/asset/img/avatar.jpg";

  const usersSignUp = new NewUsers(email, password, nameUser, gender, phone);
  usersSignUp.profileImage = defaultProfileImage;

  let userStorage = localStorage.getItem('userStorage');
  if (!userStorage) {
    userStorage = {
      userList: [],
      nameList: []
    };
  } else {
    userStorage = JSON.parse(userStorage);
  }

  userStorage.userList.push(usersSignUp);
  userStorage.nameList.push(nameUser);

  localStorage.setItem('userStorage', JSON.stringify(userStorage));

  axios({
    method: 'post',
    url: 'https://shop.cyberlearn.vn/api/Users/signup',
    data: usersSignUp,
  }).then(function (result) {
    console.log(result.data.content);
    
    alert('Đăng ký thành công');
    window.location.href = '/view/signIn.html';
   
  
    // Lưu thông tin người dùng vào localStorage
    // localStorage.setItem('loggedInUser', JSON.stringify(usersSignUp));
  
    console.log(userStorage);
  }).catch(function (error) {
    alert('Đăng ký thất bại');
    console.log(error);
  });
  
}