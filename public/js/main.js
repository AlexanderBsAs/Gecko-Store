const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const abrirlog = document.querySelector("#abrir__logeo1");
const navlog = document.querySelector("#nav__logeo1");

abrirlog.addEventListener("click",()=>{
if (navlog.style.display === "none") {
    navlog.style.display = "block";
} else {
    navlog.style.display = "none";
}})

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
    if (nav.style.visibility === "hidden") {
        nav.style.visibility = "visible";
    } else {
        nav.style.visibility = "hidden";
    } 
})


