import PropTypes from "prop-types";

function CartItem(props) {

    return (
        <div className="item-comp cart-style">
            <img src={props.item.imageurl ? props.item.imageurl : "https://m.media-amazon.com/images/I/41Qp8smv-0L._SY300_SX300_QL70_FMwebp_.jpg"} alt={props.item.name} />
            <h3>Product Name: {props.item.name}</h3>
            <p>Short description: {props.item.description}</p>
            <button onClick={() => props.cartQuantityChange("add", props.item.id)}>+</button>
            <p>Amount: {parseInt(props.item.quantity)}</p>
            <button onClick={() => props.cartQuantityChange("subtract", props.item.id)}>-</button>
            <p>Price in yen: {props.item.price}</p>
            <button onClick={() => props.deleteItemFromCart(props.item.id)}>Remove from cart</button>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
    deleteItemFromCart: PropTypes.func,
    cartQuantityChange: PropTypes.func
}
export default CartItem;