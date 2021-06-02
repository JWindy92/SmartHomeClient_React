import React, { Component, Fragment } from 'react';
import axios from 'axios';
import "../styles/forms.css"
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class NewDeviceForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current_device: "Yeelight",
            redirect: false,
            types : [],
            field_map : [],
            form_data: {}
        }
    }

    componentDidMount() {
        this.getDeviceTypes()
    }

    getDeviceTypes = () => {
        axios.get("http://localhost:3001/supported").then((res) => {
            let new_options = []
            let new_field_map = {}
            res.data.forEach((type) => {
                new_options.push(<option>{ type.device_type }</option>)
                new_field_map[type.device_type] = []
                type.required_fields.forEach((field) => {
                    new_field_map[type.device_type].push(<TextInput updater={ this.updateFormData } fieldname={field} />)
                })
                this.setState({
                    options: new_options,
                    field_map: new_field_map
                })
            })
        })
    }

    submitDevice = () => {
        
        //TODO: This should all be done by the 'service' on the API server, as these specs would not be apparent to a user of the API
        let data = {
            name: this.state.form_data.Name,
            addr: this.state.form_data['IP Address'],
            topic: this.state.form_data['MQTT Topic'],
            type: this.state.current_device,
            state: {
                power: false
            },
            protocol: 'mqtt'
        }
        console.log("Submitting")
        axios.post("http://localhost:3001/add_device", data).then((res) => {
            if (res.status == 201) {
                console.log("redirecting")
                return (
                    <Redirect to="/dashboard"></Redirect>
                )
                
            }
        })
    }

    updateFormData = (e) => {
        let new_data = this.state.form_data
        new_data[e.target.name] = e.target.value
        this.setState({
            form_data : new_data
        })
    }

    setCurrentDevice = (e) => {
        this.setState({
            current_device: e.target.value,
            form_data: {}
        })
    }

    render() {
        return (
            <div className="formContainer">
                <p className="formHeader">New Device</p>
                <select onChange={ this.setCurrentDevice }>{ this.state.options }</select>
                <form onChange={ this.handleChange } className="formElement">
                    { this.state.field_map[this.state.current_device] }
                    <button type="button" className="submit-btn" onClick={this.submitDevice}>Submit</button>
                </form>
            
            </div>

            
        )

    }

}

class TextInput extends Component {
    
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <Fragment>
                <label className="form-label">{ this.props.fieldname }:</label>
                <input onChange={(e) => this.props.updater(e)} name={ this.props.fieldname } className="form-input" type="text"></input>
            </Fragment>
        )
    }

}

export default NewDeviceForm