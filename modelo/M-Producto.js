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

var Codigo = document.getElementById("codigo");
var Categoria = document.getElementById("categoria");
var Nombre = document.getElementById("nombre");
var Unidad = document.getElementById("unidad");
var Caracteristicas = document.getElementById("caracteristicas");

function RegistrarProducto() {
  db.collection("Producto")
    .add({
      Codigo: Codigo.value,
      Categoria: Categoria.value,
      Nombre: Nombre.value,
      Unidad: Unidad.value,
      Caracteristicas: Caracteristicas.value
    })
    .then(function(docRef) {
      console.log("Documento creado con el ID: ", docRef.id);
      Limpiar();
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
}

// Leer Producto, pintarlas en la tabla {
var tabla = document.getElementById("tabla");

db.collection("Producto").onSnapshot(querySnapshot => {
  tabla.innerHTML = "";
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);

    tabla.innerHTML += `
        <tr>
          <td>${doc.id}</td>
          <td>${doc.data().Codigo}</td>
          <td>${doc.data().Nombre}</td>
          <td>${doc.data().Categoria}</td>
          <td>${doc.data().Unidad}</td>
          <td>${doc.data().Caracteristicas}</td>
          <td> 
              <button class="btn btn-warning btn-sm" onclick="editar('${doc.id}', '${doc.data().Codigo}', '${doc.data().Nombre}', '${doc.data().Categoria}', '${doc.data().Unidad}', '${doc.data().Caracteristicas}')"> <i class="fas fa-pencil-alt"> </i> </button>
              <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}')"> <i class="fas fa-trash"> </i> </button> 
          </td>
        </tr>
        `;
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
      db.collection("Producto")
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

function editar(id, codigo, nombre, categoria, unidad, caracteristicas) {
  document.getElementById("codigo").value = codigo;
  document.getElementById("nombre").value = nombre;
  document.getElementById("categoria").value = categoria;
  document.getElementById("unidad").value = unidad;
  document.getElementById("caracteristicas").value = caracteristicas;

  var boton = document.getElementById("boton");
  boton.innerHTML = '<i class="fas fa-pencil-alt"> </i> Editar';

  boton.onclick = function() {
    var Actualizar = db.collection("Producto").doc(id);

    var codigo = document.getElementById("codigo").value;
    var nombre = document.getElementById("nombre").value;
    var categoria = document.getElementById("categoria").value;
    var unidad = document.getElementById("unidad").value;
    var caracteristicas = document.getElementById("caracteristicas").value;

    return Actualizar.update({
      Codigo: codigo,
      Nombre: nombre,
      Categoria: categoria,
      Unidad: unidad,
      Caracteristicas: caracteristicas
    })
      .then(function() {
        console.log("Documento actualizado exitosamente!");
        Limpiar();
        boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar';
        boton.onclick = function() {
          RegistrarProducto();
        };
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

function Limpiar() {
  Codigo.value = "";
  Nombre.value = "";
  Categoria.value = "";
  Unidad.value = "";
  Caracteristicas.value = "";
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
