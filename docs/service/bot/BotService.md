# BotService

Der BotService dient zum Abspielen von Dialogzuständen, die in einem Speech.def Skript abgelegt sind. Die Dialogzustände werden durch die ReactApp gesetzt. Mit Hilfe der [Dialog-Definitionssprache](./DialogScript.md) lassen sich komplexe Dialoge definieren. Der BotService liefert Ereignisse an die ReactApp zurück. Der BotService erbt vom abstrakten [BaseService](./../base/BaseService.md).


## Architektur

In der folgenden Grafik werden die einzelnen Schichten, angefangen von der ReactApp, über den ServiceManager und den BotService von Speech-React, bis zur Bot-Komponente, Speak-Komponente und Action-Komponente des Speech-Frameworks, dargestellt. Die Bot-Komponente nutzt ihrerseits die Speak- und Action-Komponenten, um die Sprachausgabe und die Aktionsverarbeitung auszuführen. Auf diese Komponenten kann die ReactApp über den [SpeakService](./../speak/SpeakService.md) und den [ActionService](./../action/ActionService.md) auch direkt zugreifen.  


![BotService-Architektur](BotService-1.gif)


Die nächste Grafik zeigt die konkrete Vererbungsbeziehung zu BaseService, sowie die Einbindung von BotFactory und BotInterface aus dem Speech-Framework. BotFactory ist eine statische Klasse und erzeugt das Bot-Objekt zum BotInterface. 


![BotService-Struktur](BotService-2.gif)


## API

Der BotService definiert die öffentliche Schnittstelle von Speech-React für die Dialogausführung. Die folgende Grafik zeigt einen Überblick über die gesamte API des BotServices. Die API teilt sich auf in Objektfunktionen, Objektereignisse und Objekteigenschaften. Die API verfügt über eine auf Funktionen und eine auf Eigenschaften basierende Schnittstelle. Die gleiche Aufgabe kann über Funktionsaufrufe oder über das Setzen von Eigenschaften erledigt werden. Z.B. kann der Dialogname entweder mit botService.setDialog('TestDialog') oder mit botService.dialog = 'TestDialog' eingetragen werden, bevor mit botService.start() die Dialogausführung gestartet wird.

![BotService-API](BotService-3.gif)


## Importieren

Um den BotService importieren zu können, muss in der jeweiligen Komponente folgende Zeile eingefügt werden:

	import { SPEECH_BOT_SERVICE, ServiceManager, BotService } from 'speech-react'
	
Dazu müssen das Speech-Framework und das Speech-React npm-Paket in der gleichen Version vorher ins eigene ReactApp-Projekt kopiert und installiert worden sein.

	$ npm install speech-framework-<version>.tgz
	$ npm install speech-react-<version>.tgz
	 

## Konfiguration

Dier erste Aufgabe vor Nutzung des BotService besteht in der Festlegung der Konfiguration vor der Erzeugung des Services in React. In der Defaulteinstellung wird die init()-Funktion im Konstruktor aufgerufen und die voreingestellte Konfiguration übernommen. Will man die Defaultkonfiguration überschreiben, holt man sie sich mittels der Klassenfunktion BotService.getConfig(). Diese Funktion gibt das BotConfig-Objekt des BotServices zurück. 

Auszug aus der Datei: src/speech/bot/bot-service-config.ts:

	// hier sind die Defaultwerte des BotService festgelegt	
	export const BotServiceConfig: BotServiceOptionInterface = {
	    /** ein/ausschalten des Bot */
	    activeFlag: true,
	    /** ein/ausschalten der Sprachausgabe */
	    speakFlag: true,
	    /** ein/ausschalten der Aktionsverarbeitung */
	    actionFlag: true,
	    /** einzustellender Startdialog */
	    dialogName: 'main',
	    /** Startdialogzustand, wenn ein Dialog gestartet wird */
	    dialogRootState: 'home',
	    /** legt fest, ob ein Dialog direkt geladen wird */
	    dialogLoadFlag: true,
	    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien */
	    dialogFilePath: 'assets/',
	    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei */
	    dialogFileName: 'speech.def',
	    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
	    errorOutputFlag: false
	};


## Dialogdatei einlesen

Bevor ein Dialog ausgeführt werden kann, muss die zugehörige Dialogskiptdatei erstellt und eingelesen werden. Wie eine Dialogskriptdatei erstellt wird, kann [hier](./DialogScript.md) nachgelesen werden. Hier beschäftigen wir uns mit den verschiedenen Möglichkeiten, eine Dialogskriptdatei einzulesen. Die erste Möglichkeit ist, die Dialogskriptdatei bei der Initialisierung des BotService einzulesen. Dies ist in der Konfiguration defaultmäßig durch Setzen des dialogLoadFlag auf true eingestellt. Daneben müssen aber auch das Dialogverzeichnis und die Dialogdatei richtig gesetzt sein. Nimmt man hier nicht die Defaulteinstellungen von dialogFilePath = 'assets/' und dialogFileName = 'speech.def' so muss man die Parameter in der Konfiguration selbst setzen, wie unter dem Abschnitt Konfiguration weiter oben beschrieben. Will man das Dialogskript komplett selbst verwalten kann man den Parameter dialogLoadFlag in der Konfiguration auf false setzen und die Dialogskriptdatei mit der parseFile()-Funktion einlesen. Alternativ kann man das Dialogskript als String im Code einfügen und über die parse()-Funktion einlesen. Ist das Dialogskript erfolgreich eingelesen worden, wird ein parseEvent ausgelöst. Bei einem Fehler wird ein errorEvent ausgelöst.

Beispielkomponente zum manuellen Einlesen einer Dialogskriptdatei:
 
	import React from 'react';

	// BotService 
		
	import { SPEECH_BOT_SERVICE, ServiceManager, BotService } from 'speech-angular';

	
	export class BotComponent extends React.Component {
	
		botService: BotService = null;
		parseEvent = null;
		errorEvent = null;
	
		constructor() {
			this.botService = ServiceManager.get( SPEECH_BOT_SERVICE );
		}
		
		// Bot-Ereignisse eintragen
				
		componentDidMount() {
			this.parseEvent = botService.errorEvent.subscribe(aError => console.log('Dialogskript komplett eingelesen'));
			this.errorEvent = botService.errorEvent.subscribe(aError => console.log('Fehler:', aError.message));
		}

		// Bot-Ereignisse freigeben
		
		componentWillUnmount() {
			this.parseEvent.unsubscribe();
			this.errorEvent.unsubscribe();
		}

		// eigene Funktionen fuer das parsen eines Dialogskriptes in einer eigenen React-Komponente

		parse() {
			// wird kein eigener Dateiname als optionaler Parameter uebergeben, wird der Defaultname verwendet
			this.botService.parseFile();
		}
		
	  	render() {
	    	return (
	      		<div>
	      			<button onclick="parse()">
	      				Parsen starten
					</button>
	     		</div>
	    	);
	  	}

	}


## Dialog ausführen

Um einen Dialog auszuführen zu können, müssen zuerst der DialogName und dann der StatusName gesetzt werden.
Diese Namen müssen mit Namen aus dem aktuell eingelesenem Dialogskript übereinstimmen. Wird der Dialog gestartet, wird ein startEvent ausgelöst, wird der Dialog beendet wird ein stopEvent ausgelöst. Für jede Aktion und jede Sprachausgabe werden ebenfalls entsprechende Ereignisse ausgelöst.

Beispiel-Komponente für das ausführen eines Dialogs:


	import React from 'react';

	// BotService 
		
	import { SPEECH_BOT_SERVICE, ServiceManager, BotService } from 'speech-angular';


	export class BotComponent extends React.Component {
	
		botService: BotService = null;
		startEvent = null;
		stopEvent = null;
		errorEvent = null;
	
		constructor() {
			this.botService = ServiceManager.get( SPEECH_BOT_SERVICE );
		}
		
		// Bot-Ereignisse eintragen
				
		componentDidMount() {
			this.startEvent = botService.startEvent.subscribe(() => console.log('Dialog gestartet'));
			this.stopEvent = botService.stopEvent.subscribe(() => console.log('Dialog beendet'));
			this.errorEvent = botService.errorEvent.subscribe(aError => console.log('Dialog Fehler:', aError.message));
		}

		// Bot-Ereignisse freigeben
		
		componentWillUnmount() {
			this.startEvent.unsubscribe();
			this.stopEvent.unsubscribe();
			this.errorEvent.unsubscribe();
		}

		// eigene Funktionen fuer die Dialogausfuehrung in einer eigenen React-Komponente

		dialog( aDialog: string, aState: string ) {
			this.botService.dialog = aDialog;
			this.botService.state = aState;
			this.botService.start();
		}
		
		dialogStop() {
			this.botService.stop();
		}

	  	render() {
	    	return (
	      		<div>
	      			<button onclick="dialog('Main', 'root')">
	      				Dialog starten
					</button>
	      			<button onclick="dialogStop()">
	      				Dialog stoppen
					</button>
	     		</div>
	    	);
	  	}

	}


## Sprachausgabe ein/ausschalten

Möchte man einen Dialog ohne Sprachausgabe ausführen, kann man die Sprachausgabe für den Bot ausschalten. Dies kann sowohl in der Konfiguration über den Parameter speakFlag gesetzt werden oder über die Speak-Funktionen/Eigenschaft.

	// Sprachausgabe einschalten per Funktion
	botService.setSpeakOn();
	// oder per Eigenschaft
	botService.speak = true;
	
	// Sprachausgabe ausschalten per Funktion
	botService.setSpeakOff();
	// oder per Eigenschaft
	botService.speak = false;
	
	// Abfrage auf Sprachausgabe per Funktion
	if ( botService.isSpeak()) { ... }
	// oder per Eigenschaft
	if ( botService.speak ) { ... }


## Aktionsverarbeitung ein/ausschalten

Möchte man einen Dialog ohne Aktionsverarbeitung ausführen, kann man die Aktionsverarbeitung für den Bot ausschalten. Dies kann sowohl in der Konfiguration über den Parameter actionFlag gesetzt werden oder über die Action-Funktionen/Eigenschaft.

	// Aktionsverarbeitung einschalten per Funktion
	botService.setActionOn();
	// oder per Eigenschaft
	botService.action = true;
	
	// Aktionsverarbeitung ausschalten per Funktion
	botService.setActionOff();
	// oder per Eigenschaft
	botService.action = false;
	
	// Abfrage auf Aktionsverarbeitung per Funktion
	if ( botService.isAction()) { ... }
	// oder per Eigenschaft
	if ( botService.action ) { ... }
