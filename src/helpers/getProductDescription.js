export const getProductDescription = async (id = '') => {
    const url = `https://api.mercadolibre.com/items/${ encodeURI(id) }/description`;
    let productDescription = {};
    await fetch( url )
         .then(response => {
           return response.json();
         })
         .then((data) => {
             if(!data.error)
             {
                Object.assign(productDescription, {
                    text : data.plain_text
                  });
             } 
            return productDescription;
          })
          .catch(err => err.message );;
    return productDescription;
}
