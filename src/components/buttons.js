import React, { Component } from 'react';
import "../styles/buttons.css"
import { RiListSettingsLine } from "react-icons/ri"
import { IconContext } from "react-icons"
// import { Modal } from './forms';

class AdminBtn extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props)
    }

    test_func = () => {
        console.log("clicked");
    }

    render() {
        return (
            
            <IconContext.Provider value={{ className: "admin-btn-icon" }} >
                <div className="admin-btn" onClick={this.props.toggle_admin_mode}>
                    <RiListSettingsLine />
                </div>
            </IconContext.Provider>
            
        )
    }
    
}

export {
    AdminBtn
}