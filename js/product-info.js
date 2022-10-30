productoInfo = {};   
productoComent = [];
let contador = 0
let carrito = []


const workspace = document.getElementById("workspace");
const workspaceComent = document.getElementById("workspaceComent");



mostrarDatosProduct = () => {
    let html = `
    <div class="d-flex justify-content-between my-5">
        <div>
            <h2>${productoInfo.name}</h2>
        </div>
        <button type="button" class="btn btn-success" onclick="cartPush()">Comprar</button>
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
            <div class="carousel-inner border" id="carruselImg">
     
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
    mostrarImg();
}

mostrarImg = () => {

    html = "";
    imagen = productoInfo.images;
    for(let i = 0; i < imagen.length; i++) {
        let img = imagen[i];
        
        if(img[i] == img[0]) {
            html += `
                <div class="carousel-item active border" >
                    <img src="${img}" class="d-block w-100 " alt="...">
                </div>
            `
        } else {
            html += `
                <div class="carousel-item">
                    <img src="${img}" class="d-block w-100" alt="...">
                </div>
            `
        }

    } 
    document.getElementById("carruselImg").innerHTML = html;

}

mostrarComent = () => {
    let html = "";
    for(let i = 0; i < productoComent.length; i++) {
        let comentarios = productoComent[i];

        html = `
            <div class="comentDiv">
                <p class="text-muted"><span class="titleComent">${comentarios.user}</span> -  ${comentarios.dateTime} 
                - ${star(comentarios.score)} <br> ${comentarios.description}</p>
            </div>
        `
        
        workspaceComent.innerHTML += html;
        
      
    }
};

setProductInfoID = id => {
    localStorage.setItem("productInfoID", id);
    window.location = "product-info.html"
}

relacion = () => {
    let html = "";
    let info = productoInfo.relatedProducts
    for(i=0; i < info.length; i++) {
        let conector = info[i];

        html = `
        <div role="button" class="card  border border-dark" style="width: 18rem;" onclick="setProductInfoID(${conector.id})">
          <img src="${conector.image}" class="card-img-top" alt="...">
          <div class="card-body border-top border-dark">
            <p class="card-text">${conector.name}</p>
          </div>
        </div>
      `

      document.getElementById("relation").innerHTML += html
    }

    
}


cartPush = () => {

    let arr = []
    let arrLocal = []
    let arrConcat = []

    const object =  {
        "id": productoInfo.id,
        "name": productoInfo.name,
        "image": productoInfo.images[0],
        "currency": productoInfo.currency,
        "unitCost": productoInfo.cost
    } ;
    arr.push(object);

    if(localStorage.getItem("productoInfo") == undefined) {
        let arrString = JSON.stringify(arr);
        localStorage.setItem("productoInfo", arrString)
    } else {
        arrLocal = JSON.parse(localStorage.getItem("productoInfo"))
        for(let z of arrLocal) {
            if(z.id == productoInfo.id) {
                alert("Este producto ya esta en el carrito!!!!")
                return
            }
        }
        arrConcat = arr.concat(arrLocal);
        localStorage.setItem("productoInfo", JSON.stringify(arrConcat))   
    }
}
   
document.addEventListener("DOMContentLoaded", function() {
    SetUser();
    getJSONData(PRODUCT_INFO_URL).then(function(respuesta) {
        if(respuesta.status == "ok") {
            productoInfo = respuesta.data;
           
            mostrarDatosProduct();
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(respuestaComent) {
                if(respuestaComent.status == "ok") {
                    productoComent = respuestaComent.data
                 
                    mostrarComent();
                    star();
                    relacion();
                    
                    
                }
            }) 
                     
        }
        
    })
})

document.getElementById("form").addEventListener("submit" , function (e) {
    let a = document.getElementById("selectForm").value;
    let b = document.getElementById("textArea").value;
    e.preventDefault();
    if(a != "Puntuación") {
        if(b != "") {
            addComent(a,b);
        }      
    } else {
        alert("Selecciona una Puntuacion")
    }
})

addComent = (a, b) => {
    var today = new Date();
    var c = today.toLocaleString();
    let html = "";
        let d = localStorage.getItem("Usuario")
        console.log("aa")

        html = `
        <div class="comentDiv">
            <p class="text-muted"><span class="titleComent">${d}</span> -  ${c} 
            - ${star(a)} <br> ${b}</p>
        </div>
    `  
    workspaceComent.innerHTML += html;
}

star = (score) => {
    let a = "";
    for(i = 0; i <= 4; i++) {
        if(i < score) {
            a += `<span class="fa fa-star checked"></span>`
        } else {
            a += `<span class="fa fa-star"></span>`
        }
    } 
    return a;
} 
