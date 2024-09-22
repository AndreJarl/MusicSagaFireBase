 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
 import {getAuth,  signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
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
 const submitt = document.getElementById('submit');

 const signUp = document.getElementById('submit');
 signUp.addEventListener('click', (event)=>{
     event.preventDefault();

      
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
  
    const email = emailInput.value;
    const password = passwordInput.value;
    

     
   

     submitt.innerHTML = '<img src="loading.gif" alt="Loading..." style="width: 20px; height: 10px;">';

      if(!email || !password){
        Swal.fire({
            icon: 'error',
            title: 'Please enter password and email',
            text: 'Please fill the form completely.',
            confirmButtonText: 'Okay'
          });

          submitt.innerHTML = ' <button style="font-size: 15px; border: none; background-color: #0ea5e9; color: white; font-weight: 600;">Submit</button>';

      }else{

     const auth = getAuth();

     signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        // showMessage('login is successful', 'signInMessage');
       
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);

   
        Swal.fire({
            title: "LOGIN SUCCESFUL!",
            width: 700,
            padding: "3em",
            color: "red",
            confirmButtonColor: '#0ea5e9',
            confirmButtonText: 'Go to MusicSaga',
            background: "#fff url(twerk-dance.gif)",
            didClose: () => {
                window.location.href = './SoftwareD/mp3.html'; // Redirect after SweetAlert closes
            }
          });
       
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-credential' ){
        
                 
                 Swal.fire({
                    icon: 'error',
                    title: 'Incorrect email or password',
                    text: 'Please enter the correct email or password.',
                    confirmButtonText: 'Okay'
                  });
           
                  submitt.innerHTML = ' <button style="font-size: 15px; border: none; background-color: #0ea5e9; color: white; font-weight: 600;">Submit</button>';
                     // Clear input fields
                emailInput.value = '';
                passwordInput.value = '';
                nameInput.value = '';
                      
        }else{
                   
                   Swal.fire({
                    icon: 'error',
                    title: 'Account does not exist',
                    text: 'Please create an account.',
                    confirmButtonText: 'Okay'
                  });

                  submitt.innerHTML = ' <button style="font-size: 15px; border: none; background-color: #0ea5e9; color: white; font-weight: 600;">Submit</button>';
                   // Clear input fields
                emailInput.value = '';
                passwordInput.value = '';
                nameInput.value = '';
        } 
    });
}
 });