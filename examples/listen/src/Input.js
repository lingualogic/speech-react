import React from 'react';

import { ServiceManager, SPEECH_LISTEN_SERVICE } from 'speech-react';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {text: 'Please press the microphone button and start speaking ...'};

    this.listenService = ServiceManager.get( SPEECH_LISTEN_SERVICE );

    this.listenResultEvent = null;

  }

  // lifecycle function like nginit
  componentDidMount() {
    this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
      this.setState( {text: 'Listen result: "' + aText + '"'} );
    });
  }

  // lifecycle function like ngdestroy
  componentWillUnmount() {
    if (this.listenResultEvent){
      this.listenResultEvent.unsubcribe();
    }
  }

  render() {
    return (
      <div>
        <p>
          {this.state.text}
        </p>
      </div>
    )
  }
}

export default Input;