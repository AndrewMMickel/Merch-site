import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import CartTotalToolbar from "./CartTotalToolbar";
function Cart(props) {

    return (
        <React.Fragment>
            <button onClick={() => props.onClickClearCart()}>Clear Cart</button>
            <CartTotalToolbar cartTotal={props.cartTotal} purchaseCartClick={props.purchaseCartClick} />
            {props.cartList.map((item, index) =>
                <CartItem
                    item={item}
                    key={item.id}
                    deleteItemFromCart={props.onDeleteItemFromCart}
                    cartQuantityChange={props.onClickCartQuantity}
                />
            )}
        </React.Fragment>
    );
}

Cart.propTypes = {
    cartList: PropTypes.array,
    onDeleteItemFromCart: PropTypes.func,
    onClickClearCart: PropTypes.func,
    onClickCartQuantity: PropTypes.func,
    cartTotal: PropTypes.number,
    purchaseCartClick: PropTypes.func
};
export default Cart;