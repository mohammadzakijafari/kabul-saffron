import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { backendUrl } from "../App";
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const currency = "$";
    const deliveryFee = 10;

    const [products, setProducts] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    console.log(backendUrl);

    const getAllProducts = async () => {
        try {
            let res = await axios.get(`${backendUrl}/products`); 
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // getAllProducts();
    useEffect(() => {
        getAllProducts();
    }, []);

    // const value = {
    //     products, orderCount
    // }

    return (
        <ProductContext.Provider value = {{ products, setProducts, orderCount, setOrderCount, currency }}>
            { props.children }
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;