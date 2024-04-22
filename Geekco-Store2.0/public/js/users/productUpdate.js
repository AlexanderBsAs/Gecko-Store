
window.addEventListener('load', function() {
const form = document.getElementById("form")
const name = document.querySelector("input#name");
const price = document.querySelector("#price");
const category = document.querySelector("#category")
const description  = document.querySelector("#description")
const stock = document.querySelector("#stock")
const discount = document.getElementById("discount")
const installments = document.getElementById("installments")
form.addEventListener("submit",event=>{
    let errores = [];

    if(name.value == "") {       
        errores.push("El producto debe llevar un nombre obligatoriamente");
    } else if(name.value.length < 3 || name.value.length > 30) {
        errores.push("El nombre debe tener entre 3 y 30 caracteres");
    }

    if(price.value === "") {
        errores.push("El producto necesita un precio obligatoriamente");
    } else if(isNaN(price.value) || !Number.isInteger(Number(price.value))) {
        errores.push("El precio debe ser un número entero positivo.");
    }

    if(category.value === "") {
        errores.push("Debe elegir una categoría, por favor"); 
    }

    if(description.value.length < 3 || description.value.length > 300) { 
        errores.push("Debe agregar una descripción de mínimo 3 y máximo 300 caracteres"); 
    }

    if (stock.value === "" || isNaN(stock.value) || !Number.isInteger(Number(stock.value))) { 
        errores.push("Debe ingresar un número de stock válido."); 
    }

    if (discount.value === ""){
        errores.push("El campo descuento debe tener valor numerico, en caso de no tener el valor debe ser 0")
    }
    
    if (installments.value === ""){
        errores.push("El campo cuotas debe tener valor numerico, en caso de no tener el valor debe ser 0")
    }
    

    if (errores.length > 0) {
        event.preventDefault();
        let ulErrores = document.getElementById("errores");
        ulErrores.innerHTML = "";
        errores.forEach(error => {
            ulErrores.innerHTML += "<li>" + error + "</li>"; 
            ulErrores.style.cssText = "color: white; font-weight: 600;text-align: center;text-shadow: 0 0 black; ";
        });
    }
});
});

