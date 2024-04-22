document.addEventListener('DOMContentLoaded', () => {

    const miniCarrito = document.getElementById('mini-carrito');

    if (miniCarrito) {
        miniCarrito.style.display = 'none';
    }

    // Obtener el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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

            // Crear elemento para mostrar el nombre del producto
            const nombreElement = document.createElement('div');
            nombreElement.textContent = producto.name;
            nombreElement.classList.add('cart_nombre-producto');
            productoContainer.appendChild(nombreElement);

            // Crear elementos para mostrar y ajustar la cantidad del producto
            const cantidadElement = document.createElement('div');
            cantidadElement.textContent = `Cantidad: ${producto.quantity}`;
            cantidadElement.classList.add('cart_cantidad-producto');
            productoContainer.appendChild(cantidadElement);

            // Botón para incrementar la cantidad
            const btnIncrementar = document.createElement('button');
            btnIncrementar.textContent = '+';
            btnIncrementar.classList.add('cart_btn-incrementar');
            btnIncrementar.addEventListener('click', () => {
                // Incrementar la cantidad del producto
                producto.quantity++;
                cantidadElement.textContent = `Cantidad: ${producto.quantity}`;

                // Actualizar el carrito en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            });
            productoContainer.appendChild(btnIncrementar);

            // Botón para decrementar la cantidad (si la cantidad es mayor que 1)
            const btnDecrementar = document.createElement('button');
            btnDecrementar.textContent = '-';
            btnDecrementar.classList.add('cart_btn-decrementar');
            btnDecrementar.addEventListener('click', () => {
                if (producto.quantity > 1) {
                    // Decrementar la cantidad del producto
                    producto.quantity--;
                    cantidadElement.textContent = `Cantidad: ${producto.quantity}`;

                    // Actualizar el carrito en localStorage
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }
            });
            productoContainer.appendChild(btnDecrementar);

            // Botón para eliminar el producto del carrito
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('cart_btn-eliminar');
            btnEliminar.addEventListener('click', () => {
                // Eliminar el producto del carrito
                carrito = carrito.filter(item => item.id !== producto.id);
                productoContainer.remove(); // Eliminar el contenedor del DOM

                // Actualizar el carrito en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            });
            productoContainer.appendChild(btnEliminar);

            // Agregar el contenedor del producto al contenedor principal del carrito
            carritoContainer.appendChild(productoContainer);
        });
    }

    function calcularTotalCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = 0;

        // Calcular el total sumando el precio de cada producto en el carrito
        carrito.forEach(producto => {
            total += producto.price * producto.quantity;
        });

        return total;
    }

    // Función para renderizar el total del carrito en la interfaz
    function renderizarTotalCarrito(total) {
        
            // Crear un elemento para mostrar el total del carrito
            const totalElement = document.createElement('div');
            totalElement.classList.add('productCart__total');
            totalElement.innerHTML = `<p>Total:</br> $${total.toFixed(2)}</p>`;

            // Agregar el elemento del total al contenedor del carrito
            carritoContainer.appendChild(totalElement);
        
    }

    // Obtener el total del carrito y renderizarlo al cargar la página
    const totalCarrito = calcularTotalCarrito();
    renderizarTotalCarrito(totalCarrito);

});