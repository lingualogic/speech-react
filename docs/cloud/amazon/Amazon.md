# AmazonModule Cloud-Dienst

Die AmazonModule Cloud-Dienstanbindung von Speech-React erlaubt die Nutzung der Amazon-TTS (Polly) im SpeakService.

Infos zu Amazon Polly unter [aws.amazon.com/polly](https://aws.amazon.com/polly/).


## Voraussetzungen

Um die AmazonModule Cloud-Dienstanbindung nutzen zu können, muss ein AWS Account eingerichtet sein und die Amazon-Credentials ermittelt werden. Dann legt man die Datei amazon-credentials.ts im Unterverzeichnis credentials des eigenen Projektes an und trägt folgende Konstanten ein:

* **REGION** - Amazon Region
* **IDENTITY_POOL_ID** - Amazon IdentityPoolId


Die Datei credentials/amazon-credentials.ts sollte folgendes beinhalten:

	/**
	 * Amazon Credentials
	 */
	
	export const REGION = ''; 			// <--- Hier die eigene Amazon REGION eintragen
	export const IDENTITY_POOL_ID = ''; // <--- Hier die eigene Amazon IdentityPollId eintragen 


Diese Datei darf nicht in das Git-Repository übernommen werden. Dazu wird in der .gitignore Datei des Projektes der Name der Datei eingetragen.

eigenes Projektverzeichnis/.gitignore:
 
	# Konfigdateien
	
	credentials/
	amazon-credentials*


## Integration des AmazonModule von Speech-React

Um den Amazon Cloud-Dienst in der eigenen React-Anwendung verwenden zu können, muss das AmazonModule von Speech-React in die src/App.tsx Datei der React-Anwendung, wie nachfolgend im Beispielcode gezeigt, eingebaut werden.

eigenes Projektverzeichnis/src/App.tsx:


	import React from 'react';
	import logo from './logo.svg';
	import './App.css';
	
	
	// Speech 
	
	import { AmazonModule, ServiceManager } from 'speech-react';
	
	
	// Amazon-Credentials
	
	// TODO: Hier muessen die echten Zugangsdaten eingetragen werden
	import { REGION, IDENTITY_POOL_ID } from './../credentials/amazon-credentials';
	const amazonOption = {
	  	amazonRegion: REGION,
	  	amazonIdentityPoolId: IDENTITY_POOL_ID
	};
	
	
	const App: React.FC = () => {

		// Initialiserung von Amazon-Modul

		AmazonModule.init( amazonOption, (aAmazonFlag: boolean) => {
			console.log('Amazon: ', aAmazonFlag );        
	
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
	

Das AmazonModule initialisiert den Amazon Cloud-Service. Die Initialisierung der Speech-Services darf erst danach erfolgen, daher wird sie in der an AmazonModule.init() übergebenen Callback-Funktion erst ausgeführt, um die Speech-Services korrekt mit dem eingerichteten Amazon Cloud-Dienst zu starten.


## Dynamische Amazon-Credentials

Will man die Amazon-Credetials nicht bei der Initialisierung übergeben, sondern erst später durch ein Formular, so kann dies mit dem optionalen Paramter: 

	const amazonOption = {
		amazonDynamicCredentialsFlag: true 
	};
	
in den Optionen eingetragen werden. Dann sind die Angaben der anderen Credentials-Parameter nicht mehr notwendig.
Die Amazon-Credentials können dann zu jedem späteren Zeitpunkt mit dem AmazonService in der React-App geändert werden.




