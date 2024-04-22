const LatestProduct = ({ latestProduct }) => {

  const { id, name, description, price, installments, discount, image } = latestProduct;
    return (
      <div className="LatestProduct">
        <h1>Ultimo producto agregado</h1>
        <h2>{name}</h2>
      
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