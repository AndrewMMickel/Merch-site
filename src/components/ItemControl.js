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
                    name: 'test',
                    quantity: 1,
                    price: 1,
                    description: 'test',
                    id: 1

                },
                {
                    name: 'test2',
                    quantity: 2,
                    price: 2,
                    description: 'test2',
                    id: 2
                }
            ],
            cartList: [
                {
                    name: 'Cart test',
                    quantity: 1,
                    price: 1,
                    description: 'test',
                    id: 1

                },
                {
                    name: 'Cart test2',
                    quantity: 2,
                    price: 2,
                    description: 'test2',
                    id: 2
                }
            ],
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
    }

    handleShowingCart = () => {
        this.setState({ showCart: true });
    }
    //make a version that is for adding items to cart. This.setstate should add items to cart
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

    //Work on making a state for cart showing and going away
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
            currentlyVisibleState = <NewItemForm onNewItemCreation={this.handleAddingNewItemToList} onClickingDelete={this.handleDeletingTicket} />;
            buttonText = "Return to item List";
        } else if (this.state.showCart) {
            currentlyVisibleState = <Cart currentCartList={this.state.cartList} />
            buttonText = "Return to item List";
        } else {
            currentlyVisibleState = <ItemList itemList={this.state.mainItemList} onItemSelection={this.handleChangingSelectedItem} />
            buttonText = "Create item";
        }
        //cart react fragment
        return (
            <React.Fragment>
                <button onClick={this.handleShowingCart}>Cart</button>
                {currentlyVisibleState}
                <button onClick={this.handleClick} className="button">{buttonText}</button>
            </React.Fragment>
        )
    }
}
export default ItemControl;