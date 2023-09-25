import React from "react";
import Item from "./Item";
import PropTypes from "prop-types";

function ItemList(props) {
    return (
        <React.Fragment>
            {props.itemList.map((item, index) =>
                <Item
                    whenItemClicked={props.onItemSelection}
                    item={item}
                    position={index}
                    method={props.onDecrementItemQuantity}
                    key={item.id}
                    onAddToCart={props.onAddToCart}
                />

            )}
        </React.Fragment>
    );
}

ItemList.propTypes = {
    itemList: PropTypes.array,
    onItemSelection: PropTypes.func,
    onAddToCart: PropTypes.func
};

export default ItemList;