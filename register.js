 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
 import {getAuth,  createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"



 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCXVEA14AXYc1Z1n_nAe-UfIITNIrGhkdI",
   authDomain: "musicsaga-d79ef.firebaseapp.com",
   projectId: "musicsaga-d79ef",
   storageBucket: "musicsaga-d79ef.appspot.com",
   messagingSenderId: "1041556918474",
   appId: "1:1041556918474:web:870a4625672b644d72a433",
   measurementId: "G-MP8V6GFGWC"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 
 
 const analytics = getAnalytics(app);



 const signUp = document.getElementById('submit');

 signUp.addEventListener('click', (event) => {
    event.preventDefault();
  
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
  
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
  

    if(!email || !name || !password){
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill up the form",

          });
    }
    else{

        signUp.innerHTML = '<img src="./images/loading.gif" alt="Loading..." style="width: 30px; height: 20px;">';

    const auth = getAuth();
    const db = getFirestore();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid); // Check if UID is being returned
  
        const userData = {
          email: email,
          name: name,
          password: password
        
        };
  
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            console.log("Document successfully written!");
  
            // Clear input fields
            emailInput.value = '';
            passwordInput.value = '';
            nameInput.value = '';
  
            // Show SweetAlert
            Swal.fire({
              title: "Account created!",
              text: "Welcome to MusicSaga!",
              imageUrl: "./images/confette.gif", // Ensure this path is correct
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              didClose: () => {
                window.location.href = 'index.html'; // Redirect after SweetAlert closes
              }
            });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        const errorCode = error.code;
        const errorMessage = error.message;
  
        if (errorCode === 'auth/email-already-in-use') {
            // Show SweetAlert for email already in use
            Swal.fire({
              icon: 'error',
              title: 'Email already in use',
              text: 'The email address you entered is already associated with an account. Please use a different email address.',
              confirmButtonText: 'Okay'
            });
            signUp.innerHTML = ' <button style="font-size: 15px; border: none; background-color: #0ea5e9; color: white; font-weight: 600;">Sign up</button>';

                // Clear input fields
                emailInput.value = '';
                passwordInput.value = '';
                nameInput.value = '';

      
          } else {
            // Show a generic error message for other errors
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Authentication error",
              });
              signUp.innerHTML = ' <button style="font-size: 15px; border: none; background-color: #0ea5e9; color: white; font-weight: 600;">Sign up</button>';

          }
      });
    }
  });
  