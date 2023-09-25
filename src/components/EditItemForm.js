import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditItemForm(props) {
    const { item } = props;

    function handleEditItemFormSubmission(event) {
        event.preventDefault();
        props.onEditItem({
            name: event.target.name.value,
            quantity: event.target.quantity.value,
            price: event.target.price.value,
            description: event.target.description.value,
            id: item.id
        });
    }
    //image use url. Add to create and edit. string input
    return (
        <React.Fragment>
            <h3>Item name: {item.name} - Quantity: {item.quantity}</h3>
            <p>Price: <em>{item.price}</em></p>
            <p>Description: <em>{item.description}</em></p>
            <ReusableForm
                formSubmissionHandler={handleEditItemFormSubmission}
                buttonText="Update Form"
                item={item} />
        </React.Fragment>
    );
}

EditItemForm.propTypes = {
    item: PropTypes.object,
    onEditItem: PropTypes.func
};
export default EditItemForm;