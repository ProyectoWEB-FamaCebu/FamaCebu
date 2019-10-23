function Multiplicar() { // Mostrar operacion en tiempo real
  var cantidad = document.getElementById("Cantidad").value;
  var vUnitario = document.getElementById("V_Unitario").value;
  var total = cantidad * vUnitario;

  document.getElementById("V_Total").value = total;
}

window.onload = function() {
  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si es menor de 10
  //if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10

  switch (mes) {
    case 1:
      mes = "Enero";
      break;
    case 2:
      mes = "Febrero";
      break;
    case 3:
      mes = "Marzo";
      break;
    case 4:
      mes = "Abril";
      break;
    case 5:
      mes = "Mayo";
      break;
    case 6:
      mes = "Junio";
      break;
    case 7:
      mes = "Julio";
      break;
    case 8:
      mes = "Agosto";
      break;
    case 9:
      mes = "Septiembre";
      break;
    case 10:
      mes = "Octubre";
      break;
    case 11:
      mes = "Noviembre";
      break;
    case 12:
      mes = "Diciembre";
      break;
  }

  document.getElementById("fechaActual").value =
    dia + " / " + mes + " / " + ano;
};

function SeparadorMiles(input) {
  var num = input.value.replace(/\./g, "");
  if (!isNaN(num)) {
    num = num
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
    num = num
      .split("")
      .reverse()
      .join("")
      .replace(/^[\.]/, "");
    input.value = num;
  } else {
    alert("Solo se permiten numeros");
    input.value = input.value.replace(/[^\d\.]*/g, "");
  }
}


