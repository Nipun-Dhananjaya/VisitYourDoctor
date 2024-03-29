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

async function loadSearchOutput() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const type = urlParams.get('type');
    const name = urlParams.get('name');
    let doctor;
    const doctorArr=[];
    let specs;
    let hosps;
    var jsonString;
    var jsonDocString;
    var jsonHosString;
    var parsedSpecObject;
    var parsedHospObject;
    var parsedDocObject;
    //Create Doctor Cards===============================================================================================
    if (type==='Doctors'){
        const doctorsRef = ref(database,'/Doctors');
        onValue(doctorsRef,(snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const doctorData = childSnapshot.val();
                if (doctorData.name===name && document.getElementById('name')!==null){
                    doctor=doctorData;
                    jsonString = JSON.stringify(doctor);

                    parsedDocObject = JSON.parse(jsonString);

                    document.getElementById('name').innerHTML=parsedDocObject.name;
                    document.getElementById('disc').innerHTML=parsedDocObject.gender;
                    var imgElement = document.getElementById('profileImg');

                    imgElement.src = parsedDocObject.photoUrl;

                    let hospitals=doctor.hospitals;

                    let hospArray = Object.values(hospitals);

                    const cardsContainer = document.getElementById('right');

                    for (let i = 0; i < hospArray.length; i++) {
                        var hospitalData;
                        const array=[];
                        let id=hospArray[i].hosId;

                        const hospitalRef = ref(database,'Hospital/'+id);
                        onValue(hospitalRef,(snapshot) => {
                            snapshot.forEach((childSnapshot) => {
                                hospitalData = childSnapshot.val();
                                array.push(hospitalData);
                            });
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
                            imgEl.src = array[2];

                            var title = document.createElement('h4');
                            title.textContent = array[3];

                            var address = document.createElement('p');
                            address.textContent = array[0];

                            var button = document.createElement('button');
                            button.className = 'btn btn-primary';
                            button.style.margin = '8px';
                            button.style.position = 'relative';
                            button.textContent = 'Book Now';


                            button.addEventListener('click', function () {
                                loadBookingOnSearch(name,array[3],type);
                            });

                            card.appendChild(imgEl);
                            card.appendChild(title);
                            card.appendChild(address);
                            card.appendChild(button);

                            if (cardsContainer) {
                                cardsContainer.appendChild(card);
                            } else {
                                console.error('cardsContainer is null or undefined');
                            }
                        });

                    }
                }
            });
        });
    }
    //==================================================================================================================
    //Create Specification Cards========================================================================================
    else if (type==='Specialization') {
        const specRef = ref(database, '/Specialization');
        onValue(specRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const specData = childSnapshot.val();
                if (specData.name === name && document.getElementById('name')!==null) {
                    specs = specData;
                    jsonString = JSON.stringify(specs);

                    parsedSpecObject = JSON.parse(jsonString);

                    document.getElementById('name').innerHTML = parsedSpecObject.name;
                    document.getElementById('disc').innerHTML = 'Your Doctors Here!';

                    const doctorsRef = ref(database, '/Doctors');
                    onValue(doctorsRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const doctorData = childSnapshot.val();
                            if (doctorData.specialization === parsedSpecObject.sid) {
                                doctorArr.push(doctorData);
                            }
                            jsonDocString = JSON.stringify(doctorArr);

                            parsedDocObject = JSON.parse(jsonDocString);
                        });
                        const cardsContainer = document.getElementById('right');

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

                            var spec = document.createElement('p');
                            spec.textContent = parsedSpecObject.name;

                            var button = document.createElement('button');
                            button.className = 'btn btn-primary';
                            button.style.margin = '8px';
                            button.style.position = 'relative';
                            button.textContent = 'Book Now';


                            button.addEventListener('click', function () {
                                loadBookingOnSearch(doc.name,parsedSpecObject.name,type);
                            });

                            card.appendChild(imgEl);
                            card.appendChild(name);
                            card.appendChild(spec);
                            card.appendChild(button);

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
    //==================================================================================================================
    //Create Hospital Cards=============================================================================================
    else{
        const hospRef = ref(database, '/Hospital');
        onValue(hospRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const hospData = childSnapshot.val();
                if (hospData.name === name && document.getElementById('name')!==null) {
                    hosps = hospData;
                    jsonHosString = JSON.stringify(hosps);

                    parsedHospObject = JSON.parse(jsonHosString);

                    document.getElementById('name').innerHTML = parsedHospObject.name;
                    document.getElementById('disc').innerHTML = 'Your Doctor Here!';
                    var imgElement = document.getElementById('profileImg');

                    imgElement.src = parsedHospObject.logo;
                    const id=parsedHospObject.hid;
                    const idArr=id.split('-');
                    const lastNum=parseInt(idArr[1]);
                    console.log(lastNum);
                    const docArr=[];

                    const doctorsRef = ref(database, '/Doctors');
                    onValue(doctorsRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const doctorData = childSnapshot.val();
                            docArr.push(doctorData);
                        });
                        const array=[];

                        for (let i = 0; i < docArr.length; i++) {
                            console.log(docArr[i]);
                            let hospital=docArr[i].hospitals;
                            let hospArray = Object.values(hospital);
                            for (let j = 0; j < hospArray.length; j++) {
                                if (hospArray[j].hosId===('h'+lastNum)){
                                    array.push(docArr[i]);
                                }
                            }
                        }
                        const cardsContainer = document.getElementById('right');
                        for (let i = 0; i < array.length; i++) {
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
                            imgEl.src = array[i].photoUrl;

                            var title = document.createElement('h4');
                            title.textContent = array[i].name;

                            var address = document.createElement('p');
                            const allSpecializationData=[];
                            var selectedSpecialization;
                            let specArray;
                            const specRef = ref(database,'Specialization/');
                            onValue(specRef,(snapshot) => {
                                snapshot.forEach((childSnapshot) => {
                                    const specData = childSnapshot.val();
                                    allSpecializationData.push(specData);
                                });
                                specArray = Object.values(allSpecializationData);

                                for (let j = 0; j < specArray.length; j++) {
                                    if (allSpecializationData[j].sid===array[i].specialization){
                                        selectedSpecialization=specArray[j].name;
                                    }
                                    address.textContent = selectedSpecialization;
                                }
                            });
                            var button = document.createElement('button');
                            button.className = 'btn btn-primary';
                            button.id='bookingBtn';
                            button.textContent = 'Book Now';

                            button.addEventListener('click', function () {
                                loadBookingOnSearch(array[i].name,name,type);
                            });

                            card.appendChild(imgEl);
                            card.appendChild(title);
                            card.appendChild(address);
                            card.appendChild(button);

                            if (cardsContainer) {
                                cardsContainer.appendChild(card);
                            } else {
                                console.error('cardsContainer is null or undefined');
                            }
                        }
                    });
                }
            });
        });
    }
    //==================================================================================================================
}
// set login details====================================================================================================
$(document).ready(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    updateSignedInDetails(email);
    await loadSearchOutput();
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

export async function allSearchResults(searchType, searchName) {
    if (typeof searchType !== 'undefined' || typeof searchType !== 'undefined') {
        toSearchPage(searchType,searchName);
    } else {
        console.error('Variable "type" is undefined');
    }
}
