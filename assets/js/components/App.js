import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();

        axios.get('/api/cars')
            .then(function (response) {
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {
                console.error(error);
            });

        axios.get('/api/test/perduodu_teestas')
            .then(function (response) {
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return (
            <div>HELLO FROM REACT!</div>
        )
    }
}

export default App;