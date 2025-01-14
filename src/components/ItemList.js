import React from "react";
import Item from "./Item";
import PropTypes from "prop-types";

function ItemList(props) {
    return (
        <React.Fragment>
            {Object.values(props.itemList).map((item, index) =>
                <Item
                    whenItemClicked={props.onItemSelection}
                    item={item}
                    position={index}
                    key={item.id}
                    onAddToCart={props.onAddToCart}
                />

            )}
        </React.Fragment>
    );
}

ItemList.propTypes = {
    itemList: PropTypes.object,
    onItemSelection: PropTypes.func,
    onAddToCart: PropTypes.func
};

export default ItemList;