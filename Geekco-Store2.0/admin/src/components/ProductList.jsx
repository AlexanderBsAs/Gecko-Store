
const ProductList = ({ products }) => {
   
    console.log("Lista de productos",products)
    return (
        <div>
        <div>
            
        </div>
        <div className="contenedor-tabla">
            <table className="table-dash">
                <thead>
                    <tr>
                    <th>Id</th>

                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="lista-tabla">
                        <td>{product.id}</td>
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
        </div>
    );
};

export default ProductList;