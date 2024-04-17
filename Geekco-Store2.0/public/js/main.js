window.addEventListener('load', function () {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const abrirlog = document.querySelector("#abrir__logeo1");
    const navlog = document.querySelector(".header__nav1");

    // abrirlog.style.cursor = 'pointer';
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

    function toggleRespuesta(elemento) {
        var respuesta = elemento.nextElementSibling;
        respuesta.classList.toggle("visible");
    }
    const whatsapp = document.querySelector('.icon-whatsapp-button');

    whatsapp.addEventListener('click', function () {
        const urlDestino = 'https://wa.me/1164712830';

        window.open(urlDestino);
    });


    window.onscroll = function () {
        if (document.documentElement.scrollTop > 1500) {
            document.querySelector('.icon-whatsapp-container').classList.add('show')
            document.querySelector('.go-top-container').classList.add('show')
        } else {
            document.querySelector('.icon-whatsapp-container').classList.remove('show')
            document.querySelector('.go-top-container').classList.remove('show')
        }

    }

    document.querySelector('.go-top-container')
        .addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
});
