# IntentService

Der IntentService dient zur Sprachanalyse von Texten zur Erzeugung eines Intents. Für die Sprachanalyse kann eine NLU von Google, Microsoft und Rasa Cloud-Diensten verwendet. Der intentService erbt vom abstrakten [BaseService](./../base/BaseService.md).


## Architektur

In der folgenden Grafik werden die einzelnen Schichten, angefangen von der ReactApp, über den ServiceManager, den IntentService, den GoogleService, MicrosoftService, RasaService und das GoogleModule, MicrosoftModule, RasaModule von Speech-React, die Intent-Komponente, das Plugin für die NLU (Natural Language Understanding), sowie die verschiedenen Cloud-Komponenten im Speech-Framework, bis hinunter zum Cloud-Dienst, dargestellt. 


![IntentService-Architektur](IntentService-1.gif)


Ganz oben sind die für den IntentService notwendigen Credentials dargestellt, die der ReactApp übergeben werden müssen. Eine Anleitung für die Erstellung der Credentials und die Einbindung der Cloud-Module in die ReactApp zur Aktivierung des jeweiligen Cloud-Service findet man unter [docs/cloud/Cloud.md](./../../cloud/Cloud.md)

Die nächste Grafik zeigt die konkrete Vererbungsbeziehung zu BaseService, sowie die Einbindung von IntentFactory und IntentInterface aus dem Speech-Framework. IntentFactory ist eine statische Klasse und erzeugt das Intent-Objekt zum IntentInterface. Auf der linken Seite sind die verschiedenen Cloud-Module dargestellt, welche als statische Klassen implementiert sind und das jeweilige Cloud-Singleton (Google, Microsoft und Rasa) aus dem Speech-Framework einbinden.
Damit die Cloud-Dienste funktionieren, müssen die Credentials vom jeweiligen Cloud-Module an das Cloud-Singleton weitergereicht werden.


![IntentService-Struktur](IntentService-2.gif)


## API

Der IntentService definiert die öffentliche Schnittstelle von Speech-React für die Sprachanalyse. Die folgende Grafik zeigt einen Überblick über die gesamte API des IntentServices. Die API teilt sich auf in Objektfunktionen, Objektereignisse und Objekteigenschaften. Die API verfügt über eine auf Funktionen und eine auf Eigenschaften basierende Schnittstelle. Die gleiche Aufgabe kann über Funktionsaufrufe oder über das Setzen von Eigenschaften erledigt werden. Z.B. kann die Sprache entweder mit intentService.setLanguage('de') oder mit intentService.language = 'de' eingetragen werden, bevor mit intentService.start() die Sprachanalyse gestartet wird.

![IntentService-API](IntentService-3.gif)


## Importieren

Um den IntentService importieren zu können, muss in der jeweiligen Komponente folgende Zeile eingefügt werden:

	import { SPEECH_INTENT_SERVICE, ServiceManager, IntentService } from 'speech-react'
	
Dazu müssen das Speech-Framework und das Speech-React npm-Paket in der gleichen Version vorher ins eigene ReactApp-Projekt kopiert und installiert worden sein.

	$ npm install speech-framework-<version>.tgz
	$ npm install speech-react-<version>.tgz
	 
Alternativ kann man Speech-React aus dem globalen NPM-Repository installieren. Dann wird Speech-Framework automatisch mitinstalliert.

	$ npm install speech-react
	 

## Konfiguration

Dier erste Aufgabe vor Nutzung des IntentService besteht in der Festlegung der Konfiguration vor der Erzeugung des Services in React. In der Defaulteinstellung wird die init()-Funktion im Konstruktor aufgerufen und die voreingestellte Konfiguration übernommen. Will man die Defaultkonfiguration überschreiben, holt man sie sich mittels der Klassenfunktion IntentService.getConfig(). Diese Funktion gibt das IntentConfig-Objekt des IntentServices zurück. 

Auszug aus der Datei: src/speech/intent/intent-service-config.ts:

	// hier sind die Defaultwerte des IntentService festgelegt	
	export const IntentServiceConfig: IntentServiceOptionInterface = {
	    /** ein/ausschalten der Intent-Komponente */
	    activeFlag: true,
	    /** setzt die Sprache fuer die Sprachanalyse ( 'de', 'en' )*/
	    intentLanguage: 'de',
	    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
	    errorOutputFlag: false
	};


## Sprachanalyse

Um Sprache zu analysieren, muss zuerst die Sprache festgelegt werden. Hier hat man die Wahl zwischen den Funktionen zum Eintragen der Werte, oder den Eigenschaften. Die Sprache kann auch in der Konfiguration mit dem Parameter intentLanguage eingetragen werden. Es gibt zwei Konstanten für die Sprache Deutsch ('de') und Englisch ('en'), die immer verwendet werden sollten, wenn man die Sprache eintragen will. Neben der Sprache muss auch der Text für die Sprachanaylse übergeben werden. Dies kann man entweder mit der Übergabe des Textes an die intentService.setText() Funktion oder mit der Zuweisung an intentService.text machen. Hat man diese Werte eingetragen kann man die Sprachanalyse mit intentService.start() beginnen und mit intentService.stop() abbrechen. Nach dem Start der Sprachanalyse erhält man das Ereignis resultEvent und die Sprachanalyse wird automatisch beendet. Das Ereignis resultEvent erhält die Intention und die Confidence für den übergebenen Text. Falls ein Fehler auftritt, erhält man das Ereignis errorEvent.

Beispiel-Komponente für die Integration von Sprache:

	import React from 'react';

	// IntentService 
		
	import { SPEECH_INTENT_SERVICE, ServiceManager, IntentService, INTENT_DE_LANGUAGE, INTENT_EN_LANGUAGE } from 'speech-react';

	
	export class IntentComponent extends React.Component {
	
		intentService: IntentService = null;
		intentResultEvent = null;
		intentErrorEvent = null;
	
		constructor() {
			this.intentService = ServiceManager.get( SPEECH_INTENT_SERVICE );
		}
		
		// Intent-Ereignisse eintragen
				
		componentDidMount() {
			this.intentResultEvent = intentService.resultEvent.subscribe(aResultIntent => console.log('Sprachanalyse Intent:', aResultIntent.intent, aResultIntent.confidence));
			this.listenErrorEvent = listenService.errorEvent.subscribe(aError => console.log('Sprachanalyse Fehler:', aError.message));
		}

		// Intent-Ereignisse freigeben
		
		componentWillUnmount() {
			this.listenResultEvent.unsubscribe();
			this.listenErrorEvent.unsubscribe();
		}

		// eigene Funktionen fuer die Sprachanalyse in einer eigenen React-Komponente

		intentGerman( aText: string ): void {
			this.intentService.text = aText;
			this.intentService.language = INTENT_DE_LANGUAGE;
			this.intentService.start();
		}
		
		intentEnglish( aText: string ): void {
			this.intentService.text = aText;
			this.intentService.language = INTENT_EN_LANGUAGE;
			this.intentService.start();
		}	

		intentStop() {
			this.intentService.stop();
		}
		
	  	render() {
	    	return (
	      		<div>
	      			<button onclick="intentGerman('Dies ist ein Testintent')">
	      				Intent starten
					</button>
	      			<button onclick="intentStop()">
	      				Intent stoppen
					</button>
	     		</div>
	    	);
	  	}
		
	}

