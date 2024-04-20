window.onload = function () {
    let loginEmail = document.querySelector("#login-email");
    let loginPassword = document.querySelector("#login-password");
    let form = document.querySelector("#login-form");

    const isEmpty = function(value){
        return value.trim() !== ""; 
    }

    const emailFormat = function (email) {
        let regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regEx.test(email);
    };

    const emailExist = async (email, password) => {
        try {
            console.log("Enviando datos al servidor para obtener la lista de usuarios...");
            const userListResponse = await fetch('http://localhost:3000/api/users');
            const userListData = await userListResponse.json();
            console.log("Respuesta del servidor:", userListData);
    
            // Verificar si el correo electrónico y la contraseña coinciden con algún usuario en la lista
            const user = userListData.data.find(user => user.email === email);
            if (user) {
                console.log("Usuario encontrado en la lista de usuarios");
                return true; // El correo existe y la contraseña es correcta
            } else {
                console.log("Usuario no encontrado en la lista de usuarios");
                return false; // El correo no existe o la contraseña es incorrecta
            }
        } catch (error) {
            console.error("Error al verificar el correo electrónico:", error);
            throw error;
        }
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
        eliminarMensajeError(`${elemento.id}-error`);
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

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault(); // Evitar envío del formulario para depurar
    
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
            return;
        }  
    
        // Validar existencia del correo electrónico y correspondencia de la contraseña en la lista de usuarios
        const correoExiste = await emailExist(loginEmail.value, loginPassword.value);
        console.log("Correo existe:", correoExiste); // Agregado para depuración
        if (!correoExiste) {
            const message = crearMensajeError("El correo electrónico no está registrado o la contraseña es incorrecta", `${loginEmail.id}-error`, "mensaje-error");
            document.querySelector("#email-contenedor").appendChild(message);
            return; // No envía el formulario si el correo no existe
        }

        // Envía el formulario si todas las validaciones son exitosas y el correo existe
        form.submit();
    });
};
