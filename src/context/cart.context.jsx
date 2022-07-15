import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, prod) => {
    const existingItem = cartItems.find((item) => item.id === prod.id);
    if (existingItem) {
        return cartItems.map((item) =>
            item.id === prod.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        return [...cartItems, { ...prod, quantity: 1 }];
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    addQuantity: () => {},
    decreaseQuantity: () => {},
    removeItem: () => {},
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

        setCartCount(newCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, item) => item.quantity * item.price + total,
            0
        );

        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (prod) => {
        setCartItems(addCartItem(cartItems, prod));
    };

    const addQuantity = (id, q) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: q + 1 } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const decreaseQuantity = (id, q) => {
        if (q === 1) {
            removeItem(id);
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    };

    const value = {
        setIsCartOpen,
        addItemToCart,
        cartItems,
        isCartOpen,
        cartCount,
        addQuantity,
        decreaseQuantity,
        removeItem,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
