// const validation = new Validation();
// const usernew = new NewUsers();

// function setLocalStorage() {
//   localStorage.setItem("usernew", JSON.stringify(usernew.mangUser));
// }

// function getLocalStorage() {
//   let dataLocal = JSON.parse(localStorage.getItem("usernew"));
//   console.log(dataLocal);
//   if (dataLocal !== null) {
//     usernew.mangUser = dataLocal;
//   }
// }

// getLocalStorage();


function signUpUser() {
    // event.preventDefault(); //! Chưa liên kết API, ngăn hàm reload 
    let email = document.querySelector("#signUpEmail").value;
    let password = document.querySelector("#signUpPass").value;
    let nameUser = document.querySelector("#signUpName").value;
    let gender = document.querySelector('input[name="gender"]:checked').value === 'true' ? true : false;
    let phone = document.querySelector("#signUpPhoneNumber").value;
  
    console.log(email, password, nameUser, gender, phone);
  
    const usersSignUp = new NewUsers(email, password, nameUser, gender, phone);
  
    let userList = localStorage.getItem('userList');
    if(!userList){
      userList = []
    }
    else{
      userList = JSON.parse(userList);
    }
    userList.push(usersSignUp);
    
    localStorage.setItem('userList', JSON.stringify(userList));
  
    axios({
      method: 'post',
      url: 'https://shop.cyberlearn.vn/api/Users/signup',
      data: usersSignUp,
    }).then(function (result) {
      console.log(result.data.content);
      alert('Đăng ký thành công');
      localStorage.setItem('name', nameUser);
      console.log(localStorage.getItem('userList'))
    }).catch(function (error) {
      console.log(error);
    });
  }
  