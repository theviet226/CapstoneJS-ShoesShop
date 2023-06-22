function NewUsers(email, password, nameUser, gender, phone) {
    this.email = email;
    this.password = password;
    this.name = nameUser;
    this.gender = gender;
    this.phone = phone;
  }
  
  function SignInUsers(email, password) {
    this.email = email;
    this.password = password;
  }