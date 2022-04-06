export const getProductsByName = async (name = '') =>{
    name = name.toLocaleLowerCase();
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${ encodeURI(name) }`;
    let products = [];
    await fetch( url )
         .then(response => {
           return response.json();
         })
         .then(({results}) => {
             products = results.slice(0,4).map( prod =>{
             return {
                  id : prod.id,
                  title: prod.title,
                  price: prod.price,
                  condition: prod.condition,
                  city : prod.address ? prod.address.city_name : '',
                  thumbnail: prod.thumbnail,
                 }
            });
          });
          console.log(products);
    return products;
}