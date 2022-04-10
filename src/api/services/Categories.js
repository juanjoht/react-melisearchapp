import { Endpoints } from '../../helpers/Endpoints';

export const Categories = () => {
    const getCategoriesById = async (id = '', brand= {}, line={}) => {
        const { getUrlCategoriesById } = Endpoints();
        let newCategories = [];
        await fetch( getUrlCategoriesById(id) )
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
    return {getCategoriesById};
}



