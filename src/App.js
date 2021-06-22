import React, { Component, Fragment } from "react";
import ToggleCard from "./components/deviceDisplays"
import NewDeviceForm from "./components/forms"
import {ModalTrigger} from "./components/modal"
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
      admin_mode: false
    }
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
      new_displays.push(<ToggleCard admin_mode={admin_mode} key={device._id} {...device} />)
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
            new_displays.push(<ToggleCard admin_mode={this.state.admin_mode} key={elm._id} {...elm} />)
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
        <Navbar toggle_admin_mode={this.toggle_admin_mode}/>
        <div className='dashboard'>
          { this.state.displays }
        </div>
      </Fragment>
    )
  }

}

class Navbar extends Component {

  render() {
    return (
        <div>
          <nav className="navbar">
              <div className="nav-btn">Home</div>
              <ModalTrigger className="nav-btn" content={NewDeviceForm} text="Add Device"/>
              <AdminBtn toggle_admin_mode={this.props.toggle_admin_mode}/>
          </nav>
        </div>
    )
  }

}

// class Navbar extends Component {

//   render() {
//     return (
//       <Router>
//         <div>
//           <nav className="navbar">
//               <Link to="/">Home</Link>
//               <ModalTrigger className="nav-btn" content={NewDeviceForm} text="Add Device"/>
//               <AdminBtn />
//           </nav>

//           <Switch>
//             <Route path="/" exact component={Home}></Route>
//             <Route path="/dashboard" exact component={Dashboard}></Route>
//             <Route path="/add_device" component={AddDevice}></Route>
//             <Route render={() => <h1>404: page not found</h1>} />
//           </Switch>
//         </div>
//       </Router>
//     )
//   }

// }
