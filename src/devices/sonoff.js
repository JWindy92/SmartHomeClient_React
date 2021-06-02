export default class SonoffBasic {

    constructor(data) {
        this.data = data
    }

    toggle = (state) => {
        this.data.state = state
        console.log("Toggle cmnd: " + JSON.stringify(this.data))

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.data)
        }
        fetch(`http://localhost:3001/devices/sonoff?id=${this.data.id}`, requestOptions)
    }

}
