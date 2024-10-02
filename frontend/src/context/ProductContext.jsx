import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const currency = "$";
    const deliveryFee = 10;
    const backendUrl = "http://localhost:3000/products";

    const [products, setProducts] = useState([]);
    const [orderCount, setOrderCount] = useState(0);

    const getAllProducts = async () => {
        try {
            let res = await axios.get(backendUrl); 
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
        <ProductContext.Provider value = {{ products, setProducts, orderCount, setOrderCount }}>
            { props.children }
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;