# MicrosoftModule Cloud-Dienst

Die MicrosoftModule Cloud-Dienstanbindung von Speech-React erlaubt die Nutzung der Microsoft-ASR im SpeakService.

Infos zu Microsoft Speech-To-Text unter [azure.microsoft.com/en-in/services/cognitive-services/speech-to-text/](https://azure.microsoft.com/en-in/services/cognitive-services/speech-to-text/).


## Voraussetzungen

Um die MicrosoftModule Cloud-Dienstanbindung nutzen zu können, muss ein Azure Account eingerichtet sein und die Microsoft-Credentials ermittelt werden. Dann legt man die Datei microsoft-credentials.ts im Unterverzeichnis credentials des eigenen Projektes an und trägt folgende Konstanten ein:

* **MICROSOFT_REGION** - Microsoft Region
* **MICROSOFT_SUBSCRIPTION_KEY** - Microsoft Subscription Key


Die Datei credentials/microsoft-credentials.ts sollte folgendes beinhalten:

	/**
	 * Microsoft Credentials
	 */
	
	export const MICROSOFT_REGION = ''; 			// <--- Hier die eigene Microsoft REGION eintragen
	export const MICROSOFT_SUBSCRIPTION_KEY = '';   	// <--- Hier den eigenen Microsoft Subscription Key eintragen 


Diese Datei darf nicht in das Git-Repository übernommen werden. Dazu wird in der .gitignore Datei des Projektes der Name der Datei eingetragen.

eigenes Projektverzeichnis/.gitignore:
 
	# Konfigdateien

	microsoft-credentials*


## Integration des MicrosoftModule von Speech-React

Um den Microsoft Cloud-Dienst in der eigenen React-Anwendung verwenden zu können, muss das MicrosoftModule von Speech-React in die src/App.tsx Datei der React-Anwendung, wie nachfolgend im Beispielcode gezeigt, eingebaut werden.

eigenes Projektverzeichnis/src/App.tsx:


	import React from 'react';
	import logo from './logo.svg';
	import './App.css';
	
	
	// Speech 
	
	import { MicrosoftModule, ServiceManager } from 'speech-react';
	
	
	// Microsoft-Credentials
	
	// TODO: Hier muessen die echten Zugangsdaten eingetragen werden
	import { MICROSOFT_REGION, MICROSOFT_SUBSCRIPTION_KEY } from './../credentials/microsoft-credentials';
	const microsoftOption = {
	  	microsoftRegion: MICROSOFT_REGION,
	  	microsoftSubscriptionKey: MICROSOFT_SUBSCRIPTION_KEY
	};
	
	
	const App: React.FC = () => {

		// Initialiserung von Microsoft-Modul

		MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
			console.log('Microsoft: ', aMicrosoftFlag );        
	
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
	

Das MicrososftModule initialisiert den Microsoft Cloud-Service. Die Initialisierung der Speech-Services darf erst danach erfolgen, daher wird sie in der an MicrosoftModule.init() übergebenen Callback-Funktion erst ausgeführt, um die Speech-Services korrekt mit dem eingerichteten Microsoft Cloud-Dienst zu starten.


## Dynamische Microsoft-Credentials

Will man die Microsoft-Credetials nicht bei der Initialisierung übergeben, sondern erst später durch ein Formular, so kann dies mit dem optionalen Paramter: 

	const microsoftOption = {
		microsoftDynamicCredentialsFlag: true 
	};
	
in den Optionen eingetragen werden. Dann sind die Angaben der anderen Credentials-Parameter nicht mehr notwendig.
Die Microsoft-Credentials können dann zu jedem späteren Zeitpunkt mit dem MicrosoftService in der React-App geändert werden.




