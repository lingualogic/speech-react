import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


// speech

import { ServiceManager } from 'speech-react';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

import Microphone from './Microphone';
import Input from './Input';


library.add(faMicrophone)


class App extends Component {

    constructor() {
        super();

        // alle Services initialisieren

        ServiceManager.init({ errorOutputFlag: true });
    }


    render() {
        return (
        <div className="App">
            <header className="App-header">

            <Microphone />

            <Input />
            <a
                className="App-link"
                href="https://lingualogic.de"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn more about the Speech-Framework
            </a>
            </header>
        </div>
        );
    }
}

export default App;
