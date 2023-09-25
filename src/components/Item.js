import React from "react";
import PropTypes from "prop-types";

function Item(props) {


    return (
        <React.Fragment>
            <div key={props.item.id} className="item-comp">
                <button onClick={() => props.whenItemClicked(props.item.id)}>Item details</button>
                <h3>product Name: {props.item.name}</h3>
                <p>Short description: {props.item.description}</p>
                <p>Amount: {parseInt(props.item.quantity)}</p>
                <p>Price in yen: {props.item.price}</p>
                <p>{props.item.id}</p>
                <hr />
                <button onClick={() => props.onAddToCart(props.item.id)}>Add to cart</button>
            </div>
        </React.Fragment>
    );
}

Item.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    id: PropTypes.string,
    whenItemClicked: PropTypes.func,
    onAddToCart: PropTypes.func
};

export default Item;