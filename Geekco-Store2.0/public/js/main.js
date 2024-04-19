window.addEventListener('load', function() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const abrirlog = document.querySelector("#abrir__logeo1");
    const navlog = document.querySelector(".header__nav1");
    const principalIconsDiv = document.querySelector(".principal-icons-div");
    const dropdownMenu = document.getElementById("dropdown-menu");
    


console.log("Archivo JS vinculado con éxito")
abrirlog.addEventListener("click", () => {
    navlog.classList.toggle('visible');
});


    abrir.addEventListener("click", () => {
        if (nav.style.visibility === "hidden") {
            nav.style.visibility = "visible";
        } else {
            nav.style.visibility = "hidden";
        }
    });

    function toggleRespuesta(elemento) {

        var respuesta = elemento.nextElementSibling;


        respuesta.classList.toggle("visible");
    }
});