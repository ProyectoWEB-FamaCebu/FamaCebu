

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
var codigo = document.getElementById("Codigo");
var cantidad = document.getElementById("Cantidad");
var Valor_Unitario = document.getElementById("V_Unitario");
var V_total = document.getElementById("V_Total");
var descripcion = document.getElementById("Descripcion");

function RegistrarCompra() {
  db.collection("Compras")
    .add({
      Fecha: fecha.value,
      Codigo: codigo.value,
      Cantidad: cantidad.value,
      Valor_Unitario: Valor_Unitario.value,
      V_total: cantidad.value * Valor_Unitario.value,
      Descripcion: descripcion.value
    })
    .then(function(docRef) {
      console.log("Documento creado con el ID: ", docRef.id);
      Limpiar();
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
}

// Leer Compras, pintarlas en la tabla {
var tabla = document.getElementById("tabla");

db.collection("Compras").onSnapshot(querySnapshot => {
  tabla.innerHTML = "";
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);

    tabla.innerHTML += `
        <tr>
          <td>${doc.id}</td>
          <td data-sortable="true">${doc.data().Fecha}</td>
          <td>${doc.data().Codigo}</td>
          <td>${doc.data().Cantidad}</td>
          <td>${doc.data().Valor_Unitario}</td>
          <td>${doc.data().V_total}</td>
          <td>${doc.data().Descripcion}</td>
          <td> 
              <button class="btn btn-warning btn-sm" onclick="editar('${doc.id}', '${doc.data().Codigo}', '${doc.data().Cantidad}', '${doc.data().Valor_Unitario}', '${doc.data().V_total}', '${doc.data().Descripcion}')"> <i class="fas fa-pencil-alt"> </i> </button>
              <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}' )"> <i class="fas fa-trash"> </i> </button> 
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
      db.collection("Compras")
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

function editar(id, codigo, descripcion, cantidad, VUnitario, VTotal) {
  document.getElementById("Codigo").value = codigo;
  document.getElementById("Descripcion").value = descripcion;
  document.getElementById("Cantidad").value = cantidad;
  document.getElementById("V_Unitario").value = VUnitario;
  document.getElementById("V_Total").value = VTotal;

  var boton = document.getElementById("boton");
  boton.innerHTML = '<i class="fas fa-pencil-alt"> </i> Editar';

  boton.onclick = function() {
    var Actualizar = db.collection("Compras").doc(id);

    var codigo = document.getElementById("Codigo").value;
    var descripcion = document.getElementById("Descripcion").value;
    var cantidad = document.getElementById("Cantidad").value;
    var Valor_Unitario = document.getElementById("V_Unitario").value;
    var total = document.getElementById("V_Total").value;

    return Actualizar.update({
      Codigo: codigo,
      Descripcion: descripcion,
      Cantidad: cantidad,
      Valor_Unitario: Valor_Unitario,
      V_total: total
    })
      .then(function() {
        console.log("Documento actualizado exitosamente!");
        Limpiar();
        boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar';
        boton.onclick = function() {
          RegistrarCompra();
        };
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

function Limpiar() {
  codigo.value = "";
  descripcion.value = "";
  cantidad.value = "";
  Valor_Unitario.value = "";
  V_total.value = "";
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
