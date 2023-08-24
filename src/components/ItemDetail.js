import React from "react";
import PropTypes from "prop-types";

function ItemDetail(props) {
    const { item, onClickingDelete } = props;

    return (
        <React.Fragment>
            <h1>Item Detail</h1>
            <h3>{item.name} - {item.quantity}</h3>
            <p><em>{item.price}</em></p>
            <p><em>{item.description}</em></p>
            <button onClick={() => onClickingDelete(item.id)}>Remove item</button>
            <hr />
        </React.Fragment>
    );
}

ItemDetail.propTypes = {
    item: PropTypes.object,
    onClickingDelete: PropTypes.func
};

export default ItemDetail;