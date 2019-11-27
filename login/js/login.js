// Initialize Firebase
var config = {
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

//Login
function login(event) {
  event.preventDefault();

  document.getElementById('btnSignin').innerHTML = "";

  //Getting Values
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  var signinBtn = document.getElementById('btnSignin');
  var loader = document.createElement('img');
  loader.setAttribute('src','assets/images/loader.gif');
  loader.setAttribute('class','loader');
  loader.setAttribute('id','loaders');
  signinBtn.appendChild(loader);

  //Login
  auth.signInWithEmailAndPassword(email,password).then(data => {
    localStorage.setItem('user_id',data.user.uid);
    console.log('Login Successfully');
    location.href = "../home/homes.html"
  }).catch(e => {
    console.log(e.message);
    document.getElementById('txtEmail').value = "";
    document.getElementById('txtPassword').value = "";
    document.getElementById('loaders').style.display = "none";
    document.getElementById('btnSignin').innerHTML = "Signin";
    alert("Error While Signing Up!");
  })
}

//Show Password
function showPassword() {
  let password = document.getElementById('txtPassword');
  let text = document.getElementById('showHideContent');

  if (password.type == "password") {
    password.type = "text";
    text.innerHTML = "Hide Password";
  }
  else {
    password.type = "password";
    text.innerHTML = "Show Password";
  }
}
