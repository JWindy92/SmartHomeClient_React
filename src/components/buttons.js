import React, { Component } from 'react';
import "../styles/buttons.css"
import { RiListSettingsLine } from "react-icons/ri"
import { IconContext } from "react-icons"

class AdminBtn extends Component {

    constructor(props) {
        super(props)
    }

    test_func = () => {
        console.log("clicked");
    }

    render() {
        return (
            
                <IconContext.Provider value={{ className: "admin-btn-icon" }} >
                    <div className="admin-btn" onClick={this.test_func}>
                        <RiListSettingsLine />
                    </div>
                </IconContext.Provider>
            
        )
    }
    
}

export {
    AdminBtn
}