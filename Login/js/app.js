/* function inicio() {
  if (user.value == "admin" && pass.value == "admin") {
    console.log("Credenciales validas");
    
  } else {
    console.log("Credenciales incorrectas");
  }
} */

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDLsFQ5raJxVMwScErCpQrThc1G6c-bT-U",
  authDomain: "v2famacebu.firebaseapp.com",
  databaseURL: "https://v2famacebu.firebaseio.com",
  projectId: "v2famacebu",
  storageBucket: "v2famacebu.appspot.com",
  messagingSenderId: "1024538402660",
  appId: "1:1024538402660:web:30c63948e4ffe60c7ca471"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var correo = document.getElementById("user");
var contrasena = document.getElementById("pass");

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(correo.value, contrasena.value)
    .then(function() {
      window.location = "Principal.html";
      console.log("Usuario validado exitosamnte...");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + "::" + errorMessage);
    });
}

firebase
  .auth()
  .createUserWithEmailAndPassword(correo.value, contrasena.value)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ":::" + errorMessage);
  });
