import React, { Component } from 'react';
import axios from 'axios';
import "../styles/toggles.css"
import { AiFillEdit } from "react-icons/ai"

class ToggleCard extends Component {

    // eslint-disable-next-line
    constructor(props) {
      super(props)
      this.state = {
        admin_mode: this.props.admin_mode
      }
    }
    
    showEditForm = () => {
      this.props.showModal("EditDevice")
    }

    render() {
      return (
        <div className={this.props.admin_mode ? "toggle-card editable" : "toggle-card"}>
          <i 
            className={this.props.admin_mode ? "edit-device-btn" : "edit-device-btn hidden"}
            onClick={this.showEditForm}
          >
            <AiFillEdit/>
          </i>
          <p className="name">{this.props.name}</p>
          <ToggleSwitch {...this.props}/>
        </div>
      )
    }

}

class ToggleSwitch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      state: props.state
    }
  }

  handleClick = () => {
    let new_state = !this.state.state

    //TODO: maybe a function should build this, for reusability and ease of reading
    let data = {
      id: this.props._id, //TODO: Confirm this is used
      addr: this.props.addr,
      device_type: this.props.type,
      topic: this.props.topic,
      state: {
        power: new_state
      }
    }

    axios.post('http://localhost:3001/devices/command', data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            state: new_state
          })
        }
      });
  }

  render() {
    return ( 
      <label className="switch">
        <input type="checkbox" onClick={this.handleClick} defaultChecked={this.state.state}></input>
        <span className="slider round"></span>
      </label>
    )
  }

}

export default ToggleCard