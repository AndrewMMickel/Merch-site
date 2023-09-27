import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
    const { item } = props;
    return (
        <React.Fragment>
            <form onSubmit={props.formSubmissionHandler}>
                <label for='imageurl'>Image url</label><br />
                <input
                    type='text'
                    name='imageurl'
                    placeholder='URL to image'
                    defaultValue={item ? item.imageurl : ""} /><br />
                <label for='name'>Product Name</label><br />
                <input
                    type='text'
                    name='name'
                    placeholder='Product Name'
                    defaultValue={item ? item.name : ""} /><br />
                <label for='quantity'>Quantity</label><br />
                <input
                    type='number'
                    name='quantity'
                    placeholder='Amount'
                    defaultValue={item ? item.quantity : ""} /><br />
                <label for='price'>Price in Yen</label><br />
                <input
                    type='number'
                    name='price'
                    placeholder='Price'
                    defaultValue={item ? item.price : ""} /><br />
                <label for='description'>Description</label><br />
                <textarea
                    name='description'
                    placeholder='Description'
                    defaultValue={item ? item.description : ""} /><br />
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