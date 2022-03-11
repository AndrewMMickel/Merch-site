import React from "react";
import NewItemForm from "./NewItemForm";
import ItemList from "./ItemList";

class ItemControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            mainItemList: []
        };
    }

    handleClick = () => {
        this.setState(prevState => ({
            formVisibleOnPage: !prevState.formVisibleOnPage
        }));
    }

    handleAddingNewItemToList = (newItem) => {
        const newMainItemList = this.state.mainItemList.concat(newItem);
        this.setState({
            mainItemList: newMainItemList,
            formVisibleOnPage: false
        });
        console.log(this.state.mainItemList);
    }

    handleDecrementItemQuantity = (quantityItem) => {
        const updateItemQuantity = [...this.state.mainItemList];
        updateItemQuantity[quantityItem].quantity = updateItemQuantity[quantityItem].quantity - 1;
        this.setState({
            mainItemList: updateItemQuantity
        })
    }

    render() {
        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.formVisibleOnPage) {
            currentlyVisibleState = <NewItemForm onNewItemCreation={this.handleAddingNewItemToList} />;
            buttonText = "Return to Item List";
        } else {
            currentlyVisibleState = <ItemList onDecrementItemQuantity={this.handleDecrementItemQuantity}
                itemList={this.state.mainItemList} />;
            buttonText = "Add Item";
        }
        return (
            <React.Fragment>
                {currentlyVisibleState}
                <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
        );
    }

}

export default ItemControl;