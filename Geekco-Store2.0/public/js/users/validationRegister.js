const expresionesRegulares = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,12}/
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
    if (!this.value.trim()) {
        messageError(".text-error", "Debes completar el campo con tu nombre", target);
    } else if (this.value.trim().length < 5) {
        messageError(".text-error", "El nombre debe tener 5 o más caracteres", target);
    } else if (!expresionesRegulares.exRegAlfa.test(this.value)) {
        messageError(".text-error", "Solo caracteres alfabéticos", target);
    } else {
        validatorInput(".text-error", target);
    }
});

    const inputLastname = document.querySelector("#lastname-user");
inputLastname.addEventListener("blur", function({target}) {
    if (!this.value.trim()) {
        messageError(".error-lastname", "Debes completar el campo con tu apellido", target);
    } else if (this.value.trim().length < 5) {
        messageError(".error-lastname", "El apellido debe tener 5 o más caracteres", target);
    } else if (!expresionesRegulares.exRegAlfa.test(this.value)) {
        messageError(".error-lastname", "Solo caracteres alfabéticos", target);
    } else {
        validatorInput(".error-lastname", target);
    }
});

const inputEmail = document.querySelector("#email-user");
inputEmail.addEventListener("blur", async function({target}) {
    if (!this.value.trim()) {
        messageError(".error-email", "Debes completar este campo con tu email", target);
    } else if (!expresionesRegulares.exRegEmail.test(this.value)) {
        messageError(".error-email", "No tiene formato de email", target);
    } else {
        validatorInput(".error-email", target);
    }
});

const inputAddress = document.querySelector("#direction-user");
inputAddress.addEventListener("blur", function({target}) {
    if (!this.value.trim()) {
        messageError(".error-address", "Debes completar el campo con tu domicilio", target);
    } else {
        validatorInput(".error-address", target);
    }
});

const inputDate = document.querySelector('#birthday-user');

inputDate.addEventListener("blur", function({target}) {
    const selectedDate = new Date(this.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    const oldestAllowedDate = new Date(1944, 0, 1); // Fecha más antigua permitida (1 de enero de 1944)

    let errorMessage = null;

    if (isNaN(selectedDate.getTime()) || selectedDate.getFullYear() < 1944) {
        errorMessage = 'Fecha inválida';
    } else if (selectedDate > eighteenYearsAgo) {
        errorMessage = 'Debe ser mayor de 18 años';
    }

    if (errorMessage) {
        messageError('.error-birthday', errorMessage, target);
    } else {
        validatorInput('.error-birthday', target);
    }
});

const inputPassword = document.querySelector("#password-user");
inputPassword.addEventListener("blur", function({target}) {
    if (!this.value.trim()) {
        messageError(".error-password","Contraseña desde 8 a 12 caracteres",target);
    } else if (!expresionesRegulares.exRegPass.test(this.value)) {
        messageError(".error-password","Debes incluir números, mayúscula, minúscula",target);
    } else {
        validatorInput(".error-password", target);
    }
});

const inputPasswordTwo= document.querySelector("#confirm_password");
inputPasswordTwo.addEventListener("blur", function({target}) {
    if (!this.value.trim()) {
        messageError(".error-password2", "Debes completar el campo con tu contraseña", target);
    } else if (this.value.trim() !== elemento("#password-user").value.trim()) {
        messageError(".error-password2", "Las contraseñas no coinciden", target);
    } else {
        validatorInput(".error-password2", target);
    }
});

const filter = /\.(jpg|jpeg|png|gif|webp|svg)$/;

const inputImage = document.querySelector('#imagen')
    inputImage.addEventListener('change', function({target}) {
    const file = target.files[0];
    if (!file) {
        messageError(".imageError", "Formato valido.", target);
        return;
    }
    if (!filter.test(file.name.toLowerCase())) {
        messageError(".imageError", "Solo se permiten formatos de imagen (jpg, jpeg, png, gif, webp, svg).", target);
    }
});
