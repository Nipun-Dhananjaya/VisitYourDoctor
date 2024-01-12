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

        // Iterate over each child and push it into the array
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
        // Iterate over each child and push it into the array
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
        // Iterate over each child and push it into the array
        snapshot.forEach((childSnapshot) => {
            const specData = childSnapshot.val();
            allSpecializationData.push(specData);
        });

        console.log('All Hospital Data:', allSpecializationData);
    })
}



