import { useEffect, useState } from "react";
import { getProductsByName } from "../helpers/getProductsByName";

export const useFetchProducts = (name) => {
    const [stateProducts, setStateProducts] = useState({
        data: [],
        isLoading: true
    })
    useEffect( () =>{ 
        getProductsByName(name)
            .then(products =>{
                setStateProducts(
                    { 
                        data: products,
                        isLoading:false
                    }
                )
            }) 
    },[name]);
    return stateProducts;
}
