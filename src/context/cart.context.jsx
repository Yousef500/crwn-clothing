import {createContext, useState} from "react";

const addCartItem = (cartItems, prod) => {
    const existingItem = cartItems.find(item => item.id === prod.id);
    if (existingItem) {
        return cartItems.map(item => (item.id === prod.id ? {...item, quantity: item.quantity + 1} : item))
    } else {
        return [...cartItems, {...prod, quantity: 1}]
    }
    // const newCartItems = cartItems.map(item => {
    //     if (item.id === prod.id) {
    //         item.quantity += 1
    //         return item
    //     } else {
    //         return {...prod, quantity: 1};
    //     }
    // });
    //
    // return newCartItems
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    }
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (prod) => {
        setCartItems(addCartItem(cartItems, prod));
    }
    const value = {setIsCartOpen, addItemToCart, cartItems, isCartOpen};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
