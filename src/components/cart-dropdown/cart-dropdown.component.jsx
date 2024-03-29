import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage
} from "./cart-dropdown.styles";

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={() => navigate("/checkout")}>
                go to checkout
            </Button>
        </CartDropdownContainer>
    );
};

export default CartDropDown;
