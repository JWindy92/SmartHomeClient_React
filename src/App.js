import React, { Component, Fragment } from "react";
import ToggleCard from "./components/deviceDisplays"
import NewDeviceForm, {TestForm} from "./components/forms"
import "./index.css"
import "./base.css"
import "./styles/dashboard.css"
import "./styles/displays.css"

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

export default function App() {

  return (
    <Navbar />
  )

}

const Home = () => {
  return (
    <Redirect to="/dashboard"></Redirect>
  )
}

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      devices: [],
      displays: []
    }
  }

  componentDidMount() {
    this.loadDevices()
  }
  //TODO: fetch seems to be running twice, figure out why
  loadDevices() {
    console.log("loading")
    fetch("http://localhost:3001/devices/")
      .then(res => res.json())
      .then(
        (result) => {
          let new_devices = []
          let new_displays = []
          result.forEach((elm) => {
            new_devices.push(elm)
            new_displays.push(<ToggleCard key={elm._id} {...elm} />)
            this.setState({
              devices: new_devices,
              displays: new_displays
            })
          })
        }
      )  

  }
  
  getDevices () {
    return this.state.displays
  }

  render() {

    return (
      <div className='dashboard'>
        { this.state.displays }
      </div>
    )
  }

}


const AddDevice = () => {
  return (
    <Fragment>
      <h1>Add Device</h1>
      <NewDeviceForm />
    </Fragment>
  )
}

class Navbar extends Component {

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar">
              <Link to="/">Home</Link>
              <Link to="/add_device">Add Device</Link>
          </nav>

          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/add_device" component={AddDevice}></Route>
            <Route render={() => <h1>404: page not found</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }

}

