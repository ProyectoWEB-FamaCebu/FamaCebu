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


//-------------------------------------------------------------------------------------------------
var ref = db.ref("Compras");

var table = document.getElementById("tabla");

//limpia la tabla
table.innerHTML = "";

//con esta función recorre todos los datos almacenados en FB ordenados por mi child(tipo)

ref.orderByChild("Codigo").on("child_added", function(snapshot) {
  //repite el proceso como cuantas referencias encuentre y los asigna a la lista "d"

  var d = snapshot.value();

  {
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // asigna a las celdas el valir del Child especificado
    cell1.innerHTML = d.Cantidad;
    cell2.innerHTML = d.V_total;
  }
});


//-------------------------------------------------------------------------------------------------

// Leer Compras, pintarlas en la tabla {
var tabla = document.getElementById("tabla");

db.collection("Compras").onSnapshot(querySnapshot => {
  tabla.innerHTML = "";
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);

    tabla.innerHTML += `
        <tr>
          <td>${doc.id}</td>
          <td>${doc.data().Fecha}</td>
          <td>${doc.data().Codigo}</td>
          <td>${doc.data().Descripcion}</td>
          <td>${doc.data().Cantidad}</td>
          <td>${doc.data().Valor_Unitario}</td>
          <td>${doc.data().V_total}</td>
        </tr>
        `;
  });
});

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
