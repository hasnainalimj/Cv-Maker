// Initialize Firebase
var config = {
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

//Getting User Id From Local Storage
let user_id = localStorage.getItem('user_id');

//Getting UserName
db.collection('users').doc(user_id).get().then(doc => {
    document.getElementById('welcomeUsername').innerHTML = doc.data().firstname;
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

//Goto Create Resume
function gotoCreateResume() {
    window.location = '../create_resume/create_resume.html';
}

//Getting My Resumes

let details = ['Education', 'HobbiesAndActivities', 'Languages', 'Profile', 'Projects', 'Skills', 'WorkHistory'];

// Working
// for(var i=0; i<details.length; i++){
//     db.collection(user_id).doc('My Resume').collection(details[i]).get().then(elems => {
//         elems.forEach(element => {
//             console.log(element.data())
//         })
//     })
// }

db.collection(user_id).doc('My Resume').collection('HobbiesAndActivities').get().then(doc =>{
    doc.forEach(element => {
        console.log(element.data().title)
    })
})

