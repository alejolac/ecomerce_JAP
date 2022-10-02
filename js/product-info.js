productoInfo = {};   
productoComent = [];
let contador = 0


const workspace = document.getElementById("workspace");
const workspaceComent = document.getElementById("workspaceComent");



mostrarDatosProduct = () => {
    let html = `
    <div class="my-4" >
    <h2>${productoInfo.name}</h2>
    </div>
    <hr>
    <div class="row g-5 marginTop">
        <div class="lista col-lg-5 order-md-last">
        <div class="line my-2 mt-4">
            <div>
            <h3 class="titulo">Precio:</h3>
            <p class="text-muted">${productoInfo.currency} ${productoInfo.cost}</p>
            </div>
            <div>
            <h3 class="right titulo">Descripción:</h3>
            <p class="text-muted right especial">${productoInfo.description}</p>
            </div>
        </div>
        <div class="line my-5">
            <div >
            <h3 class="titulo">Categoria:</h3>
            <p class="text-muted left">${productoInfo.category}</p>
            </div>
            <div class="right">
            <h3 class="titulo">Cantidad Venta:</h3>
            <p class="text-muted right">${productoInfo.soldCount}</p>
            </div>
        </div>
        </div>
    
        <div class="col-lg-7">
        <div id="carouselExampleIndicators" class="carousel slide border border-dark" data-bs-ride="true" >
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div class="carousel-inner border">
            <div class="carousel-item active border">
                <img src="${productoInfo.images[0]}" class="d-block w-100 " alt="...">
            </div>
            <div class="carousel-item">
                <img src="${productoInfo.images[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${productoInfo.images[2]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${productoInfo.images[3]}" class="d-block w-100" alt="...">
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
        </div>
    </div>
    `
    
    workspace.innerHTML = html;
}

mostrarComent = () => {
    let html = "";
    for(let i = 0; i < productoComent.length; i++) {
        let comentarios = productoComent[i];

        html = `
            <div class="comentDiv">
                <p class="text-muted"><span class="titleComent">${comentarios.user}</span> -  ${comentarios.dateTime} 
                - <span class="fa fa-star"></span>
                <span class="fa fa-star" id="star-1"></span>
                <span class="fa fa-star" id="star-2"></span>
                <span class="fa fa-star" id="star-3"></span>
                <span class="fa fa-star" id="star-4"></span> <br> ${comentarios.description}</p>
            </div>
        `
        
        workspaceComent.innerHTML += html;
        
      
    }
};


star = () => {
    let estrellas = document.getElementsByClassName("fa-star");
    let x = 0;
    let y = 4;
    let z = 0

    for(let i = 0; i < productoComent.length; i++) {
        let comentarios = productoComent[i];
        z = 0
        while(x <= y) {
            
            if(z < comentarios.score) {
                estrellas[x].classList.add("checked");
                
            }
            z++
            x++;
        }
        y += 5;   
    }

}


setCatID = a => {
    localStorage.setItem("catID", a);
    window.location = "product-info.html"
}

relacion = () => {
    let html = "";
    let info = productoInfo.relatedProducts
    for(i=0; i < info.length; i++) {
        let conector = info[i];

        html = `
        <div role="button" class="card  border border-dark" style="width: 18rem;" onclick="setCatID(${conector.id})">
          <img src="${conector.image}" class="card-img-top" alt="...">
          <div class="card-body border-top border-dark">
            <p class="card-text">${conector.name}</p>
          </div>
        </div>
      `

      document.getElementById("relation").innerHTML += html
    }

    
}



document.addEventListener("DOMContentLoaded", function() {
    SetUser();
    getJSONData(PRODUCT_INFO_URL).then(function(respuesta) {
        if(respuesta.status == "ok") {
            productoInfo = respuesta.data;
            console.log(PRODUCT_INFO_URL);
            mostrarDatosProduct();
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(respuestaComent) {
                if(respuestaComent.status == "ok") {
                    productoComent = respuestaComent.data
                    console.log(productoComent);
                    mostrarComent();
                    star();
                    relacion();
                    
                    
                }
            }) 
                     
        }
        
    })
})


/*

document.getElementById("form").addEventListener("submit" , function (e) {
    let a = document.getElementById("selectForm").value;
    let b = bdocument.getElementById("textArea").value;
    e.preventDefault();
    if(a != "" && b != "") {
        
        addComent(a,b);

    } else {
    
    }
    

})

*/



/* 
addComent = (a, b) => {
    var today = new Date();
    var c = today.toLocaleString();
    let html = "";
    
    if (localStorage.getItem("Usuario") != undefined) {
        let d = localStorage.getItem("Usuario")

        html = `
        <div class="comentDiv">
            <p class="text-muted"><span class="titleComent">${d}</span> -  ${c} 
            - <span class="fa fa-star"></span>
            <span class="fa fa-star" id="star-1"></span>
            <span class="fa fa-star" id="star-2"></span>
            <span class="fa fa-star" id="star-3"></span>
            <span class="fa fa-star" id="star-4"></span> <br> ${b}</p>
        </div>
    `
    
    workspaceComent.innerHTML += html;
    }

}
*/