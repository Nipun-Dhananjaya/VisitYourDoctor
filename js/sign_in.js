// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const file = urlParams.get('file');
var fileName = file.split(".html");

$("#signUp").on('click', (e) => {
        const email = document.getElementById('typeEmailX-2').value;
        const password = document.getElementById('typePasswordX-2').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                });
                alert("User Sign up Successful!");
                fromSignInPage(fileName[0],email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+errorMessage)
                alert(errorMessage);
            });
});
$("#login").on('click', () => {
    const email=document.getElementById('typeEmailX-2').value;
    const password=document.getElementById('typePasswordX-2').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('User Log in Successfully!');
            fromSignInPage(fileName[0],email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
});