import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
    const { item } = props;
    return (
        <React.Fragment>
            <form onSubmit={props.formSubmissionHandler}>
                <input
                    type='text'
                    name='name'
                    placeholder='Product Name'
                    defaultValue={item ? item.name : ""} />
                <input
                    type='number'
                    name='quantity'
                    placeholder='Amount'
                    defaultValue={item ? item.quantity : ""} />
                <input
                    type='number'
                    name='price'
                    placeholder='Price'
                    defaultValue={item ? item.price : ""} />
                <input
                    type='text'
                    name='description'
                    placeholder='Description'
                    defaultValue={item ? item.description : ""} />
                <button type='submit'>{props.buttonText}</button>
            </form>
        </React.Fragment>
    )
}

ReusableForm.propTypes = {
    formSubmissionHandler: PropTypes.func,
    buttonText: PropTypes.string
};

export default ReusableForm;