let arrInput = []

// Validacion Inputs *
form.addEventListener("submit", function(e) {    
    let mail = document.getElementById("inputMail").value
    if (form.checkValidity()) {
        localStorage.setItem("Usuario", mail) 
        document.querySelectorAll(".inputUser").forEach(input => {
            arrInput.push(input.value)
        })
        localStorage.setItem("UserData", JSON.stringify(arrInput))
    } else {
        e.preventDefault();   
    }
    form.classList.add('was-validated');   
})

function values () {
    let contador = 0;
    let arr = JSON.parse(localStorage.getItem("UserData"))
    document.querySelectorAll(".inputUser").forEach(input => {    
        input.value = arr[contador]
        contador++
    })
}


// Input IMG READER
document.querySelector("#imgInput").addEventListener("change", function () {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("imgAccount", reader.result)
    })

    reader.readAsDataURL(this.files[0])
})


localSTORAGE = () => {

    if(this.localStorage.getItem("Usuario") == undefined) {
        window.location = "index.html"
    }
    if(this.localStorage.getItem("UserData") != undefined) {
        values()
    } 
    inputMail.value = localStorage.getItem("Usuario")

    let urlIMG = this.localStorage.getItem("imgAccount")

    if(urlIMG == undefined) {
        imgSRC.src = "img/img_perfil.png"
    } else {
        imgSRC.src = urlIMG;
    }
}

addEventListener("DOMContentLoaded", function() {
    SetUser();
    localSTORAGE();
})