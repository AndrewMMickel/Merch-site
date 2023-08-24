import React from "react";
import NavigationTabs from "./NavigationTabs";

function Header() {
    return (
        <React.Fragment>
            <div id="header">
                <NavigationTabs />
                {/* <div id="search-itemname">
                    <form>
                        <input id="itemname" type="text" name="itemname" placeholder="itemName" />
                    </form>
                </div> */}
            </div>
        </React.Fragment>
    );
}

export default Header;