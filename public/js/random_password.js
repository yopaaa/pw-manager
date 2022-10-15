const password = document.getElementById("password");
let string = "Aaba;BCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklnopqrstuvwxyz0123456789@#$%^&*!()-_=+[{}]|\;:<,>.?/";
const generate = document.getElementById("generate");
      
generate.addEventListener('click', () => {
          let pass = "";
      
          for (var i = 0; i <= 30 ; i++) {
              let pwd = string[Math.floor(Math.random() * string.length)];
              pass += pwd;
          }
          password.value = pass;
          
});

