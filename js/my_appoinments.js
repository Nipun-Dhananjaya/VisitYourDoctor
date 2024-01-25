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

/*
const allAppointments=[];
//load all details
async function loadAll() {
    const doctorsRef = ref(database,'Doctors/');
    onValue(doctorsRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const doctorData = childSnapshot.val();
            allAppointments.push(doctorData);
        });

        console.log('All Appointment Data:', allAppointments);
    })
    $("#table-body").empty();
    allAppointments.map((appointment, index) => {
        $("#table-body").append(`<tr><td>${appointment.date}</td><td>${appointment.pName}</td><td>${appointment.dName}</td><td>${appointment.specialization}</td><td>${appointment.session}</td><td>${appointment.tele}</td></tr>`);
    });
}
window.onload=loadAll;*/
