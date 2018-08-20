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
const storage = firebase.storage();

//Getting User Id From Local Storage
let user_id = localStorage.getItem('user_id');
let resume_title = localStorage.getItem('resume_title');

//Getting UserName
db.collection('users').doc(user_id).get().then(doc => {
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



//Filling Constant Values
db.collection('users').doc(user_id).get().then(doc => {
    document.getElementById('txtFirstName').value = doc.data().firstname;
    document.getElementById('txtLastName').value = doc.data().lastname;
    document.getElementById('txtEmail').value = doc.data().email;
    document.getElementById('txtMobile').value = doc.data().mobile;
})

//Adding Profile
function addProfile(event) {
    event.preventDefault();

    //Getting Values
    let pFirstName = document.getElementById('txtFirstName').value;
    let pLastName = document.getElementById('txtLastName').value;
    let pSelectDob = document.getElementById('selectDob').value;
    let pSelectGender = document.getElementById('selectGender').value;
    let pMaritalStatus = document.getElementById('txtMaritalStatus').value;
    let pCareerLevel = document.getElementById('careerLevel').value;
    let pDegreeLevel = document.getElementById('degreeLevelProfile').value;
    let pCnic = document.getElementById('txtCnic').value;
    let pEmail = document.getElementById('txtEmail').value;
    let pMobile = document.getElementById('txtMobile').value;
    let pAddress = document.getElementById('txtAddress').value;
    let pCity = document.getElementById('txtCityProfile').value;
    let pCountry = document.getElementById('selectCountryProfile').value;
    let pZipPostal = document.getElementById('txtZipPostalCode').value;
    let pPreDesignation = document.getElementById('txtPreDesgination').value;
    let pPreCity = document.getElementById('txtPreCity').value;
    let pExpSalary = document.getElementById('txtExpSalary').value;
    let pExperience = document.getElementById('selectExperience').value;
    let pPic = document.getElementById('profilePic').files;
    let pSummary = document.getElementById('txtSummary').value;
    let pPortfolio = document.getElementById('txtPortfolio').value;
    let pFb = document.getElementById('txtFbProfile').value;
    let pLinkedIn = document.getElementById('txtLinkedIn').value;

    let promises = uploadPics(pPic);

    Promise.all(promises).then(function (res) {
        var allvalues = {
            firstname: pFirstName,
            lastname: pLastName,
            dob: pSelectDob,
            gender: pSelectGender,
            maritalstatus: pMaritalStatus,
            careerlevel: pCareerLevel,
            degreelevel: pDegreeLevel,
            cnic: pCnic,
            email: pEmail,
            mobile: pMobile,
            address: pAddress,
            city: pCity,
            country: pCountry,
            zippostal: pZipPostal,
            predesignation: pPreDesignation,
            precity: pPreCity,
            expsalary: pExpSalary,
            experience: pExperience,
            profilepic: res,
            summary: pSummary,
            portfolio: pPortfolio,
            fb: pFb,
            linkedin: pLinkedIn
        }

        if (pSelectGender == "-----Select Gender-----" || pCareerLevel == "-----Select Level-----" || pDegreeLevel == "-----Select Level-----"
            || pCountry == "-----Select Country-----" || pExperience == "-----Select Experience-----") {
            alert("Please Select Appropriate Catagory");
        }
        else {
            db.collection(user_id).doc(resume_title).collection("Profile").add(allvalues)
                .then((res) => {
                    console.log('Added Successfully');
                }).catch((e) => {
                    var eCode = e.code;
                    var eMessage = e.message;
                    console.log(eMessage);
                })
        }
    })


    function uploadPics(array) {
        let storageRef = storage.ref();

        let promises = [];

        for (let i = 0; i < array.length; i++) {

            promises.push(new Promise(function (resolve, reject) {
                let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
                imgRef.put(array[i])
                    .then(function (snapshot) {
                        imgRef.getDownloadURL().then(function (url) {
                            console.log(url);
                            resolve(url);
                        })
                    })
            }))
        }
        return promises;
    }
}



//Adding Skills
function addSkills(event) {
    event.preventDefault();

    //Getting Values
    let skillName = document.getElementById('txtSkill').value;
    let skillLevel = document.getElementById('skillLevel').value;

    if (skillLevel == '-----Select Level-----') {
        alert('Select Appropriate Option');
    }
    else {
        db.collection(user_id).doc(resume_title).collection('Skills').add({
            skill: skillName,
            level: skillLevel
        }).then(res => {
            console.log('Added Successfully');
            document.getElementById('txtSkill').value = "";
        }).catch(e => {
            console.log(e.message);
        })
    }
}

//Adding Work History
function addWorkHistory(event) {
    event.preventDefault();

    //Getting Values
    let jobTitle = document.getElementById('txtJobTitle').value;
    let company = document.getElementById('txtCompany').value;
    let duration = document.getElementById('selectDuration').value;
    let country = document.getElementById('selectCountry').value;
    let city = document.getElementById('txtCity').value;

    if (duration == '-----Select Duration-----' || country == '-----Select Duration-----') {
        alert('Select Appropriate Option');
    }
    else {
        db.collection(user_id).doc(resume_title).collection('WorkHistory').add({
            jobTitle: jobTitle,
            company: company,
            duration: duration,
            country: country,
            city: city
        }).then(res => {
            console.log('Added Successfully');
            document.getElementById('txtJobTitle').value = "";
            document.getElementById('txtCompany').value = "";
            document.getElementById('txtCity').value = "";
        })
    }
}

//Adding Projects
function addProjects(event) {
    event.preventDefault();

    //Getting Values
    let projectTitle = document.getElementById('txtProjectTitle').value;
    let projectUrl = document.getElementById('txtProjectUrl').value;
    let tools = document.getElementById('txtTools').value;

    if (projectUrl == "") {
        db.collection(user_id).doc(resume_title).collection('Projects').add({
            projectTitle: projectTitle,
            projectUrl: 'Not Available',
            tools: tools
        }).then(res => {
            console.log('Added Successfully');
            document.getElementById('txtProjectTitle').value = "";
            document.getElementById('txtProjectUrl').value = "";
            document.getElementById('txtTools').value = "";
        }).catch(e => {
            console.log(e.message);
        })
    }
    else {
        db.collection(user_id).doc(resume_title).collection('Projects').add({
            projectTitle: projectTitle,
            projectUrl: projectUrl,
            tools: tools
        }).then(res => {
            console.log('Added Successfully');
            document.getElementById('txtProjectTitle').value = "";
            document.getElementById('txtProjectUrl').value = "";
            document.getElementById('txtTools').value = "";
        }).catch(e => {
            console.log(e.message);
        })
    }
}

//Adding Languages
function addLanguages(event) {
    event.preventDefault();

    //Getting Values
    let language = document.getElementById('txtLanguage').value;
    let languageLevel = document.getElementById('languageLevel').value;

    if (languageLevel == '-----Select Level-----') {
        alert('Select Appropriate Option');
    }
    else {
        db.collection(user_id).doc(resume_title).collection('Languages').add({
            language: language,
            level: languageLevel
        }).then(res => {
            console.log('Added Successfully');
            document.getElementById('txtLanguage').value = "";
        }).catch(e => {
            console.log(e.message);
        })
    }
}

//Adding Hobbies/Activities
// function addHobbiesAndActivities(event) {
//     event.preventDefault();

//     //Getting Values
//     let hobbyAndActivity = document.getElementById('txtHobbyAndActivity').value;

//     db.collection(user_id).doc(resume_title).collection('HobbiesAndActivities').add({
//         hobbyAndActivity: hobbyAndActivity
//     }).then(res => {
//         console.log('Added Successfully');
//         document.getElementById('txtHobbyAndActivity').value = "";
//     }).catch(e => {
//         console.log(e.message);
//     })
// }

function addHobbiesAndActivities(event) {
    event.preventDefault();

    //Getting Values
    let hobbyAndActivity = document.getElementById('txtHobbyAndActivity').value;

    db.collection(user_id).doc('My Resume').collection('HobbiesAndActivities').add({
        title: resume_title,
        hobbyAndActivity: hobbyAndActivity
    }).then(res => {
        console.log('Added Successfully');
        document.getElementById('txtHobbyAndActivity').value = "";
    }).catch(e => {
        console.log(e.message);
    })
}

//Adding Education
function addEducation(event) {
    event.preventDefault();

    //Getting Values
    let degreeTitle = document.getElementById('txtDegreeTitle').value;
    let degreeLevel = document.getElementById('degreeLevel').value;
    let majors = document.getElementById('selectMajors').value;
    let completionYear = document.getElementById('selectYear').value;
    let institue = document.getElementById('txtInstitute').value;
    let location = document.getElementById('txtLocation').value;
    let resultType = document.getElementById('selectResultType').value;
    let result = document.getElementById('txtResult').value;

    if (degreeLevel == '-----Select Level-----' || majors == '-----Select Major-----' || resultType == '-----Select Result Type-----') {
        alert('Select Appropriate Options');
    }
    else {
        db.collection(user_id).doc(resume_title).collection('Education').add({
            title: degreeTitle,
            level: degreeLevel,
            major: majors,
            year: completionYear,
            institue: institue,
            location: location,
            resultType: resultType,
            rank: result
        }).then(res => {
            console.log('Added Successfully');
            document.getElementById('txtDegreeTitle').value = '';
            document.getElementById('txtInstitute').value = '';
            document.getElementById('txtInstitute').value = '';
            document.getElementById('txtLocation').value = '';
            document.getElementById('txtResult').value = '';
        }).catch(e => {
            console.log(e.message);
        })
    }
}

//DONE
function done(event){
    event.preventDefault();

    if(confirm('Are You Sure!')){
        location.href = '../home/homes.html';        
    }
    else{
        console.log('No');
    }
}