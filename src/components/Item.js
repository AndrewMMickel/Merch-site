import React from "react";
import PropTypes from "prop-types";

function Item(props) {


    return (
        <React.Fragment>
            <div key={props.item.id} className="item-comp">
                <img src={props.item.imageurl ? props.item.imageurl : "https://m.media-amazon.com/images/I/41Qp8smv-0L._SY300_SX300_QL70_FMwebp_.jpg"} alt="" />
                <h3>product Name: {props.item.name}</h3>
                <p>Short description: {props.item.description}</p>
                <p>Amount: {parseInt(props.item.quantity)}</p>
                <p>Price in yen: {props.item.price}</p>
                <hr />
                <button onClick={() => props.whenItemClicked(props.item.id)}>Item details</button>
                <button onClick={() => props.onAddToCart(props.item.id)}>Add to cart</button>
            </div>
        </React.Fragment>
    );
}

Item.propTypes = {
    item: PropTypes.object,
    whenItemClicked: PropTypes.func,
    onAddToCart: PropTypes.func
};

export default Item;