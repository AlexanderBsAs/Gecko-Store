import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const ProductDetail = ({ productDetail }) => {
  const handleDelete = async () => {
    // Mostrar un SweetAlert de confirmación
    const confirmResult = await Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmResult.isConfirmed) {
      // Si el usuario confirma, enviar la solicitud de eliminación
      try {
        const response = await fetch(
          `http://localhost:3000/productos/delete/${productDetail.id}?_method=DELETE`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el producto.");
        }

        // Mostrar un SweetAlert de éxito
        Swal.fire({
          icon: "success",
          title: "Producto eliminado con éxito",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Recargar la página después de la eliminación exitosa
          window.location.reload();
        });
      } catch (error) {
        // Mostrar un SweetAlert de error
        Swal.fire({
          icon: "error",
          title: "Error al eliminar el producto",
          text: error.message,
        });
      }
    }
  };

  return (
    <div className="card-detail">
      {productDetail && (
        <div className="card-contenedor">
          <h1>{productDetail.name}</h1>
          <div className="imagen-detalles">
            <div className="contenedor-imagen">
              <img src={productDetail.imageUrl} alt={productDetail.name} />
            </div>
            <div className="contenedor-detalle">
              <div className="lista-detalle">
                <div>Precio:</div>
                <div>${productDetail.price}</div>
              </div>
              <div className="lista-detalle">
                <div>Descuento:</div>
                <div>
                  {productDetail.discount ? productDetail.discount : ""}%
                </div>
              </div>
              <div className="lista-detalle">
                <div>Categoría:</div>
                <div>
                  {" "}
                  {productDetail.categories.name
                    ? productDetail.categories.name
                    : ""}
                </div>
              </div>
              <div className="lista-detalle">
                <div>Plataforma:</div>
                <div>
                  {" "}
                  {productDetail.platforms ? productDetail.platforms.name : ""}
                </div>
              </div>
              <div className="lista-detalle">
                <div>Marca:</div>
                <div>
                  {" "}
                  {productDetail.brands.name ? productDetail.brands.name : ""}
                </div>
              </div>
            </div>
          </div>
          <p>{productDetail.description}</p>
          <div className="action-buttons">
            <div><a href={`http://localhost:3000/productos/formUpdate/${productDetail.id}}`}>Editar</a></div>
            <div onClick={handleDelete}>Eliminar</div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductDetail.propTypes = {
  productDetail: PropTypes.object.isRequired,
};

export default ProductDetail;
