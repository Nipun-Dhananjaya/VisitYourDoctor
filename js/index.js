import {allSearchResults} from "./search.js";
import {allSpecificDoctors} from "./top_specialities.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const allDoctorData = [];
const allHospitalData = [];
const allSpecializationData = [];

//dropdown selections values get from database===================================================
var dropdown = document.getElementById('dropdown');
loadDoctors();

$("#dropdown").on('change', function() {
    if (dropdown.options[dropdown.selectedIndex].text==='Doctors'){
        loadDoctors();
    }else if(dropdown.options[dropdown.selectedIndex].text==='Hospital'){
        loadHospitals();
    }else{
        loadSpecs();
    }
});

function loadDoctors(){

    const doctorsRef = ref(database,'Doctors/');
    onValue(doctorsRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const doctorData = childSnapshot.val();
            allDoctorData.push(doctorData);
        });
    });
}
function loadHospitals(){
    const hospitalRef = ref(database,'Hospital/');
    onValue(hospitalRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const hospitalData = childSnapshot.val();
            allHospitalData.push(hospitalData);
        });
    });
}
function loadSpecs(){
    const specRef = ref(database,'Specialization/');
    onValue(specRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const specData = childSnapshot.val();
            allSpecializationData.push(specData);
        });
    });
}
//===================================================================================================

//textfield sugessions updating=====================================================================
var textField = document.getElementById('floatingTextarea');
var suggestionsContainer = document.getElementById('suggestions');


$("#floatingTextarea").on('input', function() {
    var inputText = textField.value.toLowerCase();
    if (dropdown.options[dropdown.selectedIndex].text==='Doctors'){
        var matchingSuggestions = allDoctorData.filter(function(doctor) {
            return doctor.name.toLowerCase().includes(inputText);
        });
    }else if(dropdown.options[dropdown.selectedIndex].text==='Hospital'){
        var matchingSuggestions = allHospitalData.filter(function(hospital) {
            return hospital.name.toLowerCase().includes(inputText);
        });
    }else{
        var matchingSuggestions = allSpecializationData.filter(function(specialization) {
            return specialization.name.toLowerCase().includes(inputText);
        });
    }

    updateSuggestions(matchingSuggestions);
});

$("#suggestions").on('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
        textField.value = event.target.textContent;
        suggestionsContainer.style.display = 'none';
    }
});

function updateSuggestions(suggestions) {
    if (suggestions.length > 0) {
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(function(doctor) {
            var suggestionElement = document.createElement('div');
            suggestionElement.className = 'suggestion';
            suggestionElement.textContent = doctor.name;
            suggestionsContainer.appendChild(suggestionElement);
        });
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.innerHTML = 'No Any Matches!';
        suggestionsContainer.style.display = 'block';
    }
}
//==================================================================================================

//direct to search result js file===================================================================
$("#search-btn").on('click', async () => {
    let foundMatch = false;
    allDoctorData.map((doctor, index) => {
        if (doctor.name===(textField.value)){
            foundMatch = true;
            allSearchResults('Doctors',doctor.name);
        }
    });
    allSpecializationData.map((spec, index) => {
        if (spec.name===(textField.value)){
            foundMatch = true;
            allSearchResults('Specialization',spec.name);
        }
    });
    allHospitalData.map((hosp, index) => {
        if (hosp.name===(textField.value)){
            foundMatch = true;
            allSearchResults('Hospital',hosp.name);
        }
    });

    if (!foundMatch){
        alert('No matches found!');
    }
});
//====================================================================================================

//direct to top specializations js file===============================================================
$("#card1").on('click', () => {
    allSpecificDoctors('Cardiologist');
});
$("#card2").on('click', () => {
    allSpecificDoctors('Physician');
});
$("#card3").on('click', () => {
    allSpecificDoctors('Gynecologist');
});
$("#card4").on('click', () => {
    allSpecificDoctors('Pediatrician');
});
$("#card5").on('click', () => {
    allSpecificDoctors('Eye Surgeon');
});
$("#card6").on('click', () => {
    allSpecificDoctors('Cardio Thoracic Surgeon');
});
$("#card7").on('click', () => {
    allSpecificDoctors('Endocrinologist and Diabetologist');
});
$("#card8").on('click', () => {
    allSpecificDoctors('Genito Urinary Surgeon');
});
//====================================================================================================
//set login details===================================================================================
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    updateSignedInDetails(email);
});

var userLabel=document.getElementById('signIn_name');
var btnLbl=document.getElementById('signIn-btn');

function updateSignedInDetails(email){
    if (email!==null) {
        userLabel.textContent = email;
        btnLbl.textContent = 'Loged In';
    }
}
//====================================================================================================
//logout on close=====================================================================================
function handleUnload() {
    signOut(auth).then(() => {
        alert('User Sign out!');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
    });
}

window.addEventListener('unload', handleUnload);
//====================================================================================================