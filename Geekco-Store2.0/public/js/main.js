window.addEventListener('load', function() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const abrirlog = document.querySelector("#abrir__logeo1");
    const navlog = document.querySelector(".header__nav1");
    const principalIconsDiv = document.querySelector(".principal-icons-div");
    const dropdownMenu = document.getElementById("dropdown-menu");
abrirlog.style.cursor = 'pointer';
console.log("Archivo JS vinculado con éxito")
abrirlog.addEventListener("click", () => {
    // Alternar la clase 'visible' para mostrar u ocultar el menú
    navlog.classList.toggle('visible');
});


    abrir.addEventListener("click", () => {
        if (nav.style.visibility === "hidden") {
            nav.style.visibility = "visible";
        } else {
            nav.style.visibility = "hidden";
        }
    });

        
      
        principalIconsDiv.addEventListener("click", function() {
          // Mostrar u ocultar el menú al hacer clic en el contenedor de iconos
          dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
        });
      
});