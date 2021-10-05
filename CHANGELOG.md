# Speech-React Release Notizen


## 0.5.23.0016 Release (05.10.2021)

### Fix

Importprobleme mit Interface-Dateien beseitigt.
Aktualisierung aller NPM-Packages.
Aktualisierung auf React 17.


## 0.5.22.0015 Release (31.08.2020)

### Fix

Fehlerbeseitigung in Google Cloud-Dienst, Speak, Listen und Intent.


## 0.5.21.14 Release (26.06.2020)

### Features

* **Listen:** Ausbau von Listen, um den NoMatch-Event zu senden.
* **Google:** In Google Dialogflow wurden Session-Id und EventName eingebaut, um
              die Versionierung des Sprachmodells und parallele Sessions verschiedener
              Nutzer zuzulassen.


## 0.5.20.0013 Release (17.05.2020)

### Features

* **Google:** In Google kann zwischen verschiedenen Servern über setConfig umgeschaltet werden.

### Fix

* **Gulp:** Umstellung auf Gulp4, um kompatibel zu Node12 zu sein.


## 0.5.19.0012 Release (11.04.2020)

### Features

* **Listen:** Einbau eines Dicate-Mode in die HTML5-ASR für das Diktieren von Texten (nur Chrome-Browser).
              Einbau von Mkrofon-Events in Listen zur Anzeige, wann das Mikrofon an und aus geht.


## 0.5.18.0011 Release (28.03.2020)

### Features

* **Google:** Vollständige Einbindung von Dialogflow V2 in den CloudPort von Google, einschließlich Spracheingabe und Sprachausgabe.

### Fix

* **Google:** Fehlerkorrektur in der Google-Komponente, um den Stop-Event in ASR und TTS zu erzeugen.


## 0.5.17.0010 Release (16.02.2020)

### Features

* **Google:** Erweiterung der Google-Komponente um ASR mit Verbindung zum Google Token-Server.


## 0.5.16.0009 Beta (17.12.2019)

### Features

* **Google:** Erweiterung der Google-Komponente um TTS mit Verbindung zum Google Token-Server.


## 0.5.15.0008 Beta (19.10.2019)

### Features

* **Dialog:** Erweiterung der Dialog-Komponente um das Einlesen von JSON-Daten anstelle einer Def-Datei.
* **Google:** Erweiterung der Google-Komponente um Dialogflow Version 2.


## 0.5.14.0007 Beta (31.08.2019)

### Features

* **Microsoft:** der Microsoft Cloud-Dienst (LUIS) für die NLU wurde eingebaut, um Microsofts NLU für die Sprachanalyse verwenden zu können


## 0.5.13.0006 Alpha (10.08.2019)

### Fix

kleinere Korrekturen


## 0.5.13.0004 Alpha (23.07.2019)

### Features

* **Examples:** Beispiele für Speak und Listen eingefügt
* **Rasa:** due URL des Rasa-Servers wird jetzt in den rasa-credentials mit eingetragen


## 0.5.13.0004 Alpha (18.07.2019)

### Features

* **Rasa:** der Rasa Cloud-Dienst für die NLU wurde eingebaut, um einen eigenen Rasa-Server nutzen zu können


## 0.5.12.0003 Alpha (08.07.2019)

### Features

* **Microsoft:** der Microsoft Cloud-Dienst für die TTS wurde eingebaut, um Microsofts TTS für die Sprachsynthese verwenden zu können


## 0.5.11.0002 Alpha (25.06.2019)

### Features

* **Microsoft:** der Microsoft Cloud-Dienst für die ASR wurde eingebaut, um Microsofts ASR für die Spracherkennung verwenden zu können


## 0.5.10.0001 Alpha (02.06.2019)

### Features

Erstveröffentlichung der Speech-React-Version.


