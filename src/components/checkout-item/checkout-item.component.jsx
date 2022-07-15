import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
    const { addQuantity, decreaseQuantity, removeItem } =
        useContext(CartContext);

    const handleAddQuantity = () => addQuantity(item.id, item.quantity);

    const handleDecreaseQuantity = () =>
        decreaseQuantity(item.id, item.quantity);

    const handleRemoveItem = () => removeItem(item.id);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={item.imageUrl} alt={item.name} />
            </div>
            <span className="name">{item.name}</span>
            <span className="quantity">
                <div onClick={() => handleDecreaseQuantity()} className="arrow">
                    &#10094;
                </div>
                <span className="value">{item.quantity}</span>
                <div className="arrow" onClick={() => handleAddQuantity()}>
                    &#10095;
                </div>
            </span>
            <span className="price">{item.price}</span>
            <div className="remove-button" onClick={() => handleRemoveItem()}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
