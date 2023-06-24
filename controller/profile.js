
var userProfile = localStorage.getItem("loggedInUser");
if (userProfile) {
    userProfile = JSON.parse(userProfile);
    displayUserProfile(userProfile);
}


function displayUserProfile(user) {
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileGender").textContent = user.gender ? "Male" : "Female";
    document.getElementById("profilePhoneNumber").textContent = user.phone;
    document.getElementById("profileAvatar").src = user.profileImage;
   
}
function changeAvatar() {
    var fileInput = document.getElementById("avatarFile");
    var profileImage = document.getElementById("profileAvatar");

    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        profileImage.src = event.target.result;

  
        var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        loggedInUser.profileImage = event.target.result;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      };
      reader.readAsDataURL(file);
    }
  }
 

function handleAvatarChange(event) {
    var file = event.target.files[0];
    var profileAvatar = document.getElementById("profileAvatar");
  
    if (file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        profileAvatar.src = event.target.result;
 
        localStorage.setItem("profileImage", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

function openProfileForm() {
    var profileForm = document.getElementById("profileForm");
    profileForm.classList.add("show-popup");
  

    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
 
    document.getElementById("editEmail").value = loggedInUser.email;
    document.getElementById("editName").value = loggedInUser.name;
    document.getElementById("editPhoneNumber").value = loggedInUser.phone;

  }
  

  function saveUserProfile() {

    var email = document.getElementById("editEmail").value;
    var name = document.getElementById("editName").value;
    var phone = document.getElementById("editPhoneNumber").value;
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    loggedInUser.email = email;
    loggedInUser.name = name;
    loggedInUser.phone = phone;
  
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    alert("Cập nhập thành công!");
  
    var profileForm = document.getElementById("profileForm");
    profileForm.classList.remove("show-popup");
  }
  
  
  
  
  