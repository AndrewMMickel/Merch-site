import React from "react";
import PropTypes from "prop-types";

function Item(props) {
    let inventory;
    if (props.item.quantity < 1) {
        inventory = "out of stock";
    } else {
        inventory = <button onClick={() => props.method(props.position)}>Reduce Quantity</button>;
    }
    return (
        <React.Fragment>
            <div onClick={() => props.whenItemClicked(props.item.id)} key={props.item.id}>
                <h3>product Name: {props.item.name}</h3>
                <p>Short description: {props.item.description}</p>
                <p>Amount: {parseInt(props.item.quantity)}</p>
                <p>Price in yen: {props.item.price}</p>
                <p>{props.item.id}</p>
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
    price: PropTypes.number,
    id: PropTypes.string,
    whenItemClicked: PropTypes.func
};

export default Item;