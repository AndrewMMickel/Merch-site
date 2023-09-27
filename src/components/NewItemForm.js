import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewItemForm(props) {

    function handleNewItemFormSubmission(event) {
        event.preventDefault();
        props.onNewItemCreation({
            imageurl: event.target.imageurl.value,
            name: event.target.name.value,
            quantity: parseInt(event.target.quantity.value),
            price: event.target.price.value,
            description: event.target.description.value,
            id: v4()

        });
    }

    return (
        <React.Fragment>
            <ReusableForm
                formSubmissionHandler={handleNewItemFormSubmission}
                buttonText="add item to store!" />
        </React.Fragment>
    );
}

NewItemForm.propTypes = {
    onNewItemCreation: PropTypes.func
};

export default NewItemForm;