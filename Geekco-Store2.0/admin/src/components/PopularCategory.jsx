const PopularCategory = ({mostPopularCategory}) =>{
    // Verificar si mostPopularCategory es null o undefined
    if (!mostPopularCategory) {
        return (
          <div className="PopularCategory">
            <h1>Categoría más poblada no disponible</h1>
          </div>
        );
      }
    
 const { name, productCount } = mostPopularCategory;
    console.log("categoria:",mostPopularCategory)

    return(
    
<div className="PopularCategory">
    <h1>Categoria más poblada : {name} <br/>con {productCount} productos totales</h1>
</div>
    )
}

export default PopularCategory;