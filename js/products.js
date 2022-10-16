let currentProductArray = [];
let minCount = undefined;
let maxCount = undefined;
const precioMax = "19";
const precioMin = "91";
const relevancia = "rel";
let currentSortCriteria = undefined;
let filtroNombreV = false;
let filter = [];



filtrar = (condicion, array) => {
    let resultado = [];
    if (condicion === precioMin) {
        resultado = array.sort(function(a, b) {
            if (a.cost > b.cost) return -1;
            if (a.cost < b.cost) return 1;
            return 0;
        });
    }

    if (condicion === precioMax) {
        resultado = array.sort(function(a, b) {
            if (a.cost > b.cost) return 1;
            if (a.cost < b.cost) return -1;
            return 0;
        });
    }

    if (condicion === relevancia) {
        resultado = array.sort(function(a, b) {
            if (a.soldCount > b.soldCount) return -1;
            if (a.soldCount < b.soldCount) return 1;
            return 0;
        });
    }


    return resultado;

}

filterNameInput = (search) => {
    
    console.log(search)
    const val = search.toLowerCase()
    filter = currentProductArray.filter((product) => (product.name.toLowerCase().includes(val)));
    
    showProductListF();

    
}


setProductID = id => {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"   
}

function showProductList(){

    let htmlContentToAppend = "";

 

    for(let i = 0; i < currentProductArray.length; i++){
        let products = currentProductArray[i];


        

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
            
        }
        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

}


showProductListF = () => {
    htmlContentToAppend = "";
        for(let z = 0; z < filter.length; z++) {
            let products = filter[z];

            htmlContentToAppend +=  `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function filtroPrecio(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = filtrar(currentSortCriteria, currentProductArray);

    showProductList();
}



document.addEventListener("DOMContentLoaded", function(e){
    SetUser();
    getJSONData(productss).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray = resultObj.data.products
            filtroNombre = false;
            showProductList()
            
        }
    });


    document.getElementById("rangoPrecio").addEventListener("click", function(){
        minCount = document.getElementById("precioMin").value;
        maxCount = document.getElementById("precioMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });

    document.getElementById("cleaner").addEventListener("click", function() {
        minCount = document.getElementById("precioMin").value;
        maxCount = document.getElementById("precioMax").value;

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    })

    document.getElementById("filtroMin").addEventListener("click", function() {
        filtroPrecio(precioMin);
    })

    document.getElementById("filtroMax").addEventListener("click", function() {
        filtroPrecio(precioMax);
    })
    
    document.getElementById("filtroRelevancia").addEventListener("click", function() {
        filtroPrecio(relevancia);
    })

    filterName.addEventListener("input", e => {
        filterNameInput(filterName.value);
    })
  
});