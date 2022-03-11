import React from "react";
import Header from "./Header";
import ItemControl from "./ItemControl";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: []
        };
    }

    handleCartAddition = (newItem) => {
        const placeholder = this.state.shoppingCart.concat(newItem);
        this.setState({
            shoppingCart: placeholder
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <ItemControl onCartAddition={this.handleCartAddition} />
            </React.Fragment>
        );
    }
}

export default App;