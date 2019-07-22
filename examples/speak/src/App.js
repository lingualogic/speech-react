import React from 'react';

import './App.css';

import Speaker from './Speaker';
import Input from './Input';

import { ServiceManager } from 'speech-react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp,faVolumeOff } from '@fortawesome/free-solid-svg-icons'

library.add(faVolumeUp,faVolumeOff)

function App() {

  ServiceManager.init();

  return (
    <div className="App">
      <header className="App-header">

        <Speaker />
        <Input text='Hallo Welt!'/>

        <p>
          Please press the speaker button and the TTS starts...
        </p>
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

export default App;
