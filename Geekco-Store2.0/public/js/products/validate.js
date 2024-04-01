window.addEventListener("load",function(){
    let formulario=document.addEventListener(".formCreate")
    formulario.addEventListener("submit", function(e){
        
       let errores=[]
        let nombre=document.querySelector("#name")

        if(nombre.value==""){
            alert("hola")
        }
        else if(nombre.value.length<6){
            errores.push("el nombre debe tener minimo 6 caracteres")
        }
        let precio=document.querySelector("#price")

        if(typeof precio.value != typeof 0){
            errores.push("el precio debe estar en numeros decimales")
        }
        else if( precio.value.length<=0){
            errores.push("el precio no debe estar vacio")
        }
        let descuento=document.querySelector("#discount")
        if(typeof descuento.value != typeof 0){
            errores.push("el descuento debe estar en numeros decimales")
        }
        else if( descuento.value.length<=0){
            errores.push("el descuento no debe estar vacio, por defecto por 0")
        }
        else if(descuento.value.length >2){
            errores.push("no puedes poner mas de 2 digitos en descuento")
        }
        let cuotas= document.querySelector("#installments")
        if(cuotas.value <=0){
            cuotas.value=null
        }
        else if(cuotas.value.length <=0){
            cuotas.value=null
        }
        else if(cuotas.value.length > 4){
            errores.push("no puedes poner mas de 4 digitos en stock")

        }
        let stock= document.querySelector("#stock")
        if( typeof stock.value != typeof 0){
            errores.push("para el stock, debes poner un numero entero")
        }
        else if(stock.value.length <=0){
            errores.push("debes poner si hay errores o no.")
        }
        else if(stock.value.length >4){
            errores.push("no puedes poner mas de 4 digitos en productos en stock")
        }

        let descripcion=document.querySelector("#description")

        if(descripcion.value.length>2000){
            errores.push("no puedes poner mas de 2mil caracteres en la descripcion")

        }
        else if(descripcion.value.length<=0){
            errores.push("debes poner una descripcion")
        }
        let marca=document.querySelector("#brand")
        if(marca.value==""){
            errores.push("debes elegir una marca")
        }
        let plataforma=document.querySelector("#platform")
        if(plataforma.value==""){
            errores.push("debes elegir una plataforma")
        }
        let categoria=document.querySelector("#category")
        if(categoria==""){
            errores.push("debes elegir una categoria")
        }

        if(errores.length>0){
            e.preventDefault()
            let ulErrores=document.querySelector(".errores ul")

            for (let i=0;errores.length>0;i++){
                ulErrores.innerHTML+= "<li>"+errores[i]+"</li>"
            }
        }

    })
})