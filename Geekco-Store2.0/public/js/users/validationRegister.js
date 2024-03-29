const expresionesRegulares = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,8}/,
    exRegBirthday: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
};

const elemento = (element) => document.querySelector(element);

const messageError = (element, msg, target) => {
    elemento(element).innerText = msg;
    target.classList.add("is-invalid");
};

const validatorInput = (element, target) => {
    elemento(element).innerText = null;
    target.classList.add("is-valid");
    target.classList.remove("is-invalid");
};

const inputName = document.querySelector("#name-user");
    inputName.addEventListener("blur", function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(".text-error", "Debes completar el campo con tu nombre", target);
            
            break;
        case this.value.trim().length < 5:
            messageError(".text-error", "El nombre debe tener 5 o mas caracteres", target);
            break;
        case !expresionesRegulares.exRegAlfa.test(this.value):
            messageError(".text-error", "Solo caracteres alfabetico", target);
            break;
        default:
            validatorInput(".text-error", target);
            break;
    }
});

const inputLastname = document.querySelector("#lastname-user");
inputLastname.addEventListener("blur", function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(".error-lastname", "Debes completar el campo con tu apellido", target);
            break;
        case this.value.trim().length < 5:
            messageError(".error-lastname", "El apellido debe tener 5 o más caracteres", target);
            break;
        case !expresionesRegulares.exRegAlfa.test(this.value):
            messageError(".error-lastname", "Solo caracteres alfabéticos", target);
            break;
        default:
            validatorInput(".error-lastname", target);
            break;
    }
});


const inputEmail = document.querySelector("#email-user")
    inputEmail.addEventListener("blur", async function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(".error-email", "Debes completar este campo con tu email", target);
            break;
        case !expresionesRegulares.exRegEmail.test(this.value):
            messageError(".error-email", "No tiene formato de email", target);
            break;
        default:
            validatorInput(".error-email", target)
            break;
    }
});

const inputAddress = document.querySelector("#direction-user");
inputAddress.addEventListener("blur", function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(".error-address", "Debes completar el campo con tu domicilio", target);
            break;
        default:
            validatorInput(".error-address", target);
            break;
    }
});

const inputBirthday = document.querySelector("#birthday-user");
inputBirthday.addEventListener("blur", function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(".error-birthday", "Debes completar el campo con tu fecha de nacimiento", target);
            break;
        case !expresionesRegulares.exRegBirthday.test(this.value.trim()):
            messageError(".error-birthday", "Formato de fecha de nacimiento inválido", target);
            break;
            default:
                validatorInput(".error-birthday", target);
                break;
    }
});

const inputPassword = document.querySelector("#password-user")
    inputPassword.addEventListener("blur", function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(".error-password","Contraseña desde 6 a 20 caracteres",target);
            break;
        case !expresionesRegulares.exRegPass.test(this.value):
            messageError(".error-password","Debes incluir números, mayúscula, minúscula",target
            );
            break;
        default:
            validatorInput(".error-password", target);
            break;
    }
});

const inputPasswordTwo= document.querySelector("#confirm_password")
    inputPasswordTwo.addEventListener("blur", function({target}) {
    switch (true) {
        case !this.value.trim():
            messageError(
                ".error-password2",
                "Debes completar el campo con tu contraseña",
                target
            );
            break;
        case this.value.trim() !== elemento("#password-user").value.trim():
            messageError(".error-password2", "Las contraseñas no coinciden", target);
            break;
        default:
            validatorInput(".error-password2", target);
            break;
    }
});

const filter = /\.(jpg|jpeg|png|gif|webp|svg)$/;

const inputImg = document.querySelector('#imagen')
    inputImg.addEventListener('change', function({target}) {
    const file = target.files[0];
    if (!file) {
        messageError(".imageError", "Formato valido.", target);
        return;
    }
    if (!filter.test(file.name.toLowerCase())) {
        messageError(".imageError", "Solo se permiten formatos de imagen (jpg, jpeg, png, gif, webp, svg).", target);
    }
});

