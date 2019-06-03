# Speech-React

Speech-React ist eine React Typescript-Bibliothek zur Integration von Sprachdiensten, wie Sprachausgabe (TTS), Spracherkennung (ASR), Sprachverstehen (NLU), Dialogverarbeitung (NLP) und Aktionsausführung in einer React Web-Seite oder Web-App. Kern von Speech-React ist ein **BotService**, der Dialoge eines Dialogskripts ausführen kann.

Daneben git es folgende einzeln verwendbare Dienste: 

* **SpeakService** für die Sprachausgabe
* **ListenService** für die Spracherennung
* **IntentService** für das Sprachverstehen
* **ActionService** für die Aktionserzeugung
* **DialogService** für die Dialogausführung


In Speech-React können für die Sprachausgabe (TTS) und das Sprachverstehen (NLU) auch Clouddienste verwendet werden. Dazu wird ein eigener Account des jeweiligen Cloud-Dienstes benötigt.


## Speech-Framework

Die Speech-React Bibliothek benötigt das Speech-Framework, welches unter [https://github.com/lingualogic/speech-framework](https://github.com/lingualogic/speech-framework) in Github zu finden ist.

Um in eigenen Projekten Speech-React nutzen zu können, muss das Speech-Framework NPM-Package von der [LinguaLogic-Seite](https://lingualogic.de) heruntergeladen werden, in den eigenen Projektordner kopiert werden und vor Speech-React installiert sein. Das Speech-Framework NPM-Package wird mit folgendem Befehl installiert:

    $ npm install speech-framework-0.5.10.tgz


## Letzte Version

* 0.5.10.0001 Alpha vom 02.06.2019 [Release Notizen](./CHANGELOG.md)

Speech-React ist noch in einem frühen Entwicklungsstadium und sollte noch nicht für den produktiven Einsatz verwendet werden.
Wir empfehlen für neue React-Projekte die Verwendung von Typescript, ansonsten kann Speech-React auch mit JavaScript verwendet werden.


## Voraussetzungen

Wir haben Speech-React auf Mac OS X 10.11, Mac OS X 10.13, Win 10 und Ubuntu 18.04 getestet. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.9
* Windows >= 7
* aktuelles Linux (z.B. Ubuntu 18.04)

Es wird die aktuellste React-Version empfohlen

* React >= 16.x


Grundsätzlich ist das Speech-React SDK in Chrome, Firefox, Opera, Safari und Edge nutzbar, allerdings hängt die Sprachausgabe unter diesen Browsern von der zugrunde liegenden Text-to-Speech Engine der jeweiligen Plattformen ab. Die Spracheingabe funktioniert bisher nur in Chrome.

* Chrome >= 71   Windows/Linux/MacOS (Html5: TTS, ASR)(Amazon: TTS, Google: NLU)
* Firefox >= 64  Windows/Linux/MacOS (Html5: TTS)(Amazon: TTS, Google: NLU)
* Opera >= 58    Windows/MacOS (Html5: TTS)(Amazon: TTS, Google: NLU) Linux (kein Html5)
* Safari >= 12   MacOS/iOS (Html5: TTS)(Amazon: TTS, Google: NLU)
* Edge >= 42     Windows (Html5: TTS)(Amazon: TTS, Google: NLU)


NodeJS muss installiert sein.

* NodeJS >= 10.X (LTS-Version)

Als weitere Plattformen können Android und iOS mit Cordova verwendet werden:

* Cordova >= 8 für Android  >= 5.1 und iOS >= 10

Für Cordova müssen weitere Programme zur Entwicklung von Android- und iOS-Apps installiert werden.
Informationen hierzu finden sich unter [docs/platform/Cordova.md](./docs/platform/Cordova.md).

Will man den Clouddienst verwenden, muss ein eigener Account eingerichtet werden und die Cloud-Komponente des Speech-Frameworks separat in die eigene App eingebunden werden. Wie man dies macht, findet man unter [docs/cloud/Cloud.md](./docs/cloud/Cloud.md)


## Installation

Zuerst muss das Speech-React Github-Repsitory unter [https://github.com/lingualogic/speech-react](https://github.com/lingualogic/speech-react) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech-react
    $ cd speech-react

danach werden alle NPM-Pakete für Speech-React mit folgendem Befehl installiert:

    $ npm install

anschließend kann man optional die Unit-Tests von Speech-React starten:

    $ npm test

zum Schluß wird das NPM-Paket für Speech-React im dist/ Ordner erzeugt:

    $ npm run build

Die API-Dokumentation kann mit folgenden Befehl in docs/api erzeugt werden:

    $ npm run docs

Das im dist/ Ordner erzeugte npm-Paket 'speech-react-0.5.10.tgz' kann in den eigenen React Projektordner kopiert werden.

Die Installation des 'speech-react-0.5.10.tgz' npm-Paketes erfolgt im eigenen React Projektordner mit folgendem Befehl:

    $ npm install speech-react-0.5.10.tgz

Danach kann Speech-React im eigenen React-Projekt verwendet werden. 

Alternativ kann das fertige Speech-React npm-Paket auch von der [LinguaLogic-Webseite](https://lingualogic.de) heruntergeladen werden.


## Deinstallation

Speech-React kann mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall speech-react


## Bekannte Probleme

* Unter Chrome in iOS funktioniert die Spracheingabe nicht


## Dokumentation

[**Architektur**](./docs/design/Design.md)

[**Services**](./docs/service/Service.md)

[**Cloud-Dienste**](./docs/cloud/Cloud.md)

[**Plattformen**](./docs/platform/README.md)

[**API-Referenz**](https://lingualogic.de/speech-react/docs/latest/api)

[**Roadmap**](./docs/roadmap/README.md)

[**Release Notizen**](./CHANGELOG.md)


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation: **Leo Füchsel** (leo@lingualogic.de)

Technische Entwicklung: **Stefan Brauer** (stefan@lingualogic.de)


## Mitwirkende


## In Projekten verwendet


-------------------

## Lizenz

Speech-React wurde als Open Source unter der [MIT-Lizenz](./docs/LICENSE.md) veröffentlicht.
