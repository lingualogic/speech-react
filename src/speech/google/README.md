# GoogleModule

Das GoogleModule dient zur Initialisierung des GooglePorts zur Verbindung mit dem Google Cloud-Server.
Es ist eine Singleton in Form einer statischen Klasse und wird in main.ts eingegbaut.
Hier ist der gesamte Quelltext von GoogleModule untergebracht.


## GoogleModule API

Das GoogleModule API besteht aus folgenden Dateien:

* **google-module-config.interface.ts:** Konfigurationsparameter zum Unkonfigurieren von GoogleModule
* **google-module-option.interface.ts:** Optionale Parameter zur Initialisierung von GoogleModule
* **google-module.ts:** GoogleModule API und Wrapper für die speech-framework.Google Komponente
* **google-service.ts:** GoogleService zum dynamischen Setzen der Google-Credentials
