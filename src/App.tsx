import React from 'react';
import logo from './logo.svg';
import './App.css';

// speech 

import { SPEECH_SPEAK_SERVICE } from './speech/const/speech-service-const';
import { AmazonModule } from './speech/amazon/amazon-module';
import { GoogleModule } from './speech/google/google-module';
import { ServiceManager } from './speech/service/service-manager';
import { SpeakService } from './speech/speak/speak-service';


const App: React.FC = () => {

    // Initialiserung von Amazon-Modul

    AmazonModule.init( { amazonDynamicCredentialsFlag: true }, (aAmazonFlag: boolean) => {
        console.log('Amazon: ', aAmazonFlag );        
    });

    // Initialiserung von Google-Modul

    GoogleModule.init( { googleDynamicCredentialsFlag: true }, (aGoogleFlag: boolean) => {
        console.log('Google: ', aGoogleFlag );        
    });

    // Initialisierung aller Services

    ServiceManager.init();

    // Speak-Service ausfuehren

    function speak( aText: string ) {
        let speak = ServiceManager.get( SPEECH_SPEAK_SERVICE ) as SpeakService;
        if ( speak ) {
            speak.text = aText;
        }
        speak.start();
    }

    // Rueckgabe der Html-Ausgabe

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button
                className="square"
                onClick={ () => speak('Dies ist ein Testtext')}>
            Sprechen                    
            </button>
            <p>
            Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        </div>
    );
}

export default App;
