import React, { Component, Fragment } from "react";
import ToggleCard from "./components/deviceDisplays"
import NewDeviceForm from "./components/forms"
//! import {ModalTrigger} from "./components/modal"
import Modal from './components/modal'
import {AdminBtn} from "./components/buttons"
import "./index.css"
import "./base.css"
import "./styles/dashboard.css"
import "./styles/displays.css"

// import { BrowserRouter as Redirect } from "react-router-dom";

export default function App() {

  return (
    <Dashboard />
  )

}

// const Home = () => {
//   return (
//     <Redirect to="/dashboard"></Redirect>
//   )
// }

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      devices: [],
      displays: [],
      admin_mode: false,
      modal_content: <p>Default</p>,
      showModal: false
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal = (content) => {
    //TODO: Is this really the best way to do this?
    let modal_dict = {
      NewDevice : <NewDeviceForm />,
      EditDevice: <p>Edit Device</p>
    }

    this.setState({
      modal_content: modal_dict[content],
      showModal: true 
    })
  }

  hideModal = () => {
    this.setState({ showModal: false})
  }

  componentDidMount() {
    this.loadDevices()
  }

  toggle_admin_mode = () => {
    let prev_val = this.state.admin_mode
    this.setState({ 
      admin_mode: !prev_val,
    })
    this.refreshDisplays(!prev_val)
  }

  refreshDisplays = (admin_mode) => {
    let new_displays = []
    this.state.devices.forEach((device) => {
      new_displays.push(<ToggleCard showModal={this.showModal} admin_mode={admin_mode} key={device._id} {...device} />)
    })
    this.setState({
      displays: new_displays
    })
  }

  loadDevices = () => {
    fetch("http://localhost:3001/devices/")
      .then(res => res.json())
      .then(
        (result) => {
          let new_devices = []
          let new_displays = []
          result.forEach((elm) => {
            new_devices.push(elm)
            new_displays.push(<ToggleCard modalContent={<p>Hello</p>} showModal={this.showModal} admin_mode={this.state.admin_mode} key={elm._id} {...elm} />)
          })
          this.setState({
            devices: new_devices,
            displays: new_displays
          })
        }
      )  

  }
  
  getDevices () {
    return this.state.displays
  }

  render() {
    return (
      <Fragment>
        <Navbar showModal={this.showModal} toggle_admin_mode={this.toggle_admin_mode}/>
        <div className='dashboard'>
          <Modal content={this.state.modal_content} show={this.state.showModal} handleClose={this.hideModal}></Modal>
          { this.state.displays }
        </div>
      </Fragment>
    )
  }

}

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  showNewDeviceForm = () => {
    this.props.showModal("NewDevice")
  }

  render() {
    return (
        <div>
          <nav className="navbar">
              <div className="nav-btn">Home</div>
              <div className="nav-btn" onClick={this.showNewDeviceForm}>Add Device</div>
              {/* <ModalTrigger className="nav-btn" content={NewDeviceForm} text="Add Device"/> */}
              <AdminBtn toggle_admin_mode={this.props.toggle_admin_mode}/>
          </nav>
        </div>
    )
  }

}
