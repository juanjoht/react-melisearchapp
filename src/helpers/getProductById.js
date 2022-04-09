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
                    //description: data.descriptions.length !== 0 ? data.descriptions[0] : data.title,
                    price: data.price,
                    condition: data.condition,
                    picture: data.pictures.length !== 0 ? data.pictures[0].url : data.thumbnail,
                    amountSold : data.sold_quantity,
                    categoryId : data.category_id, 
                    brand: getAttribute(data.attributes,'brand'),
                    line: getAttribute(data.attributes,'line'),
                  });
             } 
            return productDetail;
          })
          .catch(err => err.message );;
    return productDetail;
}

const getAttribute= (attributes = [], attrId = 0) =>{
    const brand = attributes.find(x=>x.id.toLowerCase() === attrId );
    return (brand) ? {id :brand.value_id, value:brand.value_name }: {};
}