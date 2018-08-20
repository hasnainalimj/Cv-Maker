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

//Getting User Id From Local Storage
let user_id = localStorage.getItem('user_id');

//Getting UserName
db.collection('users').doc(user_id).get().then(doc => {
    console.log(doc.data().name);
    document.getElementById('welcomeUsername').innerHTML = "Welcome " + doc.data().firstname + " " + doc.data().lastname;
}).catch(e => {
    console.log(e.message);
})

//Logout
function logOut() {
    auth.signOut().then(function () {
        // Sign-out successful.
        localStorage.removeItem('user_id');
        console.log('Logout Successfully');
        window.location.href = "../index.html";
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
}

//Adding Skills
function createResume(event) {
    event.preventDefault();

    //Getting Values
    let resumeTitle = document.getElementById('txtResumeTitle').value;
    localStorage.setItem('resume_title',resumeTitle);
    window.location = "../dashboard/dashboard.html";
}