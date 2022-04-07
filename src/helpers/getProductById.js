export const getProductById = async (id = '') =>{
    const url = `https://api.mercadolibre.com/items/${ encodeURI(id) }`;
    let productDetail = {};
    await fetch( url )
         .then(response => {
           return response.json();
         })
         .then((data) => {
             if(!data.error)
             {
                Object.assign(productDetail, {
                    id : data.id,
                    title: data.title,
                    description: data.descriptions.length !== 0 ? data.descriptions[0] : data.title,
                    price: data.price,
                    condition: data.condition,
                    picture: data.pictures.length !== 0 ? data.pictures[0].url : data.thumbnail,
                    amountSold : data.sold_quantity
                  });
             } 
            return productDetail;
          })
          .catch(err => err.message );;
    return productDetail;
}