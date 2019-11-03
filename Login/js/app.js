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
      if (errorCode == "auth/user-not-found") {
        alert("El usuario no se encuentra registrado en el sistema");
      } else {
        alert(
          "Error de codigo:\n " +
            errorCode +
            " Mensaje de Error:\n " +
            errorMessage
        );
      }
    });
}


  // función que valida si un usuario esta en el sistema
function observadordeestado() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Existe usuario activo");

      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      console.log(user);
      console.log("*******************");
      console.log(user.emailVerified);
      console.log("*******************");
      // si el correo de usuario esta verificado
      if (emailVerified) {
        aparece(email);
        leerDatos();
      } else {
        alert(
          "Por favor verifica tu correo electrónico\nTe hemos enviado un enlace de activación"
        );
      }
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
    } else {
      console.log("No existe el usuario");
      //alert('El usuario no esta registrado en el sistema');
    }
  });
}

// inicio el observadordeestado()
observadordeestado();

function recuperarContrasena() {
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email3").value;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function() {
      // Email sent.
      alert("hemos enviado una link para restablecer tu contraseña");
    })
    .catch(function(error) {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(
        "Error de codigo:\n " +
          errorCode +
          " Mensaje de Error:\n " +
          errorMessage
      );
    });
}