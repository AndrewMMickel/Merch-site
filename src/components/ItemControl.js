import React from "react";
import NewItemForm from "./NewItemForm";
import ItemList from "./ItemList";
import EditItemForm from './EditItemForm';

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
                    description: 'test'

                },
                {
                    name: 'test2',
                    quantity: 2,
                    price: 2,
                    description: 'test2'
                }
            ],
            editing: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(prevState => ({
            formVisibleOnPage: !prevState.formVisibleOnPage
        }));
    }

    handleEditClick = () => {
        console.log("handleEditClick reached!");
        this.setState({ editing: true });
    }

    handleAddingNewItemToList = (newItem) => {
        const newMainItemList = this.state.mainItemList.concat(newItem);
        this.setState({
            mainItemList: newMainItemList,
            formVisibleOnPage: false
        });
        console.log(this.state.mainItemList);
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

    render() {

        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.editing) {
            currentlyVisibleState = <EditItemForm ticket={this.state.selectedItem} onEditItem={this.handleEditingItemInList} />
            buttonText = "Return to item List";
        } else if (this.state.formVisibleOnPage) {
            currentlyVisibleState = <NewItemForm onNewItemCreation={this.handleAddingNewItemToList} /*onClickingDelete={this.handleDeletingTicket}*/ />;
            buttonText = "Return to item List";
        } else {
            currentlyVisibleState = <ItemList itemList={this.state.mainItemList} />
        }

        return (
            <React.Fragment>
                {currentlyVisibleState}
                <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
        )
    }
}
export default ItemControl;