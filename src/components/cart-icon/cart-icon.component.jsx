import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./cart-icon.styles.jsx";
import {
    CartIconContainer,
    ItemCount,
    ShoppingIcon
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
