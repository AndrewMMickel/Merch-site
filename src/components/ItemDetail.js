import React from "react";
import PropTypes from "prop-types";

function ItemDetail(props) {
    const { item, onClickingDelete, onClickingEdit } = props;

    return (
        <React.Fragment>
            <h1>Item Detail</h1>
            <img src={item.imageurl ? item.imageurl : "https://m.media-amazon.com/images/I/41Qp8smv-0L._SY300_SX300_QL70_FMwebp_.jpg"} alt={item.name} />
            <h3>{item.name} - {item.quantity}</h3>
            <p><em>{item.price}</em></p>
            <p><em>{item.description}</em></p>
            <button onClick={() => onClickingDelete(item.id)}>Remove item</button>
            <button onClick={() => onClickingEdit(item.id)}>Edit item</button>
            <hr />
        </React.Fragment>
    );
}

ItemDetail.propTypes = {
    item: PropTypes.object,
    onClickingDelete: PropTypes.func,
    onClickingEdit: PropTypes.func
};

export default ItemDetail;