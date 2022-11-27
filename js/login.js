form.addEventListener("submit", function(e) {  
    if(form.checkValidity()) {
        let user = document.getElementById("floatingInput").value
        localStorage.setItem("Usuario", user)
        window.location = "home.html"
        e.preventDefault(); 
    }else {
        e.preventDefault(); 
    }
    form.classList.add('was-validated');   
})
