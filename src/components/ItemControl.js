import React from "react";
import NewItemForm from "./NewItemForm";
import ItemList from "./ItemList";
import EditItemForm from './EditItemForm';
import ItemDetail from './ItemDetail';
import Cart from "./Cart";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class ItemControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            selectedItem: null,
            editing: false,
            showCart: false,
            cartTotal: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cartList !== prevState.cartList) {
            this.handleCalculateCartTotal();
        }
    }

    handleClick = () => {
        if (this.state.selectedItem != null) {
            this.setState({
                selectedItem: null,
                editing: false
            });
        } else if (this.state.showCart) {
            this.setState({ showCart: false });
        } else {
            const { dispatch } = this.props;
            const action = {
                type: 'TOGGLE_FORM'
            }
            dispatch(action);
        }
    }

    handleEditClick = () => {
        this.setState({ editing: true });
    }

    handleAddingNewItemToList = (newItem) => {
        const { dispatch } = this.props;
        const { id, imageurl, name, quantity, price, description } = newItem;
        const action = {
            type: 'ADD_ITEM',
            imageurl: imageurl,
            name: name,
            quantity: quantity,
            price: price,
            description: description,
            id: id
        }
        dispatch(action);
        const action2 = {
            type: 'TOGGLE_FORM'
        }
        dispatch(action2);
    }

    handleShowingCart = () => {
        this.setState({ showCart: true });
        this.handleCalculateCartTotal();
    }

    handleAddingItemToCart = (id) => {
        //grab selected item from mainItemList
        const selectedItem = this.state.mainItemList.filter(item => item.id === id)[0];

        //check if selectedItem has inventory that can be added to cartList
        if (selectedItem.quantity === 0) {
            return;
        }

        //Check if selectedCartList has item; if not add item, if so change quantity
        const filteredCartList = this.state.cartList.filter(item => item.id === id);
        if (filteredCartList.length === 0) {
            //set up newCartItem in CartList
            const updatedCartItem = {
                ...selectedItem,
                quantity: 1
            }
            const newCartList = this.state.cartList.concat(updatedCartItem);
            //set up MainItemList with updatedItem for cart
            const newItem = {
                ...selectedItem,
                quantity: selectedItem.quantity - 1
            }
            const newMainItemList = this.state.mainItemList.filter(item => item.id !== selectedItem.id).concat(newItem);
            this.setState({
                mainItemList: newMainItemList,
                cartList: newCartList
            })
        } else {
            this.handleChangingCartItemQuantity("add", id);
        }
    }

    handleChangingCartItemQuantity = (typeOfOperation, id) => {
        const currentCartListItem = this.state.cartList.filter(item => item.id === id)[0];
        const currentMainItem = this.state.mainItemList.filter(item => item.id === id)[0];
        if (currentMainItem.quantity === 0 && typeOfOperation === "add") {
            return;
        } else if (currentCartListItem.quantity === 1 && typeOfOperation === "subtract") {
            this.handleDeleteItemFromCart(id);
            return;
        }
        //Set up typeOfOperation
        let updatedCartItemQuantity;
        let updatedMainItemQuantity;
        switch (typeOfOperation) {
            case "add":
                updatedCartItemQuantity = currentCartListItem.quantity + 1;
                updatedMainItemQuantity = currentMainItem.quantity - 1;
                break;
            case "subtract":
                updatedCartItemQuantity = currentCartListItem.quantity - 1;
                updatedMainItemQuantity = currentMainItem.quantity + 1;
                break;
            default:
                throw new Error("handleChangingCartItemQuantity error")
        }

        //set up UpdatedCartItem in CartList
        const updatedCartItem = {
            ...currentMainItem,
            quantity: updatedCartItemQuantity
        }
        const newCartList = this.state.cartList.filter(item => item.id !== id).concat(updatedCartItem);
        //set up UpdatedMainItemList with updated item quantity
        const updatedMainItem = {
            ...currentMainItem,
            quantity: updatedMainItemQuantity
        }
        const newMainItemList = this.state.mainItemList.filter(item => item.id !== currentMainItem.id).concat(updatedMainItem);
        this.setState({
            mainItemList: newMainItemList,
            cartList: newCartList
        });
        this.handleCalculateCartTotal(newCartList);
    }

    handleCalculateCartTotal = (manualCartList) => {
        let totalCartListPrice = 0;
        if (manualCartList) {
            manualCartList.forEach((cartItem) => {
                totalCartListPrice += cartItem.quantity * cartItem.price
            })
        } else {
            this.state.cartList.forEach((cartItem) => {
                totalCartListPrice += cartItem.quantity * cartItem.price
            })
        }
        this.setState({
            cartTotal: totalCartListPrice
        })
    }

    handleChangingSelectedItem = (id) => {
        const selectedItem = this.props.mainItemList[id];
        this.setState({ selectedItem: selectedItem });
    }

    handleEditingItemInList = (itemToEdit) => {
        const { dispatch } = this.props;
        const { id, imageurl, name, quantity, price, description } = itemToEdit;
        const action = {
            type: 'ADD_ITEM',
            imageurl: imageurl,
            name: name,
            quantity: quantity,
            price: price,
            description: description,
            id: id
        }
        dispatch(action);
        this.setState({
            editing: false,
            selectedItem: null
        });
    }

    handleDeletingItem = (id) => {
        const { dispatch } = this.props;
        const action = {
            type: 'DELETE_ITEM',
            id: id
        }
        dispatch(action);
        this.setState({ selectedItem: null });
    }

    handleDeleteItemFromCart = (id) => {
        const newCartList = this.state.cartList.filter(item => item.id !== id);
        const selectedCartItem = this.state.cartList.filter(item => item.id === id)[0];
        const selectedMainItem = this.state.mainItemList.filter(item => item.id === id)[0];
        const updatedMainItem = {
            ...selectedMainItem,
            quantity: selectedMainItem.quantity + selectedCartItem.quantity
        }
        const newMainItemList = this.state.mainItemList.filter(item => item.id !== selectedMainItem.id).concat(updatedMainItem);
        this.setState({
            cartList: newCartList,
            mainItemList: newMainItemList
        })
    }

    handleClearingCart = () => {
        const updatedMainItemList = this.state.mainItemList.map((mainItem) => {
            let result = mainItem;
            this.state.cartList.forEach((cartItem) => {
                if (mainItem.id === cartItem.id) {
                    const newItem = {
                        ...mainItem,
                        quantity: mainItem.quantity + cartItem.quantity
                    }
                    result = newItem;
                }
            })
            return result;
        })
        this.setState({
            mainItemList: updatedMainItemList,
            cartList: []
        });
    }

    handlePurchaseCartClick = () => {
        alert("Congrats on your purchase! Your items will be at the shrine, please come at anytime during the day to collect them.");
        this.setState({
            cartList: []
        });
    }

    render() {

        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.editing) {
            currentlyVisibleState =
                <EditItemForm
                    item={this.state.selectedItem}
                    onEditItem={this.handleEditingItemInList}
                />
            buttonText = "Return to homepage";
        } else if (this.state.selectedItem != null) {
            currentlyVisibleState =
                <ItemDetail
                    item={this.state.selectedItem}
                    onClickingDelete={this.handleDeletingItem}
                    onClickingEdit={this.handleEditClick}
                />;
            buttonText = "Return to homepage";
        } else if (this.props.formVisibleOnPage) {
            currentlyVisibleState =
                <NewItemForm
                    onNewItemCreation={this.handleAddingNewItemToList}
                />;
            buttonText = "Return to homepage";
        } else if (this.state.showCart) {
            currentlyVisibleState =
                <Cart
                    cartList={this.state.cartList}
                    onDeleteItemFromCart={this.handleDeleteItemFromCart}
                    onClickClearCart={this.handleClearingCart}
                    onClickCartQuantity={this.handleChangingCartItemQuantity}
                    purchaseCartClick={this.handlePurchaseCartClick}
                    cartTotal={this.state.cartTotal}
                />
            buttonText = "Return to homepage";
        } else {
            currentlyVisibleState =
                <ItemList
                    itemList={this.props.mainItemList}
                    onItemSelection={this.handleChangingSelectedItem}
                    onAddToCart={this.handleAddingItemToCart}
                />
            buttonText = "Create item";
        }
        return (
            <React.Fragment>
                <button onClick={this.handleShowingCart}>Cart</button>
                <button onClick={this.handleClick} className="button">{buttonText}</button>
                {currentlyVisibleState}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        mainItemList: state.mainItemList,
        formVisibleOnPage: state.formVisibleOnPage
    }
}

ItemControl.propTypes = {
    mainItemList: PropTypes.object,
    formVisibleOnPage: PropTypes.bool
};

ItemControl = connect(mapStateToProps)(ItemControl);

export default ItemControl;