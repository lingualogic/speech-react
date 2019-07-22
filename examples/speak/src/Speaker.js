import React from 'react';
import './Speaker.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ServiceManager, SPEECH_SPEAK_SERVICE } from 'speech-react';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.speakService = ServiceManager.get( SPEECH_SPEAK_SERVICE );
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.startEvent = null;
    this.stopEvent = null;
  }

  // lifecycle function like nginit
  componentDidMount() {

    this.startEvent = this.speakService.startEvent.subscribe( () => {
      this.setState( {isToggleOn: false} );
    });

    this.stopEvent = this.speakService.stopEvent.subscribe( () => {
      this.setState( {isToggleOn: true} );
    });

  }

  // lifecycle function like ngdestroy
  componentWillUnmount() {
    if (this.stopEvent){
      this.stopEvent.unsubcribe();
    }

    if (this.startEvent){
      this.startEvent.unsubcribe();
    }

  }

  handleClick() {
    this.speak();
  }
  
  speak( ) {
    if ( this.speakService ) {
      this.speakService.start();
    } 
  }

  render() {
    return (
      <div>
        {this.state.isToggleOn ? 
          <div id="speaker" className="button--speaker" onClick={this.handleClick}>
            <FontAwesomeIcon icon="volume-off" />
          </div>
          :
          <div id="speaker-active" className="button--speaker-active" onClick={this.handleClick}>
            <FontAwesomeIcon icon="volume-up" />
          </div>}
      </div>
    )
  }
}

export default Speaker;