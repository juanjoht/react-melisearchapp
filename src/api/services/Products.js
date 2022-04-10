import { Endpoints } from "../../helpers/Endpoints";

export const Products = () =>  {
    const { getUrlProductsByName,getUrlProductById,getUrlProductDescription } = Endpoints();

    const getProductsByName = async (name = '') =>{ 
        name = name.toLocaleLowerCase();
        let products = [];
        await fetch( getUrlProductsByName(name) )
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
    const getProductById = async (id = '') =>{
        let productDetail = {};
        await fetch( getUrlProductById(id) )
             .then(response => {
               return response.json();
             })
             .then((data) => {
                 if(!data.error)
                 {
                    Object.assign(productDetail, {
                        id : data.id,
                        title: data.title,
                        price: data.price,
                        condition: data.condition === 'new'? 'Nuevo': data.condition,
                        picture: data.pictures.length !== 0 ? data.pictures[0].url : data.thumbnail,
                        amountSold : data.sold_quantity,
                        categoryId : data.category_id, 
                        brand: getAttribute(data.attributes,'brand'),
                        line: getAttribute(data.attributes,'model'),
                      });
                 } 
                return productDetail;
              })
              .catch(err => err.message );;
        return productDetail;
    }
    const getAttribute= (attributes = [], attrId = 0) =>{
        const brand = attributes.find(x=>x.id.toLowerCase() === attrId );
        return (brand) ? {id :brand.id, value:brand.value_name }: {};
    }
    const getProductDescription = async (id = '') => {
        let productDescription = {};
        await fetch( getUrlProductDescription(id) )
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
    
    return {getProductsByName,getProductById,getProductDescription}
   
}

