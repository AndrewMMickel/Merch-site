import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
function Cart(props) {

    return (
        <React.Fragment>
            {props.currentCartList.map((item, index) =>
                <Item
                    item={item}
                    position={index}
                    method={props.onDecrementItemQuantity}
                    key={item.id}
                />

            )}
        </React.Fragment>
    );
}

Cart.propTypes = {
    currentCartList: PropTypes.array
};
export default Cart;