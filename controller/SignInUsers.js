function signInUser() {
  let email = document.querySelector("#signInEmail").value;
  let password = document.querySelector("#signInPass").value;

  console.log(email, password);

  const usersSignIn = new SignInUsers(email, password);

  axios({
    method: 'post',
    url: 'https://shop.cyberlearn.vn/api/Users/signin',
    data: usersSignIn,
  }).then(function () {



    let userStorage = localStorage.getItem('userStorage');
    if (userStorage) {
      userStorage = JSON.parse(userStorage);
      let userList = userStorage.userList;
      let matchedUser = userList.find(user => user.email === email && user.password === password);
      if (matchedUser) {
        let nameList = userStorage.nameList;
        let nameUser = nameList[userList.indexOf(matchedUser)];
        console.log(nameUser);

        localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

        window.location.href = '/index.html';
        let userIcon = document.querySelector(".fa-user");
        userIcon.classList.remove("fa-user");
        userIcon.classList.add("avatar-icon");
      }
      else {
        alert('Sai tên đăng nhập/mật khẩu');
      }
    } else {
      alert('Sai tên đăng nhập/mật khẩu');
    }
  }).catch(function (error) {
    console.log(error);
    alert('Sai tên đăng nhập/mật khẩu');
  });
}

function checkLoggedIn() {

  let loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {

    let user = JSON.parse(loggedInUser);
    let nameUser = user.name;
    let profileImage = user.profileImage;
    let loggedInUserName = document.querySelector("#loggedInUserName");
    loggedInUserName.innerHTML = nameUser;

    if (profileImage) {
      let avatarIcon = document.querySelector(".fa-user");
      avatarIcon.style.display = "none";

      let avatarImg = document.createElement("img");
      avatarImg.classList.add("avatar-icon");
      avatarImg.src = profileImage; 

      let loginLink = document.querySelector(".login");
      loginLink.insertBefore(avatarImg, loggedInUserName);
    } else {
      loggedInUserName.innerHTML = "Sign In";
    }

  } 
}
checkLoggedIn();

document.addEventListener('DOMContentLoaded', function () {
  let loggedInUserName = document.querySelector("#loggedInUserName");
  let loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
    let nameUser = loggedInUser.name;
    loggedInUserName.innerHTML = nameUser;

  }
});

function signOutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.href = '/index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  const userLoggedIn = localStorage.getItem('loggedInUser');
  const popupElement = document.getElementById('logoutPopup');

  if (!userLoggedIn) {
    popupElement.style.display = 'none';
  }

  document.querySelector('.user-profile').addEventListener('mouseenter', function () {
    if (userLoggedIn) {
      popupElement.style.display = 'block';
    }
  });

  document.querySelector('.user-profile').addEventListener('mouseleave', function () {
    if (userLoggedIn) {
      popupElement.style.display = 'none';
    }
  });
});






