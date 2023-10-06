import React from "react";
import PropTypes from "prop-types";

function CartTotalToolbar(props) {
    return (
        <React.Fragment>
            <h1>Cart Total: {props.cartTotal} Yen</h1>
            <button onClick={() => props.purchaseCartClick()}>Purchase order</button>
        </React.Fragment>
    );
}

CartTotalToolbar.propTypes = {
    cartTotal: PropTypes.number,
    purchaseCartClick: PropTypes.func
}
export default CartTotalToolbar;