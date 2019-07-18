# RasaModule Cloud-Dienst

Die RasaModule Cloud-Dienstanbindung von Speech-React erlaubt die Nutzung der Rasa-NLU im IntentService zusammen mit einem eigenen Rasa-Server.

Infos zu Rasa unter [rasa.com](https://rasa.com/).


## Voraussetzungen

Um die RasaModule Cloud-Dienstanbindung nutzen zu können, muss ein Rasa-Server zusammen mit einem Zugriffstoken eingerichtet sein. Dann legt man die Datei rasa-credentials.ts im Unterverzeichnis credentials des eigenen Projektes an und trägt folgende Konstante ein:

* **RASA_APP_KEY** - Rasa Access Token, wie es beim Rasa-Server vergeben wurde !


Die Datei credentials/rasa-credentials.ts sollte folgendes beinhalten:

	/**
	 * Rasa Credentials
	 */
	
	export const RASA_APP_KEY = ''; 			// <--- Hier das eigene Rasa Access Token eintragen
	

Diese Datei darf nicht in das Git-Repository übernommen werden. Dazu wird in der .gitignore Datei des Projektes der Name der Datei eingetragen.

eigenes Projektverzeichnis/.gitignore:
 
	# Konfigdateien

	credentials/
	rasa-credentials*


## Integration des RasaModule von Speech-React

Um den Rasa Cloud-Dienst in der eigenen React-Anwendung verwenden zu können, muss das RasaModule von Speech-React in die src/Apps.tsx Datei der React-Anwendung, wie nachfolgend im Beispielcode gezeigt, eingebaut werden.

eigenes Projektverzeichnis/src/App.tsx:


	import React from 'react';
	import logo from './logo.svg';
	import './App.css';
	
	
	// Speech 
	
	import { RasaModule, ServiceManager } from 'speech-react';
	
	
	// Rasa-Credentials
	
	// TODO: Hier muessen die echten Zugangsdaten eingetragen werden
	import { RASA_APP_KEY } from './../credentials/rasa-credentials';
	const rasaOption = {
	  rasaAppKey: RASA_APP_KEY
	};
	
	
	const App: React.FC = () => {

		// Initialiserung von Rasa-Modul

		RasaModule.init( rasaOption, (aRasaFlag: boolean) => {
			console.log('Rasa: ', aRasaFlag );        
	
		   	// Initialisierung aller Speech-Services
	
			ServiceManager.init();
    	});

	   	// Rueckgabe der Html-Ausgabe
	
		return (
	   		<div className="App">
				<header className="App-header">
					<a>
	          	Learn React
	          	</a>
	        	</header>
	    	</div>
	   	);
	}

	export default App;
	

Das RasaModule initialisiert den Rasa Cloud-Service. Die Initialisierung der Speech-Services darf erst danach erfolgen, daher wird sie in der an GoogleModule.init() übergebenen Callback-Funktion erst ausgeführt, um die Speech-Services korrekt mit dem eingerichteten Rasa Cloud-Dienst zu starten.


## Dynamische Rasa-Credentials

Will man die Rasa-Credetials nicht bei der Initialisierung übergeben, sondern erst später durch ein Formular, so kann dies mit dem optionalen Paramter:

	const rasaOption = {
		rasaDynamicCredentialsFlag: true
	};
	
in den Opti6onen eingetragen werden. Dann sind die Angaben der anderen Credentials-Parameter nicht mehr notwendig.
Die Rasa-Credentials können dann zu jedem späteren Zeitpunkt mit dem RasaService in der React-App geändert werden.
