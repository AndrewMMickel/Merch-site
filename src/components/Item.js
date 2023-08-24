import React from "react";
import PropTypes from "prop-types";

function Item(props) {
    let inventory;
    if (props.content.quantity < 1) {
        inventory = "out of stock";
    } else {
        inventory = <button onClick={() => props.method(props.position)}>Reduce Quantity</button>;
    }
    return (
        <React.Fragment>
            <div key={props.content.id}>
                <h3>product Name: {props.content.name}</h3>
                <p>Short description: {props.content.description}</p>
                <p>Amount: {parseInt(props.content.quantity)}</p>
                <p>Price in yen: {props.content.price}</p>
                <hr />
                {/*button for decrement here (add to cart button)*/}
                {inventory}
            </div>
        </React.Fragment>
    );
}

Item.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number
};

export default Item;