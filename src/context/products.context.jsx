import { createContext, useState } from "react";
import shopData from "../shop-data.json";

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(shopData);

    // useEffect(() => {
    //     setProducts(shopData);
    // }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
