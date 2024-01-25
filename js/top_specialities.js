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
    console.log("loadSpec");
    const queryString = window.location.search;
    console.log(queryString);
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
                console.log('if condition');
                specs = specData;
                console.log('Doctor Data:', specs);
                jsonString = JSON.stringify(specs);
                console.log("JSON String:", jsonString);

                parsedSpecObject = JSON.parse(jsonString);

                document.getElementById('heading').innerHTML = type;

                const doctorsRef = ref(database, '/Doctors');
                onValue(doctorsRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const doctorData = childSnapshot.val();
                        console.log(doctorData.specialization);
                        console.log(parsedSpecObject.sid);
                        if (doctorData.specialization === parsedSpecObject.sid) {
                            console.log('else if condition');
                            doctorArr.push(doctorData);
                        }
                        console.log('Doctor Data:', doctorArr);
                        jsonDocString = JSON.stringify(doctorArr);
                        console.log("JSON String:", jsonDocString);

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

                        var name = document.createElement('h3');
                        name.textContent = doc.name;

                        var spec = document.createElement('p');
                        spec.textContent = parsedSpecObject.name;

                        var button = document.createElement('button');
                        button.className = 'btn btn-primary';
                        button.style.margin = '8px';
                        button.style.position = 'relative';
                        button.textContent = 'Book Now';

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
    console.log("top");
    await loadTopSpecOutput();
});
//===========================================================================================