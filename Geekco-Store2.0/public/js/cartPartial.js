document.addEventListener('DOMContentLoaded', () => {
    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Carrito desde localStorage:', carrito);

    // Mostrar los productos del carrito en la vista
    const carritoContainer = document.getElementById('carrito-container');

    if (carritoContainer) {
        // Limpiar contenido previo
        carritoContainer.innerHTML = '';

        // Mostrar cada producto en el carrito
        carrito.forEach(producto => {
            // Crear un contenedor para cada producto en el carrito
            const productoContainer = document.createElement('div');
            productoContainer.classList.add('cart_producto-en-carrito');

            // Crear elemento de imagen para el producto
            const imagenProducto = document.createElement('img');
            const rutaImagen = `/images/products/${producto.image}`;
            imagenProducto.src = rutaImagen;
            imagenProducto.alt = producto.name;
            imagenProducto.classList.add('cart_imagen-producto');
            productoContainer.appendChild(imagenProducto);

            const nombreElement = document.createElement('div');
            nombreElement.textContent = producto.name;
            nombreElement.classList.add('cart_nombre-producto');
            productoContainer.appendChild(nombreElement);

            // Crear elemento para mostrar la cantidad del producto
            const cantidadElement = document.createElement('div');
            cantidadElement.textContent = `Cantidad: ${producto.quantity}`;
            cantidadElement.classList.add('cart_cantidad-producto');
            productoContainer.appendChild(cantidadElement);


            // Agregar el contenedor del producto al contenedor principal del carrito
            carritoContainer.appendChild(productoContainer);
        });
    }
});