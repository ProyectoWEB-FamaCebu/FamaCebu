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

var fecha = document.getElementById("fechaActual");
var nombre = document.getElementById("nombre");
var tipo = document.getElementById("tipo");
var numero = document.getElementById("numerodocumento");
var telefono = document.getElementById("telefono");
var email = document.getElementById("email");
var contrasena = document.getElementById("contrasena");

function RegistrarUsuario() {
  db.collection("users")
    .add({
      Fecha: fecha.value,
      Nombre: nombre.value,
      Tipo: tipo.value,
      Numero: numero.value,
      Telefono: telefono.value,
      Correo: email.value
    })
    .then(function(docRef) {
      alert("Usuario registrado con éxito.. ");
      console.log("Document written with ID: ", docRef.id);
      Limpiar();
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
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

// función para registrar usuario
function CrearUsuario() {
  var email = document.getElementById("email").value;
  var contrasena = document.getElementById("contrasena").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, contrasena)
    .then(function() {
      // si se registro correctamente en firebase
      alert("Usuario registrado correctamente: " + email);
      verificarCorreo();
      Limpiar();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        alert(
          "El usuario ya existe, por favor inicia sesión \nSi olvidaste tu cotraseña puedes recuperarla"
        );
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

// función que sirve enviar un correo a un usuario que se registre por primera vez
function verificarCorreo() {
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function() {
      // Email sent.
      console.log("Se ha enviado un correo de notificación");
      alert("Se ha enviado un correo de verificación de correo");
    })
    .catch(function(error) {
      // An error happened.
      console.log("Error, no se ha podido enviar un correo de notificación");
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

function Limpiar() {
  //limpio cajas de texto
  nombre.value = "";
  tipo.value = "";
  numero.value = "";
  telefono.value = "";
  email.value = "";
  contrasena.value = "";
}

// funcion que sirve para mostrar los datos de una colección
function leerDatos() {
  var tabla = document.getElementById("tabla");
  db.collection("users").onSnapshot(querySnapshot => {
    tabla.innerHTML = "";
    var i = 1;
    querySnapshot.forEach(doc => {
      tabla.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${doc.data().Fecha}</td>
                <td>${doc.data().Nombre}</td>
                <td>${doc.data().Tipo}</td>
                <td>${doc.data().Numero}</td>
                <td>${doc.data().Telefono}</td>
                <td>${doc.data().Correo}</td>
                <td>
                    <button class="btn btn-success" onclick="editar('${
                      doc.id
                    }','${doc.data().Nombre}','${doc.data().Tipo}','${
        doc.data().Numero
      }', '${doc.Telefono}','${doc.data().Correo}')"><i class="fas fa-pencil-alt"> </i></button>
                    <button class="btn btn-danger" onclick="eliminar('${
                      doc.id
                    }')"><i class="fas fa-trash"> </i></button>
                </td>
            </tr>`;
      i = i + 1;
    });
  });
}
leerDatos();

function editar(id, Nombre, Tipo, Numero, Telefono, Email) {
  document.getElementById("nombre").value = Nombre;
  document.getElementById("tipo").value = Tipo;
  document.getElementById("numerodocumento").value = Numero;
  document.getElementById("telefono").value = Telefono;
  document.getElementById("email").value = Email;

  var boton = document.getElementById("boton");
  boton.innerHTML = '<i class="fas fa-pencil-alt"> </i> Editar';

  boton.onclick = function() {
    var Actualizar = db.collection("users").doc(id);

    var nombre = document.getElementById("nombre").value;
    var tipo = document.getElementById("tipo").value;
    var numero = document.getElementById("numerodocumento").value;
    var telefono = document.getElementById("telefono").value;

    return Actualizar.update({
      Codigo: nombre,
      Descripcion: tipo,
      Cantidad: numero,
      Valor_Unitario: telefono
    })
      .then(function() {
        console.log("Documento actualizado exitosamente!");
        Limpiar();
        boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar';
        boton.onclick = function() {
          RegistrarUsuario();
          CrearUsuario();
        };
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

function eliminar(id) {
  swal({
    title: "¿Estás seguro?",
    text: "Una vez eliminado, ¡no podrá recuperar este archivo!",
    icon: "warning",
    buttons: [" Cancelar ", " Ok! "],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      db.collection("users")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });

      swal("¡Su archivo ha sido eliminado!", {
        icon: "success"
      });
    } else {
      swal("¡Tu archivo está a salvo!");
    }
  });
}

function salir() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Usuario cerro sesion");
      window.location = "../index.html";
    })
    .catch(function(error) {
      console.log(error);
    });
}
