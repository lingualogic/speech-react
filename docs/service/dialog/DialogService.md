# DialogService

Der DialogService dient zum Abspielen von Dialogzuständen, die in einem Speech.def Skript abgelegt sind. Die Dialogzustände werden durch die ReactApp gesetzt. Mit Hilfe der [Dialog-Definitionssprache](./DialogScript.md) lassen sich komplexe Dialoge definieren. Der DialogService liefert Ereignisse an die ReactApp zurück. Der DialogService erbt vom abstrakten [BaseService](./../base/BaseService.md).


## Architektur

In der folgenden Grafik werden die einzelnen Schichten, angefangen von der ReactApp, über den ServiceManager und den DialogService von Speech-React, bis zur Dialog-Komponente des Speech-Frameworks, dargestellt.

![DialogService-Architektur](DialogService-1.gif)


Die nächste Grafik zeigt die konkrete Vererbungsbeziehung zu BaseService, sowie die Einbindung von DialogFactory und DialogInterface aus dem Speech-Framework. DialogFactory ist eine statische Klasse und erzeugt das Dialog-Objekt zum DialogInterface. 


![DialogService-Struktur](DialogService-2.gif)


## API

Der DialogService definiert die öffentliche Schnittstelle von Speech-React für die Dialogausführung. Die folgende Grafik zeigt einen Überblick über die gesamte API des DialogServices. Die API teilt sich auf in Objektfunktionen, Objektereignisse und Objekteigenschaften. Die API verfügt über eine auf Funktionen und eine auf Eigenschaften basierende Schnittstelle. Die gleiche Aufgabe kann über Funktionsaufrufe oder über das Setzen von Eigenschaften erledigt werden. Z.B. kann der Dialogname entweder mit dialogService.setDialog('TestDialog') oder mit dialogService.dialog = 'TestDialog' eingetragen werden, bevor mit dialogService.start() die Dialogausführung gestartet wird.

![DialogService-API](DialogService-3.gif)


## Importieren

Um den DialogService importieren zu können, muss in der jeweiligen Komponente folgende Zeile eingefügt werden:

	import { SPEECH_DIALOG_SERVICE, ServiceManager, DialogService } from 'speech-react'
	
Dazu müssen das Speech-Framework und das Speech-React npm-Paket in der gleichen Version vorher ins eigene reactApp-Projekt kopiert und installiert worden sein.

	$ npm install speech-framework-<version>.tgz
	$ npm install speech-react-<version>.tgz
	 

## Konfiguration

Dier erste Aufgabe vor Nutzung des DialogService besteht in der Festlegung der Konfiguration vor der Erzeugung des Services in React. In der Defaulteinstellung wird die init()-Funktion im Konstruktor aufgerufen und die voreingestellte Konfiguration übernommen. Will man die Defaultkonfiguration überschreiben, holt man sie sich mittels der Klassenfunktion DialogService.getConfig(). Diese Funktion gibt das DialogConfig-Objekt des DialogServices zurück. 

Auszug aus der Datei: src/speech/dialog/dialog-service-config.ts:

	// hier sind die Defaultwerte des DialogService festgelegt	
	export const DialogServiceConfig: DialogServiceOptionInterface = {
	    /** ein/ausschalten des Dialogs */
	    activeFlag: true,
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

Bevor ein Dialog ausgeführt werden kann, muss die zugehörige Dialogskiptdatei erstellt und eingelesen werden. Wie eine Dialogskriptdatei erstellt wird, kann [hier](./DialogScript.md) nachgelesen werden. Hier beschäftigen wir uns mit den verschiedenen Möglichkeiten, eine Dialogskriptdatei einzulesen. Die erste Möglichkeit ist, die Dialogskriptdatei bei der Initialisierung des DialogService einzulesen. Dies ist in der Konfiguration defaultmäßig durch Setzen des dialogLoadFlag auf true eingestellt. Daneben müssen aber auch das Dialogverzeichnis und die Dialogdatei richtig gesetzt sein. Nimmt man hier nicht die Defaulteinstellungen von dialogFilePath = 'assets/' und dialogFileName = 'speech.def' so muss man die Parameter in der Konfiguration selbst setzen, wie unter dem Abschnitt Konfiguration weiter oben beschrieben. Will man das Dialogskript komplett selbst verwalten kann man den Parameter dialogLoadFlag in der Konfiguration auf false setzen und die Dialogskriptdatei mit der parseFile()-Funktion einlesen. Alternativ kann das Dialogskript als String im Code eingefügt und über die parse()-Funktion einlesen werden. Ist das Dialogskript erfolgreich eingelesen worden, wird ein parseEvent ausgelöst. Bei einem Fehler wird ein errorEvent ausgelöst.

Beispielkomponente zum manuellen Einlesen einer Dialogskriptdatei:
 
	import React from 'react';
	
	// DialogService 
		
	import { SPEECH_DIALOG_SERVICE, ServiceManager, DialogService } from 'speech-react';

	
	export class DialogComponent extends React.Component {
	
		dialogService: DialogService = null;
		parseEvent = null;
		errorEvent = null;
	
		constructor() {
			this.dialogService = ServiceManager.get( SPEECH_DIALOG_SERVICE );
		}
		
		// Dialog-Ereignisse eintragen
				
		componentDidMount() {
			this.parseEvent = dialogService.errorEvent.subscribe(aError => console.log('Dialogskript komplett eingelesen'));
			this.errorEvent = dialogService.errorEvent.subscribe(aError => console.log('Fehler:', aError.message));
		}

		// Dialog-Ereignisse freigeben
		
		componentWillUnmount() {
			this.parseEvent.unsubscribe();
			this.errorEvent.unsubscribe();
		}

		// eigene Funktionen fuer das parsen eines Dialogskriptes in einer eigenen React-Komponente

		parse() {
			// wird kein eigener Dateiname als optionaler Parameter uebergeben, wird der Defaultname verwendet
			this.dialogService.parseFile();
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

	// DialogService 
		
	import { SPEECH_DIALOG_SERVICE, ServiceManager, DialogService } from 'speech-react';

	
	export class DialogComponent extends React.Component {
	
		dialogService: DialogService = null;
		startEvent = null;
		stopEvent = null;
		errorEvent = null;
	
		constructor() {
			this.dialogService = ServiceManager.get( SPEECH_DIALOG_SERVICE );
		}
		
		// Dialog-Ereignisse eintragen
				
		componentDidMount() {
			this.startEvent = dialogService.startEvent.subscribe(() => console.log('Dialog gestartet'));
			this.stopEvent = dialogService.stopEvent.subscribe(() => console.log('Dialog beendet'));
			this.errorEvent = dialogService.errorEvent.subscribe(aError => console.log('Dialog Fehler:', aError.message));
		}

		// Dialog-Ereignisse freigeben
		
		componentWillUnmount() {
			this.startEvent.unsubscribe();
			this.stopEvent.unsubscribe();
			this.errorEvent.unsubscribe();
		}

		// eigene Funktionen fuer die Dialogausfuehrung in einer eigenen React-Komponente

		dialog( aDialog: string, aState: string ) {
			this.dialogService.dialog = aDialog;
			this.dialogService.state = aState;
			this.dialogService.start();
		}
		
		dialogStop() {
			this.dialogService.stop();
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
