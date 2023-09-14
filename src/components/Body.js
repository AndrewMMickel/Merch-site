import React from 'react';
import ItemList from './ItemList';
import Reimu from "./../img/Reimu.jpg";

function Body() {
    return (
        <React.Fragment>
            <div id="frame" className="col-md-6">
                <img source={Reimu} alt="Reimu"></img>
                <div id="body">
                    <ItemList />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Body;