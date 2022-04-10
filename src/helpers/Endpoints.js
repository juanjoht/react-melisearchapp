export const Endpoints = () => {
    const urlAPI = 'https://api.mercadolibre.com';
    const getUrlCategoriesById = (id = '') => {
        return `${urlAPI}/categories/${ encodeURI(id) }`;
    }
    const getUrlProductsByName = (name = '') => {
        return `${urlAPI}/sites/MLA/search?q=${ encodeURI(name) }`;
    }

    const getUrlProductById = (id = '') =>{
        return `${urlAPI}/items/${ encodeURI(id) }`;
    }

    const getUrlProductDescription = (id = '') => {
        return `${urlAPI}/items/${ encodeURI(id) }/description`;
    }

    return {getUrlCategoriesById, getUrlProductsByName,getUrlProductById,getUrlProductDescription}
}
