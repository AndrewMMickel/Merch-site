import React from "react";
import Item from "./Item";
import PropTypes from "prop-types";

function ItemList(props) {
    return (
        <React.Fragment>
            {props.itemList.map((item, index) =>
                <Item
                    content={item}
                    position={index}
                    method={props.onDecrementItemQuantity}
                    key={item.id}
                />

            )}
        </React.Fragment>
    );
}

ItemList.propTypes = {
    itemList: PropTypes.array
};

export default ItemList;