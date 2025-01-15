import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
    const { item } = props;
    return (
        <React.Fragment>
            <form onSubmit={props.formSubmissionHandler}>
                <label htmlFor='imageurl'>Image url</label><br />
                <input
                    id='imageurl'
                    type='text'
                    name='imageurl'
                    placeholder='URL to image'
                    defaultValue={item ? item.imageurl : ""} /><br />
                <label htmlFor='name'>Product Name</label><br />
                <input
                    id='name'
                    type='text'
                    name='name'
                    placeholder='Product Name'
                    defaultValue={item ? item.name : ""} /><br />
                <label htmlFor='quantity'>Quantity</label><br />
                <input
                    id='quantity'
                    type='number'
                    name='quantity'
                    placeholder='Amount'
                    defaultValue={item ? item.quantity : ""} /><br />
                <label htmlFor='price'>Price in Yen</label><br />
                <input
                    id='price'
                    type='number'
                    name='price'
                    placeholder='Price'
                    defaultValue={item ? item.price : ""} /><br />
                <label htmlFor='description'>Description</label><br />
                <textarea
                    id='description'
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