const form = document.getElementById("form");
form.addEventListener("submit", logica);



function logica (a) {
    a.preventDefault();
    let contador = 0;

    const usuBor = document.getElementById("usuario")
    const conBor = document.getElementById("contraseña")
    const usu = document.getElementById("usuario").value;
    const con = document.getElementById("contraseña").value;
    const err1 = document.getElementById("error_i1");
    const err2 = document.getElementById("error_i2");
    err1.innerHTML = "";
    err2.innerHTML = "";
    document.getElementById("error1").innerHTML = "";
    document.getElementById("error2").innerHTML = "";
    usuBor.style.border = "none"
    conBor.style.border = "none"
    usuBor.style.borderBottom = "1px solid grey";
    conBor.style.borderBottom = "1px solid grey";

    if (usu) {
        contador++;
    } else {
        document.getElementById("error1").innerHTML = "<p>Ingrese un Usuario</p>"
        errores(err1, usu, usuBor);
    }
    
    if (con) {
        contador++;
    } else {
        document.getElementById("error2").innerHTML = "<p>Ingrese una Contraseña</p>"
        errores(err2, con, conBor);
    }

    if (contador == 2) {
        window.location.href = "home.html";
    }

}

function errores (error1, usuario1, usuario2) {
    error1.innerHTML = `<i class="fa-solid fa-triangle-exclamation" id="peligro"></i>`
    usuario1.value = ""
    usuario2.style.border = "1px solid red"
}

