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

const allAppointments=[];
let appointments;
//load all details======================================================================================================
function loadAll(email) {
    const appRef = ref(database,'/appointments');
    onValue(appRef,(snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const appData = childSnapshot.val();
            allAppointments.push(appData);
        });

        console.log('All Appointment Data:', allAppointments);
        console.log(allAppointments[0].user);
        console.log(email);
        console.log(allAppointments);
        for (let i = 0; i < allAppointments.length; i++) {
            console.log(allAppointments[i].user);
            console.log(email);
            if (email===allAppointments[i].user) {
                $("#table-body").append(`<tr><td>${allAppointments[i].date}</td><td>${allAppointments[i].pname}</td><td>${allAppointments[i].dname}</td>
            <td>${allAppointments[i].spec}</td><td>${allAppointments[i].session}</td><td>${allAppointments[i].tele}</td></tr>`);
            }
        }
    });
    /*allAppointments.map((appointment, index) => {
        console.log(appointment.user);
        console.log(email);
        if (email===appointment.user) {
            $("#table-body").append(`<tr><td>${appointment.date}</td><td>${appointment.pname}</td><td>${appointment.dname}</td>
            <td>${appointment.spec}</td><td>${appointment.session}</td><td>${appointment.tele}</td></tr>`);
        }
    });*/
}
//======================================================================================================================
//set login details=====================================================================================================
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    updateSignedInDetails(email);
    loadAll(email);
});

var userLabel=document.getElementById('signIn_name');
var btnLbl=document.getElementById('signIn-btn');

function updateSignedInDetails(email){
    if (email!==null) {
        userLabel.textContent = email;
        btnLbl.textContent = 'Loged In';
    }
}
//======================================================================================================================