// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue,set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO9kY8kr4VNuda0jqYqcYIM9c4Ay2WjxQ",
    authDomain: "visit-your-doctor.firebaseapp.com",
    databaseURL: "https://visit-your-doctor-default-rtdb.firebaseio.com",
    projectId: "visit-your-doctor",
    storageBucket: "visit-your-doctor.appspot.com",
    messagingSenderId: "612089348057",
    appId: "1:612089348057:web:b2972ed889f2fe2d36a3c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
//Validations===========================================================================================================
const namePattern = /^[A-Za-z\s\-']+.+$/;
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function calculateMaxDate() {
    var today = new Date();
    var maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14);

    var year = maxDate.getFullYear();
    var month = String(maxDate.getMonth() + 1).padStart(2, '0');
    var day = String(maxDate.getDate()).padStart(2, '0');

    return year + '-' + month + '-' + day;
}
//======================================================================================================================
//load default data=====================================================================================================
var textField = document.getElementById('hospital');
var suggestionsContainer = document.getElementById('hosSuggestions');
function loadDataToFields() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const type = urlParams.get('type');
    const spec = urlParams.get('spec');
    const name = urlParams.get('name');
    let doctor;
    var jsonString;
    var parsedDocObject;
    //Create Doctor Cards===============================================================================================
    if (type==='Doctors'){
        const doctorsRef = ref(database,'/Doctors');
        onValue(doctorsRef,(snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const doctorData = childSnapshot.val();
                if (doctorData.name===name && document.getElementById('dname')!==null){
                    doctor=doctorData;
                    jsonString = JSON.stringify(doctor);

                    parsedDocObject = JSON.parse(jsonString);

                    document.getElementById('dname').value=parsedDocObject.name;
                    document.getElementById('hospital').value=spec;
                    document.getElementById('price').value=parsedDocObject.chPrice;

                    const specRef = ref(database, '/Specialization');
                    onValue(specRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const specData = childSnapshot.val();
                            if (specData.sid === parsedDocObject.specialization) {
                                document.getElementById('specialisation').value=specData.name;
                            }
                        });
                    });
                    document.getElementById('date').min = getCurrentDate();
                    document.getElementById('date').max = calculateMaxDate();
                }
            });
        });
    }
        //==============================================================================================================
    //Create Specification Cards========================================================================================
    else if (type==='Specialization') {
        const doctorsRef = ref(database,'/Doctors');
        onValue(doctorsRef,(snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const doctorData = childSnapshot.val();
                if (doctorData.name===name && document.getElementById('dname')!==null){
                    doctor=doctorData;
                    jsonString = JSON.stringify(doctor);

                    parsedDocObject = JSON.parse(jsonString);

                    document.getElementById('dname').value=parsedDocObject.name;
                    document.getElementById('price').value=parsedDocObject.chPrice;
                    const specRef = ref(database, '/Specialization');
                    onValue(specRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const specData = childSnapshot.val();
                            if (specData.sid === parsedDocObject.specialization) {
                                document.getElementById('specialisation').value=specData.name;
                            }
                        });
                    });
                    let hospArray = Object.values(doctor.hospitals);
                    const hosRef = ref(database, '/Hospital');
                    onValue(hosRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const hospData = childSnapshot.val();
                            const id=hospData.hid;
                            const idArr=id.split('-');
                            const lastNum=parseInt(idArr[1]);
                            for (let i = 0; i < hospArray.length; i++) {
                                console.log(hospArray[i].hosId);
                                console.log(hospData.hid);
                                if (('h'+lastNum)===hospArray[i].hosId){
                                    console.log(hospData.name);
                                    var suggestionElement = document.createElement('div');
                                    suggestionElement.className = 'suggestion';
                                    suggestionElement.textContent = hospData.name;
                                    suggestionsContainer.appendChild(suggestionElement);
                                    suggestionsContainer.style.display = 'block';
                                }
                            }
                        });
                    });
                    //document.getElementById('hospital').value=spec;
                    document.getElementById('date').min = getCurrentDate();
                    document.getElementById('date').max = calculateMaxDate();
                }
            });
        });
    }
        //==============================================================================================================
    //Create Hospital Cards=============================================================================================
    else{
        const doctorsRef = ref(database,'/Doctors');
        onValue(doctorsRef,(snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const doctorData = childSnapshot.val();
                if (doctorData.name===name && document.getElementById('dname')!==null){
                    doctor=doctorData;
                    jsonString = JSON.stringify(doctor);

                    parsedDocObject = JSON.parse(jsonString);

                    document.getElementById('dname').value=parsedDocObject.name;
                    document.getElementById('hospital').value=spec;
                    document.getElementById('price').value=parsedDocObject.chPrice;

                    const specRef = ref(database, '/Specialization');
                    onValue(specRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const specData = childSnapshot.val();
                            if (specData.sid === parsedDocObject.specialization) {
                                document.getElementById('specialisation').value=specData.name;
                            }
                        });
                    });
                    document.getElementById('date').min = getCurrentDate();
                    document.getElementById('date').max = calculateMaxDate();
                }
            });
        });
    }

}
//======================================================================================================================
//send Mail=============================================================================================================
function sendMail(email) {
    var params={
        salutation: document.getElementById('inlineFormSelectPref').value,
        pname: document.getElementById('pname').value,
        tele: document.getElementById('tele').value,
        spec: document.getElementById('specialisation').value,
        dname: document.getElementById('dname').value,
        hospital: document.getElementById('hospital').value,
        date: document.getElementById('date').value,
        session: document.getElementById('time').value,
        price: document.getElementById('price').value,
        user: email
    }

    const serviceID = 'service_ova88rm';
    const templateID = 'template_yc7xoih';

    emailjs.send(serviceID,templateID,params).then((res) =>{
        alert("Appointment placed successfully! Please, Check Your Inbox!");
    }).catch();
}
//======================================================================================================================
//Book Appointment======================================================================================================
$("#bookNow").on('click', function () {
    if (!namePattern.test($("#pname").val())) {
        alert("Patient Name must start with a letter and can only include letters, hyphens, and apostrophes.");
        return;
    }
    if (!namePattern.test($("#dname").val())) {
        alert("Doctor Name must start with a letter and can only include letters, hyphens, and apostrophes.");
        return;
    }
    if (!namePattern.test($("#hospital").val())) {
        alert("Hospital Name must start with a letter and can only include letters, hyphens, and apostrophes.");
        return;
    }
    if (!namePattern.test($("#specialisation").val())) {
        alert("Specialisation must start with a letter and can only include letters");
        return;
    }
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    const uniqueId = new Date().getTime().toString();
    console.log(uniqueId);
    var salDrop=document.getElementById('inlineFormSelectPref');
    var timeDrop=document.getElementById('time');

    set(ref(database, '/appointments/'+uniqueId), {
        salutation: salDrop.options[salDrop.selectedIndex].text,
        pname: document.getElementById('pname').value,
        tele: document.getElementById('tele').value,
        spec: document.getElementById('specialisation').value,
        dname: document.getElementById('dname').value,
        hospital: document.getElementById('hospital').value,
        date: document.getElementById('date').value,
        session: timeDrop.options[timeDrop.selectedIndex].text,
        price: document.getElementById('price').value,
        user: email
    });
    sendMail(email);
});
//======================================================================================================================

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    updateSignedInDetails(email);
    loadDataToFields();
});

var userLabel=document.getElementById('signIn_name');
var btnLbl=document.getElementById('signIn-btn');

function updateSignedInDetails(email){
    if (email!==null) {
        userLabel.textContent = email;
        btnLbl.textContent = 'Loged In';
    }
}

//textfield sugessions updating=====================================================================
$("#hosSuggestions").on('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
        textField.value = event.target.textContent;
        suggestionsContainer.style.display = 'none';
    }
});
//==================================================================================================
