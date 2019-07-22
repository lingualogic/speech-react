import React from 'react';
import './Input.scss';

import { ServiceManager, SPEECH_SPEAK_SERVICE } from 'speech-react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: props.text};
    this.speakService = ServiceManager.get( SPEECH_SPEAK_SERVICE );
    this.speakService.text = this.state.text;
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({text: event.target.value});
    this.speakService.text = this.state.text;
  }
  

  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.handleChange} />
      </div>
    )
  }
}

export default Input;