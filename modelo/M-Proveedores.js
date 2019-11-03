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

var fecha = document.getElementById("fechaActual");
var nombre = document.getElementById("nombre");
var tipo = document.getElementById("tipo");
var numerodocumento = document.getElementById("numerodocumento");
var direccion = document.getElementById("direccion");
var telefono = document.getElementById("telefono");
var correo = document.getElementById("correo");
var caracteristicas = document.getElementById("caracteristicas");

function RegistrarProveedor() {
  db.collection("Proveedor")
    .add({
      Fecha: fecha.value,
      Nombre: nombre.value,
      Tipo: tipo.value,
      Numerodocumento: numerodocumento.value,
      Direccion: direccion.value,
      Telefono: telefono.value,
      Correo: correo.value,
      Caracteristicas: caracteristicas.value
    })
    .then(function(docRef) {
      console.log("Documento creado con el ID: ", docRef.id);
      Limpiar();
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
}

// Leer Compras, pintarlas en la tabla 
var tabla = document.getElementById("tabla");

db.collection("Proveedor").onSnapshot(querySnapshot => {
  tabla.innerHTML = "";
  var i=1;
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);
    
    tabla.innerHTML += `
        <tr>
          <td>${i}</td>
          <td>${doc.data().Fecha}</td>
          <td>${doc.data().Nombre}</td>
          <td>${doc.data().Tipo}</td>
          <td>${doc.data().Numerodocumento}</td>
          <td>${doc.data().Direccion}</td>
          <td>${doc.data().Telefono}</td>
          <td>${doc.data().Correo}</td>
          <td>${doc.data().Caracteristicas}</td>
          <td> 
              <button class="btn btn-warning btn-sm" onclick="Editar('${ doc.id}', '${doc.data().Nombre}', '${doc.data().Tipo}', '${doc.data().Numerodocumento}', '${doc.data().Direccion}', '${doc.data().Telefono}', '${doc.data().Correo}', '${doc.data().Caracteristicas}')"> <i class="fas fa-pencil-alt"> </i> </button>
              <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}')"> <i class="fas fa-trash"> </i> </button> 
          </td>
        </tr>
        `;
        i=i+1;
  });
});

// Borrar documentos

function eliminar(id) {
  swal({
    title: "¿Estás seguro?",
    text: "Una vez eliminado, ¡no podrá recuperar este archivo!",
    icon: "warning",
    buttons: [ " Cancelar " , " Ok! " ],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      db.collection("Proveedor")
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

// Editar

function Editar(id, nombre, tipo, numerodocumento, direccion, telefono, correo, caracteristicas) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("tipo").value = tipo;
  document.getElementById("numerodocumento").value = numerodocumento;
  document.getElementById("direccion").value = direccion;
  document.getElementById("telefono").value = telefono;
  document.getElementById("correo").value = correo;
  document.getElementById("caracteristicas").value = caracteristicas;

  var boton = document.getElementById("boton");
  boton.innerHTML = '<i class="fas fa-pencil-alt"> </i> Actualizar';

  boton.onclick = function() {
    var Actualizar = db.collection("Proveedor").doc(id);

    var nombre = document.getElementById("nombre").value;
    var tipo = document.getElementById("tipo").value;
    var numerodocumento = document.getElementById("numerodocumento").value;
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;
    var caracteristicas = document.getElementById("caracteristicas").value;

    return Actualizar.update({
      Nombre: nombre,
      Tipo: tipo,
      Numerodocumento: numerodocumento,
      Direccion: direccion,
      Telefono: telefono,
      Correo: correo,
      Caracteristicas: caracteristicas
    })
      .then(function() {
        console.log("Documento actualizado exitosamente!");
        swal("¡Su archivo ha sido Actualizado exitosamente!", {
          icon: "success"
        });
        Limpiar();
        boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar';
        boton.onclick = function() {
          RegistrarProveedor();
        };
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

function Limpiar() {
  nombre.value = "";
  tipo.value = "";
  numerodocumento.value = "";
  direccion.value = "";
  telefono.value = "";
  correo.value = "";
  caracteristicas.value = "";
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
