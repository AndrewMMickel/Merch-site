import React from 'react';
import backgroundImg from "./../img/backgroundImg.png";

const navTabStyles = {
    display: "flex",
    flexGrow: "3"
}

const navBtnStyles = {
    border: "1px solid #bf000d",
    color: "#bf000d",
    height: "40%",
    width: "40%",
    fontSize: "1.1vw"

}

function NavigationTabs() {
    return (
        <React.Fragment>
            <div id="intro">
                <h1 color="#bf000d">Reimu's Farmer Market</h1>
                <div id="navigation-tabs" className="col-md-6" style={navTabStyles}>
                    <img src={backgroundImg} alt="backgroundImg" className="img-style"></img>
                    <button type="button" className="nav-btn" style={navBtnStyles}>Home</button>
                    <button type="button" className="nav-btn" style={navBtnStyles}>Notifications</button>
                    <button type="button" className="nav-btn" style={navBtnStyles}>Applications</button>
                    <img src={backgroundImg} alt="backgroundImg" className="img-style"></img>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavigationTabs;