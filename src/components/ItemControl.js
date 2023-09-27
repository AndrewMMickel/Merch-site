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
            showCart: false
        };
        this.handleClick = this.handleClick.bind(this);
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
        console.log(newMainItemList)
    }

    handleShowingCart = () => {
        this.setState({ showCart: true });
    }

    handleAddingItemToCart = (id) => {
        const selectedItem = this.state.mainItemList.filter(item => item.id === id)[0];
        const filteredCartList = this.state.cartList.filter(item => item.id === id);
        if (filteredCartList.length === 0) {
            const updatedCartItem = {
                ...selectedItem,
                quantity: 1
            }
            const newCartList = this.state.cartList.concat(updatedCartItem);
            this.setState({ cartList: newCartList });
        } else {
            const updatedCartItem = {
                ...filteredCartList[0],
                quantity: filteredCartList[0].quantity = filteredCartList[0].quantity + 1
            }
            const newCartList = this.state.cartList.filter(item => item.id !== id);
            const updatedCartList = [
                ...newCartList,
                updatedCartItem
            ]
            this.setState({ cartList: updatedCartList });
        }
    }
    //update view of cart components. hover, onclick, ect.
    //update item list to change quantity of items from mainlist to the cart
    //"can't add to cart if item is zero" function
    //add images for items. on homepage have items on top of info, and in cart to the left


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
        this.setState({
            cartList: newCartList
        })
    }

    render() {

        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.editing) {
            currentlyVisibleState = <EditItemForm item={this.state.selectedItem} onEditItem={this.handleEditingItemInList} />
            buttonText = "Return to item List";
        } else if (this.state.selectedItem != null) {
            currentlyVisibleState = <ItemDetail
                item={this.state.selectedItem}
                onClickingDelete={this.handleDeletingItem}
                onClickingEdit={this.handleEditClick} />;
            buttonText = "Return to item List";
        } else if (this.state.formVisibleOnPage) {
            currentlyVisibleState = <NewItemForm onNewItemCreation={this.handleAddingNewItemToList} />;
            buttonText = "Return to item List";
        } else if (this.state.showCart) {
            currentlyVisibleState = <Cart cartList={this.state.cartList} onDeleteItemFromCart={this.handleDeleteItemFromCart} />
            buttonText = "Return to item List";
        } else {
            currentlyVisibleState = <ItemList itemList={this.state.mainItemList} onItemSelection={this.handleChangingSelectedItem} onAddToCart={this.handleAddingItemToCart} />
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