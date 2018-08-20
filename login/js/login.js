// Initialize Firebase
var config = {
  apiKey: "AIzaSyDUdgVJ35yp0D6H5YPKL8tzFGM3A3YsztA",
  authDomain: "cv-maker-37e7a.firebaseapp.com",
  databaseURL: "https://cv-maker-37e7a.firebaseio.com",
  projectId: "cv-maker-37e7a",
  storageBucket: "cv-maker-37e7a.appspot.com",
  messagingSenderId: "750676166893"
};
firebase.initializeApp(config);


const db = firebase.firestore();
const auth = firebase.auth();


//Login
function login(event) {
  event.preventDefault();

  //Getting Values
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  //Login
  auth.signInWithEmailAndPassword(email,password).then(data => {
    localStorage.setItem('user_id',data.user.uid);
    console.log('Login Successfully');
    location.href = "../home/homes.html"
  }).catch(e => {
    console.log(e.message);
    document.getElementById('txtEmail').value = "";
    document.getElementById('txtPassword').value = "";
  })
}