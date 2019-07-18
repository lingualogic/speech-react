# RasaModule

Das RasaModule dient zur Initialisierung des RasaPorts zur Verbindung mit dem Rasa-Server.
Es ist eine Singleton in Form einer statischen Klasse und wird in main.ts eingegbaut.
Hier ist der gesamte Quelltext von GoogleModule untergebracht.


## RasaModule API

Das GoogleModule API besteht aus folgenden Dateien:

* **rasa-module-config.interface.ts:** Konfigurationsparameter zum Unkonfigurieren von RasaModule
* **rasa-module-option.interface.ts:** Optionale Parameter zur Initialisierung von RasaModule
* **rasa-module.ts:** RasaModule API und Wrapper für die speech-framework.Rasa Komponente
* **rasa-service.ts:** RasaService zum dynamischen Setzen der Rasa-Credentials
