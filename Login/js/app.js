var user = document.getElementById('user');
var pass = document.getElementById('pass');




function inicio(){

    if (user.value == "admin" && pass.value == "admin") {
        console.log("Credenciales validas");
        window.location = '../../index.html';
        
    }
    else{
        console.log("Credenciales incorrectas");
        
    }   

}