import PropTypes from "prop-types";

function CartItem(props) {

    return (
        <div className="item-comp cart-style">
            <h3>Product Name: {props.item.name}</h3>
            <p>Short description: {props.item.description}</p>
            <p>Amount: {parseInt(props.item.quantity)} </p>
            <p>Price in yen: {props.item.price}</p>
            <button onClick={() => props.deleteItemFromCart(props.item.id)}>Remove from cart</button>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
    deleteItemFromCart: PropTypes.func
}
export default CartItem;