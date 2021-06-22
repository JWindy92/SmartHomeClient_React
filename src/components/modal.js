import React, { Component, Fragment } from 'react';
import { GrClose } from "react-icons/gr"
import { IconContext } from "react-icons"
import "../styles/modal.css"

class ModalTrigger extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    test_func = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render () {
        return (
            <Fragment>
                <div className={this.props.className} onClick={this.test_func}>{this.props.text}</div>
                { this.state.show ? <Modal content={this.props.content} close={this.test_func}/> : null }
            </Fragment>
        )
    }

}



class Modal extends Component {
    
    // eslint-disable-next-line
    constructor(props) {
        super(props)
    }

    render() {
        return(
                <div className="modal">
                    <IconContext.Provider value={{ className: "close-btn-icon" }} >
                        <div className="close-btn" onClick={this.props.close}><GrClose /></div>
                    </IconContext.Provider>
                    <this.props.content onSuccess={this.props.close}/>
                </div>
            
        )
    }

}


export {
    ModalTrigger
}