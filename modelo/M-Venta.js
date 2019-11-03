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

var Fecha = document.getElementById("fechaActual");
var Codigo = document.getElementById("codigo");
var Cantidad = document.getElementById("cantidad");
var V_Unitario = document.getElementById("V_Unitario");
var V_Total = document.getElementById("V_Total");
var Descripcion = document.getElementById("descripcion");

function RegistrarVenta() {
  db.collection("Venta")
    .add({
      Fecha: Fecha.value,
      Codigo: Codigo.value,
      Cantidad: Cantidad.value,
      V_Unitario: V_Unitario.value,
      V_Total: V_Total.value,
      Descripcion: Descripcion.value
    })
    .then(function(docRef) {
      console.log("Documento creado con el ID: ", docRef.id);
      Limpiar();
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
}

// Leer Producto, pintarlas en la tabla 
  var tabla = document.getElementById("tabla");

db.collection("Venta").onSnapshot(querySnapshot => {
    tabla.innerHTML = "";
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
  
      tabla.innerHTML += `
          <tr>
            <td>${doc.id}</td>
            <td>${doc.data().Fecha}</td>
            <td>${doc.data().Codigo}</td>
            <td>${doc.data().Cantidad}</td>
            <td>${doc.data().V_Unitario}</td>
            <td>${doc.data().V_Total}</td>
            <td>${doc.data().Descripcion}</td>
            <td> 
                <button class="btn btn-warning btn-sm" onclick="editar('${doc.id}', '${doc.data().Fecha}', '${doc.data().Codigo}', '${doc.data().Cantidad}', '${doc.data().V_Unitario}', '${doc.data().V_Total}', '${doc.data().Descripcion}')"> <i class="fas fa-pencil-alt"> </i> </button>
                <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}')"> <i class="fas fa-trash"> </i> </button> 
            </td>
          </tr>
          `;
    });
});


function eliminar(id) {
  swal({
    title: "¿Estás seguro?",
    text: "Una vez eliminado, ¡no podrá recuperar este archivo!",
    icon: "warning",
    buttons: [ " Cancelar " , " Ok! " ],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      db.collection("Venta")
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


function editar(id, Fecha, Codigo, Cantidad, V_Unitario, V_Total, Descripcion) {
    document.getElementById("fechaActual").value = Fecha;
    document.getElementById("codigo").value = Codigo;
    document.getElementById("cantidad").value = Cantidad;
    document.getElementById("V_Unitario").value = V_Unitario;
    document.getElementById("V_Total").value = V_Total;
    document.getElementById("descripcion").value = Descripcion;

    var boton = document.getElementById("boton");
    boton.innerHTML = '<i class="fas fa-pencil-alt"> </i> Editar';

    boton.onclick = function() {
      var Actualizar = db.collection("Venta").doc(id);

      var Fecha = document.getElementById("fechaActual").value;
      var Codigo = document.getElementById("codigo").value;
      var Cantidad = document.getElementById("cantidad").value;
      var V_Unitario = document.getElementById("V_Unitario").value;
      var V_Total = document.getElementById("V_Total").value;
      var Descripcion = document.getElementById("descripcion").value;

      return Actualizar.update({
        Fecha: Fecha,
        Codigo: Codigo,
        Cantidad: Cantidad,
        V_Unitario: V_Unitario,
        V_Total: V_Total,
        Descripcion: Descripcion
      })
        .then(function() {
          console.log("Documento actualizado exitosamente!");
          Limpiar();
          boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar';
          boton.onclick = function() {
            RegistrarVenta();
          };
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    };
  }


function Limpiar() {
  Codigo.value = "",
  Cantidad.value = "",
  V_Unitario.value = "",
  V_Total.value = "",
  Descripcion.value = "";
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
