# Speech-React Schnelleinstieg für Listen

In unseren Schnelleinstiegen wollen wir React Apps erstellen und sie um Sprachdienste erweitern. Den Code findet Ihr im /examples Ordner.

Das Beispiel könnt Ihr direkt im Speech-React Projektverzeichnis, ohne in den /examples Ordner wechseln zu müssen, ausführen:

	$ npm run listen

Im Folgenden erklären wir den Entwicklungsprozess Schritt für Schritt.


## Voraussetzungen

* NodeJS >= 10.X (LTS-Version)
* React >= 16.x

* speech-framework >= 0.5.13
* speech-react >= 0.5.13

Für Styles:

    $ npm install --save-dev node-sass

Icons von [Fontawesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react):

    $ npm install @fortawesome/fontawesome-svg-core
    $ npm install @fortawesome/free-solid-svg-icons
    $ npm install @fortawesome/react-fontawesome


Weiter geht es in der App. Zur Programmierung können wir [VScode](https://code.visualstudio.com/) empfehlen.

## ListenService

Zunächst erstellen wir die Beispielapp mit dem React-Befehl:

    $ npx create-react-app listen
    $ cd listen
    $ npm start

Dann öffen wir Chrome und geben als URL http://localhost:3000 ein.

Mit dem neuen ListenService wollen wir [Spracherkennung](https://de.wikipedia.org/wiki/Spracherkennung) realisieren. Dazu istallieren wir die Speech-Packages:

    $ npm install speech-framework-0.5.13.tgz  
    $ npm install speech-react-0.5.13.tgz


Die App wird zu einer Klasse gemacht und von Component abgeleitet.
Im Konstruktor der App wird der ServiceManager aus speech-react initialisiert.
In App.js:


    import { ServiceManager } from 'speech-react';
    
    class App extends Component {                 

        constructor() {
            super();
            ServiceManager.init({ errorOutputFlag: true });
        }

        render() {
            return (
                <div className="App">   
                    <Microphone />                        
                    <Input />
                </div>
            );
        }
    }


In der render()-Funktion werden zwei Komponenten hinzugefügt.

- die Microphone-Komponente startet und stoppt die Spracherkennung.
- die Input-Komponente zeigt das Ergebnis der Spracherkennung als Text an.

In Microphone.js:

    import { SPEECH_LISTEN_SERVICE, ServiceManager } from 'speech-react';


    class Microphone extends React.Component {

        startEvent = null;   //<==
        stopEvent = null;    //<==

        constructor( props ) {
            super( props );
        
            // get ListenService                                       //<==
            this.listenService = ServiceManager.get( SPEECH_LISTEN_SERVICE );
        }

        startListen() {
            this.listenService.start();      //<==
        }

        stopListen() {
            this.listenService.stop();      //<==
        }
    }


In input.js:

    class Input extends React.Component {
        constructor(props) {
            super(props);

            this.state = {text: 'Please press the microphone button and start speaking ...'};

            this.listenService = ServiceManager.get( SPEECH_LISTEN_SERVICE ); // <==

            this.listenResultEvent = null; // <==

        }

        componentDidMount() {
            this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
            this.setState( {text: 'Listen result: "' + aText + '"'} );
            });
        }

        componentWillUnmount() {
            if (this.listenResultEvent){
            this.listenResultEvent.unsubcribe();
            }
        }
    }

Den Code zu diesem Teil findet ihr unter examples/listen.


## Links

* [Docs](https://reactjs.org/docs/hello-world.html)
* [coponente](https://dev.to/iam_timsmith/react-how-to-create-a-component-2ho9)
* [icon](https://fontawesome.com/how-to-use/on-the-web/using-with/react)
*  scss: ```$ npm install node-sass```
* [events](https://reactjs.org/docs/handling-events.html)
* [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

