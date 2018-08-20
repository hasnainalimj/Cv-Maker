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


//Registration
function signup(event) {
  event.preventDefault();

  //Getting Values
  let firstName = document.getElementById('txtFirstName').value;
  let lastName = document.getElementById('txtLastName').value;
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;
  let mobile = document.getElementById('txtMobile').value;

  //Signup
  auth.createUserWithEmailAndPassword(email, password).then(data => {
    console.log('Register Successfully');
    localStorage.setItem('user_id', data.user.uid);

    //Adding User Record
    db.collection('users').doc(data.user.uid).set({
      firstname : firstName,
      lastname : lastName,
      email: email,
      password: password,
      mobile: mobile
    }).then(res => {
      console.log('Added Successfully');
      location.href = "../home/homes.html"
    })
  }).catch(e => {
    console.log(e.message);
    document.getElementById('txtName').value = "";
    document.getElementById('txtEmail').value = "";
    document.getElementById('txtPassword').value = "";
    document.getElementById('txtMobile').value = "";
  })
}

//