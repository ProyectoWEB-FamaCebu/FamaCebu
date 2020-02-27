
let Categoria = document.getElementById("categoria");
let Nombre = document.getElementById("nombre");
let Unidad = document.getElementById("unidad");
let Precio = document.getElementById("precio");
let Stock = document.getElementById("stock");
let Caracteristicas = document.getElementById("caracteristicas");

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyDLsFQ5raJxVMwScErCpQrThc1G6c-bT-U",
  authDomain: "v2famacebu.firebaseapp.com",
  databaseURL: "https://v2famacebu.firebaseio.com",
  projectId: "v2famacebu",
  storageBucket: "v2famacebu.appspot.com",
  messagingSenderId: "1024538402660",
  appId: "1:1024538402660:web:30c63948e4ffe60c7ca471"
};

// El método componentDidMout() se ejecuta cuando la página haya cargado completamente
$(document).ready(componentDidMout());

async function componentDidMout() {
  getUnidades();
}

function getUnidades() {
  let selectable = document.getElementById("unidad");
  _fetch('GET', 'unidades')
    .then(res => {
      res.map(unidad => {
        selectable.innerHTML += `
        <option value=${unidad.ID_UNIDADES}>${unidad.NOMBRE}</option>
        `;
      })
    })
    .catch(err => {
      console.log("error: ", err);
    })
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

// Agregando datos


async function createProduct() {
  const variables = {
    "nombre_producto": Nombre.value,
    "categoria": Categoria.value,
    "precio": Precio.value,
    "descripcion": Caracteristicas.value,
    "stock": Stock.value,
    "fkid_unidades": Unidad.value
  }
  console.log(variables);
  // await fetch("http://localhost:5000/product")
  _fetch('POST', 'product', variables)
    .catch(err => {
      console.log("Notifications error: ", err);
    })
}

function RegistrarProducto() {

  createProduct();

  db.collection("Producto")
    .add({
      Categoria: Categoria.value,
      Nombre: Nombre.value,
      Unidad: Unidad.value,
      Precio: Precio.value,
      Caracteristicas: Caracteristicas.value,
      Stock: Stock.value,
    })
    .then(function (docRef) {
      console.log("Documento creado con el ID: ", docRef.id);
      Limpiar();
    })
    .catch(function (error) {
      console.error("Error: ", error);
    });
}

// Leer Producto, pintarlas en la tabla {
let tabla = document.getElementById("tabla");

db.collection("Producto").onSnapshot(querySnapshot => {
  tabla.innerHTML = "";

  querySnapshot.forEach(doc => {
    console.log(doc);
    tabla.innerHTML += `
        <tr>
          <td>${doc.id}</td>
          <td>${doc.data().Nombre}</td>
          <td>${doc.data().Categoria}</td>
          <td>${doc.data().Unidad}</td>
          <td>${doc.data().Caracteristicas}</td>
          <td>${doc.data().precio}</td>
          <td> 
              <button class="btn btn-warning btn-sm" onclick="editar('${doc.id}', '${doc.data().Nombre}', '${doc.data().Categoria}', '${doc.data().Unidad}', '${doc.data().Caracteristicas}')"> <i class="fas fa-pencil-alt"> </i> </button>
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
    buttons: [" Cancelar ", " Ok! "],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      db.collection("Producto")
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
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

function editar(id, nombre, categoria, unidad, caracteristicas) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("categoria").value = categoria;
  document.getElementById("unidad").value = unidad;
  document.getElementById("caracteristicas").value = caracteristicas;

  let boton = document.getElementById("boton");
  boton.innerHTML = '<i class="fas fa-pencil-alt"> </i> Editar';

  boton.onclick = function () {
    let Actualizar = db.collection("Producto").doc(id);

    let nombre = document.getElementById("nombre").value;
    let categoria = document.getElementById("categoria").value;
    let unidad = document.getElementById("unidad").value;
    let caracteristicas = document.getElementById("caracteristicas").value;

    return Actualizar.update({
      Nombre: nombre,
      Categoria: categoria,
      Unidad: unidad,
      Caracteristicas: caracteristicas
    })
      .then(function () {
        console.log("Documento actualizado exitosamente!");
        Limpiar();
        boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar';
        boton.onclick = function () {
          RegistrarProducto();
        };
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

function Limpiar() {
  Nombre.value = "";
  Categoria.value = "";
  Unidad.value = "";
  Caracteristicas.value = "";
}

function salir() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Usuario cerro sesion");
      window.location = "../index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}
