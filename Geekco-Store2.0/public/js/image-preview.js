document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileButton').addEventListener('click', function() {
        document.getElementById('imagen').click();
    });
});

function previewImage(event, querySelector) {
    // Recuperamos el input que desencadenó la acción
    const input = event.target;
    
    // Recuperamos la etiqueta img donde cargaremos la imagen
    const $imgPreview = document.querySelector(querySelector);
    
    // Verificamos si existe una imagen seleccionada
    if (!input.files || !input.files.length) return;
    
    // Recuperamos el archivo subido
    const file = input.files[0];
    
    // Creamos la URL
    const objectURL = URL.createObjectURL(file);
    
    // Modificamos el atributo src de la etiqueta img
    $imgPreview.src = objectURL;
}

module.exports = previewImage;
