import React from "react";
import PropTypes from "prop-types";

function Item(props) {
    let geoff;
    if (props.content.quantity < 1) {
        geoff = "out of stock";
    } else {
        geoff = <button onClick={() => props.method(props.position)}>Reduce Quantity</button>;
    }
    return (
        <React.Fragment>
            <div key={props.content.id}>
                <h3>{props.content.name}</h3>
                <p>{props.content.description}</p>
                <p>{parseInt(props.content.quantity)}</p>
                <p>{props.content.price}</p>
                <hr />
                {/*button for decrement here (add to cart button)*/}
                {geoff}
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