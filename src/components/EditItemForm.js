import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditItemForm(props) {
    const { item } = props;

    function handleEditItemFormSubmission(event) {
        event.preventDefault();
        props.onItemEdit({
            name: event.target.name.value,
            quantity: event.target.quantity.value,
            price: event.target.price.value,
            description: event.target.description.value,
            id: item.id
        });
    }

    return (
        <React.Fragment>
            <ReusableForm
                formSubmissionHandler={handleEditItemFormSubmission}
                buttonText="Update Form" />
        </React.Fragment>
    );
}

EditItemForm.propTypes = {
    item: PropTypes.object,
    onEditItem: PropTypes.func
};
export default EditItemForm;