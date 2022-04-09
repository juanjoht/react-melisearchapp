export const getProductsByName = async (name = '') =>{
    name = name.toLocaleLowerCase();
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${ encodeURI(name) }`;
    let products = [];
    await fetch( url )
         .then(response => {
           return response.json();
         })
         .then(({results,filters}) => {
             products = results.slice(0,4).map( prod =>{
             return {
                  id : prod.id,
                  title: prod.title,
                  price: prod.price,
                  condition: prod.condition === 'new'? 'Nuevo': prod.condition,
                  city : prod.address ? prod.address.city_name : '',
                  thumbnail: prod.thumbnail
                 }
            });
            products.categories = setCategories(filters)
          });
          console.log(products);
    return products;
}


const setCategories = (filters = []) =>{
  let newCategories = [];
  if (filters.length !== 0)
  {
    const categoriesFromApi = filters.find(x=>x.id === 'category').values[0].path_from_root.map(category => category);
    const uniqueSet = new Set(categoriesFromApi);
    newCategories = [...uniqueSet];
  }
  return newCategories;
}