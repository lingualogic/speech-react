import React from 'react';
import './Mircophone.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// speech

import { SPEECH_LISTEN_SERVICE, ServiceManager } from 'speech-react';


class Microphone extends React.Component {

    startEvent = null;
    stopEvent = null;
    resultEvent = null;
    errorEvent = null;


    constructor( props ) {
        super( props );
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind( this );

        // Listenservice holen
        this.listenService = ServiceManager.get( SPEECH_LISTEN_SERVICE );
    }


    componentDidMount() {
        this.startEvent = this.listenService.startEvent.subscribe(() => {
            console.log('StartListen');
            this.setState({ isToggleOn: false });
        });
        this.stopEvent = this.listenService.stopEvent.subscribe(() => {
            console.log('StopListen');
            this.setState({ isToggleOn: true });
        });
        this.resultEvent = this.listenService.resultEvent.subscribe((aResult) => {
            console.log('ResultListen:', aResult);
        });
        this.errorEvent = this.listenService.errorEvent.subscribe((aError) => {
            console.log('Fehler:', aError);
            this.setState({ isToggleOn: true });
        });
    }


    componentWillUnmount() {
        if ( this.startEvent ) this.startEvent.unsubscribe();
        if ( this.stopEvent) this.stopEvent.unsubscribe();
        if ( this.resultEvent ) this.resultEvent.unsubscribe();
        if ( this.errorEvent ) this.errorEvent.unsubsribe();
    }


    startListen() {
        this.listenService.start();
    }


    stopListen() {
        this.listenService.stop();
    }


    handleClick() {
        if ( this.state.isToggleOn ) {
            this.startListen();
        } else {
            this.stopListen();
        }
    }


    render() {
        return (
        <div>
            {this.state.isToggleOn ? 
            <div id="microphone" className="button--microphone" onClick={this.handleClick}>
                <FontAwesomeIcon icon="microphone" />
            </div>
            :
            <div id="microphone-active" className="button--microphone-active" onClick={this.handleClick}>
                <FontAwesomeIcon icon="microphone" />
            </div>}
        </div>
        )
    }

}

export default Microphone;