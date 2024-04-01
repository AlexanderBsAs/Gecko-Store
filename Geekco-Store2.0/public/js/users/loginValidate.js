window.onload = function () {

    let loginEmail = document.querySelector("#login-email");
    let loginPassword = document.querySelector("#login-password");
    let form = document.querySelector("#login-form");

    const isEmpty = function(value){
        return value.trim() !== "" 
    }

    const emailFormat = function (email) {
        let regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regEx.test(email);
    };

    const crearMensajeError = function (mensaje, id, clase) {
        const message = document.createElement("p");
        message.innerText = mensaje;
        message.id = id;
        message.classList.add(clase);
        return message;
    };

    // eliminar un mensaje de error
    const eliminarMensajeError = function (id) {
        const mensajeError = document.getElementById(id);
        if (mensajeError) {
            mensajeError.remove();
        }
    };

    // validación de input
    const validarCampo = function (elemento, validacion, mensajeError, contenedorError) {
        if (!validacion(elemento.value)) {
            const message = crearMensajeError(mensajeError, `${elemento.id}-error`, "mensaje-error");
            document.querySelector(contenedorError).appendChild(message);
            return false;
        }
        return true;
    };

    loginEmail.addEventListener("blur", function () {
        eliminarMensajeError(`${loginEmail.id}-error`);
        if (!validarCampo(this, isEmpty, "Este campo no puede estar vacío", "#email-contenedor")) {
            return;
        }
        validarCampo(this, emailFormat, "Formato de email incorrecto", "#email-contenedor");
    });

    loginPassword.addEventListener("blur", function () {
        eliminarMensajeError(`${loginPassword.id}-error`);
        validarCampo(this, isEmpty, "Este campo no puede estar vacío", "#password-contenedor");
    });

    form.addEventListener("submit", function (evento) {
        // Limpiar mensajes de error
        document.querySelectorAll(".mensaje-error").forEach(function (mensaje) {
            mensaje.remove();
        });

        // Guarda true o false depende la validación
        const emailValido = validarCampo(loginEmail, isEmpty, "Este campo no puede estar vacío", "#email-contenedor");
        if (emailValido) {
            validarCampo(loginEmail, emailFormat, "Formato de email incorrecto", "#email-contenedor");
        }
        const passwordValido = validarCampo(loginPassword, isEmpty, "Este campo no puede estar vacío", "#password-contenedor");

        if (!emailValido || !passwordValido) {
            evento.preventDefault();
        }     
    });

};

