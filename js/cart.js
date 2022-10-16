let result = []
let amount;

 showCart = () => {
    html = "";


    for(let i = 0; i < result.length; i++) {
        let cart = result[i];
        
        html += `
            <tr class="tableTR">
                <th scope="row" ><img style="max-width: 100px;" src="${cart.image}" alt="Imagen Auto"></th>
                <td>${cart.name}</td>
                <td>${cart.currency}${cart.unitCost}</td>
                <td><input id="valor${i}" type="number" style="max-width: 50px;" min="1" max="9" oninput="totalCost(${i}, ${cart.unitCost})" value="1"></td>      
                <td class="cost"> ${cart.currency}<span id="total${i}">${cart.unitCost}</span> </td>   
            </tr>
            
        `

        document.getElementById("tableCart").innerHTML = html        
    }
}

function totalCost (id, cost) {
    let val = document.getElementById("valor"+id).value
    val = val * cost;
    document.getElementById("total"+id).innerHTML = val
}



addEventListener("DOMContentLoaded", function() {
    SetUser();
    getJSONData(CART_INFO_URL).then(function(respuesta) {
        if(respuesta.status == "ok") {
            result = respuesta.data.articles;    
            showCart(); 
        }       
    })  
})

form.addEventListener("submit", e =>  {
    e.preventDefault()
})




