let resultCart = []
let arrLocal = []
let contador = 0
let arrCart = [];
let arr = []

showCart = () => {
    html = "";

    for (let i = 0; i < resultCart.length; i++) {
        let cart = resultCart[i];
        html += `
            <tr class="tableTR">
                <th scope="row" ><img style="max-width: 100px;" src="${cart.image}" alt="Imagen Auto"></th>
                <td>${cart.name}</td>
                <td>${cart.currency}${cart.unitCost}</td>
                <td><input id="valor${i}" type="number" style="width: 70px;" class="inputNumberCalc rounded form-control" min="1" max="9" oninput="totalCost(${i}, ${cart.unitCost}), calcCost(), cantidadVerifcacion()" value="1"></td>      
                <td class="cost"> ${cart.currency}<span id="total${i}">${cart.unitCost}</span> </td>   
                <td onclick="deleteCart(${i})" id="trashJ${i}" class="trash"><i class="fa-solid fa-trash-can bordeTrash"></i></td>              
            </tr>           
        `
        document.getElementById("tableCart").innerHTML = html
    }

}

function totalCost(id, cost) {
    let val = document.getElementById("valor" + id).value
    val = val * cost;
    document.getElementById("total" + id).innerHTML = val
    calcCost(val)
}

calcCost = () => {
    let check = 0
    let productoCosto = 0;
    let list = document.getElementsByClassName("checks")
    if (list[0].checked) {
        check = 15
    } else if (list[1].checked) {
        check = 7
    } else {
        check = 5
    }

    for (let i = 0; i < resultCart.length; i++) {
        let index = resultCart[i];
        let val = parseInt(document.getElementById("total" + i).innerHTML)
        if (index.currency == "UYU") {
            val = Math.floor(val /= 44)
        }

        productoCosto += val
    }

    let sending = (productoCosto * check) / 100
    let total = sending + productoCosto
    document.getElementById("cost1").innerHTML = productoCosto
    document.getElementById("cost2").innerHTML = sending
    document.getElementById("cost3").innerHTML = total

}


// FUNCION DESAFIATE 6 TRASH 
function deleteCart(idProduct) {
    let arr = [];
    arr = resultCart.splice(idProduct, 1)
    localStorage.setItem("productoInfo", JSON.stringify(resultCart))
    showCart()
}


// RADIO BUTTON MODAL
radioButton = () => {
    if (radiobtn1.checked) {
        document.querySelectorAll(".inputRadio1").forEach(input => {
            input.disabled = false
            input.required = true
        })

        document.querySelectorAll(".inputRadio2").forEach(input => {
            input.disabled = true
            input.required = false
        })
    }
    if (radiobtn2.checked) {
        document.querySelectorAll(".inputRadio1").forEach(input => {
            input.disabled = true
            input.required = false
        })

        document.querySelectorAll(".inputRadio2").forEach(input => {
            input.disabled = false
            input.required = true
        })
    }
}

//*  VALIDATION

form.addEventListener("submit", function (e) {
    if (form.checkValidity()) {
        if (cantidadVerifcacion() && paymentValidity()) {
            localStorage.setItem("alertCart", 1);
        } else {
            e.preventDefault();
            alertFail()
        }
    } else {
        e.preventDefault();
        alertFail()
    };
    cantidadVerifcacion()
    form.classList.add('was-validated');
    noInput()
    paymentValidity()

})

cantidadVerifcacion = () => {
    let cantError = true
    document.querySelectorAll('.inputNumberCalc').forEach(inputNumber => {
        if (inputNumber.value <= 0 || inputNumber.value >= 20) {
            inputNumber.classList.add('border', 'border-danger', 'text-danger')
            cantError = false;
        } else {
            inputNumber.classList.remove("border", "border-danger", 'text-danger')
        }
    })
    return cantError;
}

noInput = () => {
    document.querySelectorAll(".no-form").forEach(input => {
        input.classList.add('black')
    })
}

paymentValidity = () => {
    let cont = 0
    if (radiobtn1.checked) {
        document.querySelectorAll(".inputRadio1").forEach(input => {
            if (!input.value != "") {
                payment.classList.add('is-invalid')
                cont += 1
            }
            if (cont == 0) {
                payment.classList.remove('is-invalid')
            }
        })
    }
    else {
        document.querySelectorAll(".inputRadio2").forEach(input => {
            if (!input.value != "") {
                payment.classList.add('is-invalid')
                cont += 1
            }
            if (cont == 0) {
                payment.classList.remove('is-invalid')
            }
        })
    }
    return cont == 0;
}

// ALERTAS

alertGood = () => {
    let a = localStorage.getItem("alertCart");
    if (a == 1) {
        let html = "";
        html = `
        <div class="alert alert-success d-flex justify-content-between shadow-sm fade show" role="alert" >
            <div>Has comprado con éxito!</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        document.getElementById("alertGood").innerHTML = html;
    }
    localStorage.setItem("alertCart", 0);
}

alertFail = () => {
    let html = "";
    html = `
    <div class="alert alert-danger d-flex justify-content-between shadow-sm fade show" role="alert" >
        <div>Rellene o Corrija Campos!!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    document.getElementById("alertFail").innerHTML = html;
}


addEventListener("DOMContentLoaded", function () {
    SetUser();
    getJSONData(CART_INFO_URL).then(function (respuesta) {
        if (respuesta.status == "ok") {
            result = respuesta.data.articles;
            let arrLocal = JSON.parse(localStorage.getItem("productoInfo"));
            let count = 0;
            if (arrLocal == undefined) {
                resultCart = result
                showCart();
                calcCost();
                radioButton();
                alertGood();
            } else {
                if (arrLocal.length !== 0) {
                    for (let i = 0; i < arrLocal.length; i++) {
                        let data = arrLocal[i];
                        if (data.id == result[0].id) {
                            count += 1;
                            console.log("asdasdas")
                        }
                    }
                    if (count == 0) {
                        resultCart = result.concat(arrLocal);
                        console.log("asd")
                    } else {
                        resultCart = arrLocal
                    }

                } else {
                    resultCart = result
                }
                showCart();
                calcCost();
                radioButton();
                alertGood();
            }
        }
    })
})
