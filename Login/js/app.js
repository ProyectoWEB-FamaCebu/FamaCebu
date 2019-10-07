var user = document.getElementById("user");
var pass = document.getElementById("pass");

// function inicio() {
//   if (user.value == "admin" && pass.value == "admin") {
//     console.log("Credenciales validas");
//     window.location = "Principal.html";
//   } else {
//     console.log("Credenciales incorrectas");
//   }
// }

var iniciosesion;

function inicio() {
  if (user.value == "admin" && pass.value == "admin") {
    iniciosesion = window.open("Principal.html");
  }
}

function Cerrar() {
  window.close();
}

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

var db = firebase.firestore();

// Agregando datos

function RegistrarPersona() {
  db.collection("users")
    .add({
      nombre: "Ada",
      apellido: "Lovelace",
      edad: 18
    })
    .then(function(docRef) {
      console.log("Documento creado con el ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
}
