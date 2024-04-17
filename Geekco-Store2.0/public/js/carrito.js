document.addEventListener('DOMContentLoaded', () => {
    actualizarMiniCarrito();
    const minicarrito = document.getElementById("mini-carrito");
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.querySelector('#lista-carrito');
    const totalCarrito = document.querySelector('#total-carrito');
    const carritoIcono = document.querySelector('.fa-solid.fa-cart-shopping');
    function agregarProductoAlCarrito(productId, productName, productPrice,productImage) {
        const producto = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1 ,
            image: productImage
        };
    
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Buscamos si el producto ya está en el carrito por su ID
        const productoEnCarrito = carrito.find(item => item.id === productId);
    
        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, incrementamos la cantidad
            productoEnCarrito.quantity++;
        } else {
            // Si el producto no está en el carrito, lo agregamos con cantidad 1
            carrito.push(producto);
        }
    
        // Actualizamos el carrito en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    
        console.log(localStorage.getItem('carrito'));
        console.log(`Producto agregado al carrito: ${productId} ${productName} ${productPrice} ${productImage}`);
    
        // Llamamos a la función para actualizar la visualización del mini carrito
        actualizarMiniCarrito();
    }
    function actualizarMiniCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total-carrito');
        listaCarrito.innerHTML = ''; // Limpiar contenido previo
    
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        let total = 0;
    
        carrito.forEach(producto => {
            const itemCarrito = document.createElement('li');
    
            // Verificar si el producto tiene cantidad definida
            const cantidad = producto.quantity !== undefined ? producto.quantity : 1;
    
            // Calcular subtotal del producto (precio x cantidad)
            const subtotal = producto.price * cantidad;
    
            // Crear elementos para mostrar el producto en el carrito
            const nombreProducto = document.createElement('span');
            nombreProducto.textContent = `${producto.name}`;
              nombreProducto.classList.add('nombre-producto');
    
            const cantidadProducto = document.createElement('span');
            cantidadProducto.textContent = `Cant: ${cantidad}`;
             cantidadProducto.classList.add('cantidad-producto');
    
            const subtotalProducto = document.createElement('span');
            subtotalProducto.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
            subtotalProducto.classList.add('subtotal-producto');
    
            // Botón para incrementar la cantidad
            const btnIncrementar = document.createElement('button');
            btnIncrementar.textContent = '+';
            btnIncrementar.classList.add('btn-incrementar'); 
            btnIncrementar.addEventListener('click', () => {
                cambiarCantidadProducto(producto.id, cantidad + 1);
            });
    
            // Botón para decrementar la cantidad (si la cantidad es mayor que 1)
            const btnDecrementar = document.createElement('button');
            btnDecrementar.textContent = '-';
            btnDecrementar.classList.add('btn-decrementar');
            btnDecrementar.addEventListener('click', () => {
                if (cantidad > 1) {
                    cambiarCantidadProducto(producto.id, cantidad - 1);
                }
            });
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'x';
            btnEliminar.classList.add('btn-eliminar'); // Agregar clase al botón de eliminar
            btnEliminar.addEventListener('click', () => {
                eliminarProductoDelCarrito(producto.id);
            });
    
            // Agregar elementos al itemCarrito
            itemCarrito.appendChild(nombreProducto);
            itemCarrito.appendChild(cantidadProducto);
            itemCarrito.appendChild(btnIncrementar);
            itemCarrito.appendChild(btnDecrementar);
            itemCarrito.appendChild(subtotalProducto);
            itemCarrito.appendChild(btnEliminar);
            // Sumar al total general del carrito
            total += subtotal;
    
            listaCarrito.appendChild(itemCarrito)
                });
    
        // Mostrar el total del carrito al final
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }
    
    function cambiarCantidadProducto(productId, newQuantity) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Encontrar el producto en el carrito por su ID
        const producto = carrito.find(item => item.id === productId);
    
        if (producto) {
            // Actualizar la cantidad del producto
            producto.quantity = newQuantity;
    
            // Actualizar el carrito en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
    
            // Actualizar la visualización del mini carrito
            actualizarMiniCarrito();
        }
    }
    
    function eliminarProductoDelCarrito(productId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Filtrar el carrito para eliminar el producto con el ID especificado
        carrito = carrito.filter(producto => producto.id !== productId);
    
        // Actualizar el carrito en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    
        // Actualizar la visualización del carrito
        actualizarMiniCarrito();
    }
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', () => {
            const productId = boton.getAttribute('data-product-id');
            const productName = boton.getAttribute('data-product-name');
            const productPrice = boton.getAttribute('data-product-price');
            const productImage = boton.getAttribute('data-product-image');
            agregarProductoAlCarrito(productId, productName, productPrice,productImage);
        });
    });

    carritoIcono.addEventListener("mouseover", (e) => {
        console.log("se paso la mano")
        minicarrito.classList.add('mostrar'); // Agregar la clase para mostrar con transición suave
    });
    
    // Agregar evento para ocultar el mini carrito al mover el cursor fuera del icono del carrito
    minicarrito.addEventListener("mouseleave", (e) => {
        minicarrito.classList.remove('mostrar'); // Eliminar la clase para ocultar con transición suave
    });
})