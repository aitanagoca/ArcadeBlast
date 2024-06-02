// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBorKfyhu643HNOFAdPr_jSsrmDgG7ig1I",
  authDomain: "arcadeblast-c28e9.firebaseapp.com",
  projectId: "arcadeblast-c28e9",
  storageBucket: "arcadeblast-c28e9.appspot.com",
  messagingSenderId: "195192005739",
  appId: "1:195192005739:web:01b1c129085ea47acd7d2e",
  measurementId: "G-N4LLYWXM3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Show/hide password functionality
document.querySelectorAll('.show-password').forEach(item => {
  item.addEventListener('click', event => {
    let input = event.target.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      event.target.classList.remove('fa-eye');
      event.target.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      event.target.classList.remove('fa-eye-slash');
      event.target.classList.add('fa-eye');
    }
  });
});

// Register button click event
document.getElementById('register-btn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const terms = document.getElementById('terms').checked;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!username) {
    alert("El nom d’usuari és obligatori.");
    return;
  }

  if (!email) {
    alert("El correu electrònic és obligatori.");
    return;
  }

  if (!password) {
    alert("La contrasenya és obligatòria.");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("La contrasenya ha de tenir una longitud mínima de 8 caràcters, incloure almenys una lletra majúscula, una minúscula, un número i un caràcter especial.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Les contrasenyes no coincideixen.");
    return;
  }

  if (!terms) {
    alert("Cal acceptar els Termes i Condicions.");
    return;
  }

  // If all checks pass, proceed with Firebase registration
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;

      // Update the user profile with the username
      return updateProfile(user, {
        displayName: username
      });
    })
    .then(() => {
      alert('Registered successfully.');

      // Optionally, redirect to home.html
      window.location.href = 'home-page.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
