import React, { Component, Fragment } from 'react';
import { GrClose } from "react-icons/gr"
import { IconContext } from "react-icons"
import "../styles/modal.css"

class Modal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

        return (
            <div className={this.props.modal_class + " " + showHideClassName}>
                <section className="modal-main">
                    { this.props.content }
                    <button type="button" onClick={this.props.handleClose}>
                        Close
                    </button>
                </section>
            </div>
        )
    }

}

export default Modal