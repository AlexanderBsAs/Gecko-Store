const LatestProduct = ({ latestProduct }) => {

  const { id, name, description, price, installments, discount, image } = latestProduct;
    return (
      <div className="LatestProduct">
        <h1>Producto Destacado:{name}</h1>
      
        <img src={`http://localhost:3000/images/products/${image}`}/>
        <div className="LatestProduct__description">
        <p>
            {description}
        </p>
        </div>
      </div>
    );
  };
  
  export default LatestProduct;