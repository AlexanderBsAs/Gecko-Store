window.addEventListener('load', function() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const abrirlog = document.querySelector("#abrir__logeo1");
    const navlog = document.querySelector(".header__nav1");

abrirlog.style.cursor = 'pointer';

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
});