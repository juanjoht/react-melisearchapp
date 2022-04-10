import {useEffect, useState } from "react";
import { Products }  from "../api/services/Products";

export const useFetchProducts = (name) => {
    const [stateProducts, setStateProducts] = useState({
        data: []
    })
    useEffect( () =>{ 
        const { getProductsByName } = Products();
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
