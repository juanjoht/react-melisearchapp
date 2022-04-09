import { useEffect, useState } from "react";
import { getProductsByName } from "../helpers/getProductsByName";

export const useFetchProducts = (name) => {
    const [stateProducts, setStateProducts] = useState({
        data: []
    })
    useEffect( () =>{ 
        getProductsByName(name)
            .then(products =>{
                setStateProducts(
                    { 
                        data: products
                    }
                )
            }) 
    },[name]);
    return stateProducts;
}
