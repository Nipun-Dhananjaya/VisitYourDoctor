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

//direct to top specializations page=========================================================

export function allSpecificDoctors(spType) {
    toTopSpecilsPage(spType);
}
//===========================================================================================

//create cards===============================================================================
async function loadTopSpecOutput() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const type = urlParams.get('type');
    const doctorArr=[];
    let specs;
    var jsonString;
    var jsonDocString;
    var parsedSpecObject;
    var parsedDocObject;

    const specRef = ref(database, '/Specialization');
    onValue(specRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const specData = childSnapshot.val();
            if (specData.name === type) {
                specs = specData;
                jsonString = JSON.stringify(specs);

                parsedSpecObject = JSON.parse(jsonString);

                document.getElementById('heading').innerHTML = type;

                const doctorsRef = ref(database, '/Doctors');
                onValue(doctorsRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const doctorData = childSnapshot.val();
                        //console.log(doctorData.specialization);
                        //console.log(parsedSpecObject.sid);
                        if (doctorData.specialization === parsedSpecObject.sid) {
                            doctorArr.push(doctorData);
                        }
                        jsonDocString = JSON.stringify(doctorArr);

                        parsedDocObject = JSON.parse(jsonDocString);
                    });
                    const cardsContainer = document.getElementById('top-spec');

                    doctorArr.forEach(doc => {
                        var card = document.createElement('div');
                        card.className = 'card';
                        card.style.border = '1px solid #ccc';
                        card.style.borderRadius = '8px';
                        card.style.padding = '10px';
                        card.style.margin = '10px';
                        card.style.width = '250px';
                        card.style.height = '300px';
                        card.style.textAlign = 'center';

                        var imgEl = document.createElement('img');
                        imgEl.style.border = '2px solid darkblue';
                        imgEl.style.borderRadius = '100%';
                        imgEl.style.position = 'relative';
                        imgEl.style.left = '0';
                        imgEl.style.right = '0';
                        imgEl.style.margin = 'auto';
                        imgEl.style.width = '130px';
                        imgEl.style.height = '130px';
                        imgEl.style.display = 'inline-block';
                        imgEl.src = doc.photoUrl;

                        var name = document.createElement('h4');
                        name.textContent = doc.name;
                        name.id='nameTag';
                        var nameTag=document.createElement('nameTag').value;

                        var spec = document.createElement('p');
                        spec.textContent = parsedSpecObject.name;
                        spec.id='specTag';
                        var specTag=document.createElement('specTag').value;

                        var button = document.createElement('button');
                        button.className = 'btn btn-primary';
                        button.id='bookingBtn';
                        button.textContent = 'Book Now';

                        button.addEventListener('click', function () {
                            loadBookingOnTopSpec(doc.name,parsedSpecObject.name,'Specialization');
                        });

                        card.appendChild(imgEl);
                        card.appendChild(name);
                        card.appendChild(spec);
                        card.appendChild(button);

                        console.log(cardsContainer);
                        if (cardsContainer) {
                            cardsContainer.appendChild(card);
                        } else {
                            console.error('cardsContainer is null or undefined');
                        }
                    });
                });
            }
        });
    });
}

// window.onload=loadTopSpecOutput;
$(document).ready(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    updateSignedInDetails(email);
    await loadTopSpecOutput();
});
//===========================================================================================

var userLabel=document.getElementById('signIn_name');
var btnLbl=document.getElementById('signIn-btn');

function updateSignedInDetails(email){
    if (email!==null) {
        userLabel.textContent = email;
        btnLbl.textContent = 'Loged In';
    }
}
