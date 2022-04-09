export const getCategoriesById = async (id = '', brand= {}, line={}) => {
    const url = `https://api.mercadolibre.com/categories/${ encodeURI(id) }`;
    let newCategories = [];
    await fetch( url )
         .then(response => {
           return response.json();
         })
         .then((data) => {
             if(!data.error)
             {
                const categoriesFromApi = data.path_from_root.map(category => category);
                const uniqueSet = new Set(categoriesFromApi);
                newCategories = [...uniqueSet,{ id: brand.id, name: brand.value}, { id: line.id, name: line.value}];
             } 
            return newCategories;
          })
          .catch(err => err.message );;
    return newCategories;
}


