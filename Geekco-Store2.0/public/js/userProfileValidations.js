window.addEventListener('load', () => {
    const inputs = document.querySelectorAll('.userProfile-input');
    const form = document.querySelector('.profile-form');

    function inputError(input, mensaje) {
        let parentInput = input.parentElement;
        const textError = parentInput.querySelector(`#${input.name}-error`);
        input.classList.add('input-invalid')
        if (textError) {
            textError.innerText = mensaje;
        } else {
            const newError = document.createElement('p');
            newError.classList.add('text-error')
            
            newError.id = `${input.name}-error`;
            newError.innerText = mensaje;
            parentInput.appendChild(newError);
        }
    }

    function deleteErrors(input) {
        const textError = document.querySelector(`#${input.name}-error`);
        if (textError) {
            textError.remove();
        }
        input.classList.remove('input-invalid')
        input.classList.add('input-valid')

    }

    function isEmpty(input) {
        return input.value.trim();
    }

    function minMax(input, min, max) {
        return input.value.length >= min && input.value.length <= max;
    }

    function inputValidations(input, e) {
        const textErrorElement = document.getElementById(`${input.name}-error`);
        if (textErrorElement) {
            textErrorElement.remove();
        }
        if (!input.value.trim()) {
            const emptyMessage = `El campo no puede estar vacío`;
            inputError(input, emptyMessage);
            return false;
        }
        if (input.name === 'first_name' || input.name === 'last_name') {
            const min = 3;
            const max = 10;
            if (!minMax(input, min, max)) {
                const minMaxMessage = `El campo debe contener tener entre ${min} y ${max} caracteres`;
                inputError(input, minMaxMessage);
                return false;
            }
        }
        deleteErrors(input);
        return true;
    }

    inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            inputValidations(input, e);
        });
    });

    form.addEventListener('submit', (e) => {
        inputs.forEach(input => {
            if (inputValidations(input, e) == false) {
                e.preventDefault();
            }
        });
    });
});
