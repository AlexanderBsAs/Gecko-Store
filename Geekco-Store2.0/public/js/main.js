const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const abrirlog = document.querySelector("#abrir__logeo1");
const navlog = document.querySelector(".header__nav1");



abrir.addEventListener("click", () => {
    if (nav.style.visibility === "hidden") {
        nav.style.visibility = "visible";
    } else {
        nav.style.visibility = "hidden";
    }})


