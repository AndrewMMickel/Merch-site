import React from "react";
import NewItemForm from "./NewItemForm";
import ItemList from "./ItemList";
import EditItemForm from './EditItemForm';
import ItemDetail from './ItemDetail';
import Cart from "./Cart";

class ItemControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            mainItemList: [
                {
                    imageurl: "",
                    name: 'Watermelons',
                    quantity: 10,
                    price: 350,
                    description: 'Big, healthy watermelons',
                    id: 1

                },
                {
                    imageurl: "",
                    name: 'Rice bag',
                    quantity: 10,
                    price: 450,
                    description: '4Kg bag of rice',
                    id: 2
                }
            ],
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
                formVisibleOnPage: false,
                selectedItem: null,
                editing: false
            });
        } else if (this.state.showCart) {
            this.setState({ showCart: false });
        } else {
            this.setState(prevState => ({
                formVisibleOnPage: !prevState.formVisibleOnPage
            }));
        }
    }

    handleEditClick = () => {
        this.setState({ editing: true });
    }

    handleAddingNewItemToList = (newItem) => {
        const newMainItemList = this.state.mainItemList.concat(newItem);
        this.setState({
            mainItemList: newMainItemList,
            formVisibleOnPage: false
        });
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
                console.log("handleChangingCartItemQuantity error")
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
        console.log(totalCartListPrice);
        this.setState({
            cartTotal: totalCartListPrice
        })
    }

    handleChangingSelectedItem = (id) => {
        const selectedItem = this.state.mainItemList.filter(item => item.id === id)[0];
        this.setState({ selectedItem: selectedItem });
    }

    handleEditingItemInList = (itemToEdit) => {
        const editedMainItemList = this.state.mainItemList
            .filter(ticket => ticket.id !== this.state.selectedItem.id)
            .concat(itemToEdit);
        this.setState({
            mainItemList: editedMainItemList,
            editing: false,
            selectedItem: null
        });
    }

    handleDeletingItem = (id) => {
        const newMainItemList = this.state.mainItemList.filter(item => item.id !== id);
        this.setState({
            mainItemList: newMainItemList,
            selectedItem: null
        });
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
        alert("Purchase cart clicked");
    }

    //add purchase of cart component
    //style cartItem so images are on the left

    render() {

        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.editing) {
            currentlyVisibleState =
                <EditItemForm
                    item={this.state.selectedItem}
                    onEditItem={this.handleEditingItemInList}
                />
            buttonText = "Return to item List";
        } else if (this.state.selectedItem != null) {
            currentlyVisibleState =
                <ItemDetail
                    item={this.state.selectedItem}
                    onClickingDelete={this.handleDeletingItem}
                    onClickingEdit={this.handleEditClick}
                />;
            buttonText = "Return to item List";
        } else if (this.state.formVisibleOnPage) {
            currentlyVisibleState =
                <NewItemForm
                    onNewItemCreation={this.handleAddingNewItemToList}
                />;
            buttonText = "Return to item List";
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
            buttonText = "Return to item List";
        } else {
            currentlyVisibleState =
                <ItemList
                    itemList={this.state.mainItemList}
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
export default ItemControl;