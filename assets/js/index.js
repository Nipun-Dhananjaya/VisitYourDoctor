import { allSpecificDoctors} from "./top_specialities.js";
import {allSearchResults} from "./search.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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

const allDoctorData = [];
const allHospitalData = [];
const allSpecializationData = [];

//dropdown selections values get from database===================================================
var dropdown = document.getElementById('dropdown');
loadDoctors()

dropdown.addEventListener('change', function() {
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

        console.log('All Doctor Data:', allDoctorData);
    })
}
function loadHospitals(){
    const hospitalRef = ref(database,'Hospital/');
    onValue(hospitalRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const hospitalData = childSnapshot.val();
            allHospitalData.push(hospitalData);
        });

        console.log('All Hospital Data:', allHospitalData);
    })
}
function loadSpecs(){
    const specRef = ref(database,'Specialization/');
    onValue(specRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const specData = childSnapshot.val();
            allSpecializationData.push(specData);
        });

        console.log('All Spec Data:', allSpecializationData);
    })
}
//===================================================================================================

//textfield suggessions updating=====================================================================
var textField = document.getElementById('floatingTextarea');
var suggestionsContainer = document.getElementById('suggestions');


textField.addEventListener('input', function() {
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

suggestionsContainer.addEventListener('click', function(event) {
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
        if (doctor.name.includes(textField.value)){
            foundMatch = true;
            allSearchResults('Doctors',doctor.name);
        }
    });
    allSpecializationData.map((spec, index) => {
        if (spec.name.includes(textField.value)){
            foundMatch = true;
            allSearchResults('Specialization',spec.name);
        }
    });
    allHospitalData.map((hosp, index) => {
        if (hosp.name.includes(textField.value)){
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
$("#card1").on('click', async () => {
    allSpecificDoctors('Cardiologist');
});
$("#card2").on('click', async () => {
    allSpecificDoctors('Physician');
});
$("#card3").on('click', async () => {
    allSpecificDoctors('Gynecologist');
});
$("#card4").on('click', async () => {
    allSpecificDoctors('Pediatrician');
});
$("#card5").on('click', async () => {
    allSpecificDoctors('Eye Surgeon');
});
$("#card6").on('click', async () => {
    allSpecificDoctors('Cardio Thoracic Surgeon');
});
$("#card7").on('click', async () => {
    allSpecificDoctors('Endocrinologist and Diabetologist');
});
$("#card8").on('click', async () => {
    allSpecificDoctors('Genito Urinary Surgeon');
});
//====================================================================================================
