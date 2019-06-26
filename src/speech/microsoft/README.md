# MicrosoftModule

Das MicrosoftModule dient zur Initialisierung des MicrosoftPorts zur Verbindung mit dem Microsoft Cloud-Server.
Es ist eine Singleton in Form einer statischen Klasse und wird in main.ts eingegbaut.
Hier ist der gesamte Quelltext von MicrosoftModule untergebracht.


## MicrosoftModule API

Das MicrosoftModule API besteht aus folgenden Dateien:

* **microsoft-module-config.interface.ts:** Konfigurationsparameter zum Unkonfigurieren von MicrosoftModule
* **microsoft-module-option.interface.ts:** Optionale Parameter zur Initialisierung von MicrosoftModule
* **microsoft-module.ts:** Module API und Wrapper für die speech-framework.Microsoft Komponente
* **microsoft-service.ts:** Service zum dynamischen Setzen der Microsoft-Credentials
