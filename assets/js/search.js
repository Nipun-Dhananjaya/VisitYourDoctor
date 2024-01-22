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

let sType='';
let sName='';
let id='';


export function allSearchResults(searchType,searchName) {
    if (typeof searchType !== 'undefined' || typeof searchType !== 'undefined' ||
        typeof sType !== 'undefined'|| typeof sName !== 'undefined') {

        console.log(searchType);
        console.log(searchName);
        sType=searchType.toString();
        sName=searchName.toString();
        console.log(sType);
        console.log(sName);
        window.location.href = './search_result.html';
    } else {
        console.error('Variable "type" is undefined');
    }
}
