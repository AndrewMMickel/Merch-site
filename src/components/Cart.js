import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
function Cart(props) {

    return (
        <React.Fragment>
            {props.cartList.map((item, index) =>
                <CartItem
                    item={item}
                    key={item.id}
                    deleteItemFromCart={props.onDeleteItemFromCart}
                />

            )}
        </React.Fragment>
    );
}

Cart.propTypes = {
    cartList: PropTypes.array,
    onDeleteItemFromCart: PropTypes.func
};
export default Cart;