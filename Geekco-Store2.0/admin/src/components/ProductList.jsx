import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div className="contenedor-tabla">
            <table className="table-dash">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="lista-tabla">
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.discount ? `${product.discount}%` : '-'}</td>
                            <td>
                                {/* Aquí puedes incluir los botones de acciones */}
                                <button>Ver más</button>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;