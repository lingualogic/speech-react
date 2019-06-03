# AmazonModule

Das AmazonModule dient zur Initialisierung des AmazonPorts zur Verbindung mit dem Amazon Cloud-Server.
Es ist eine Singleton in Form einer statischen Klasse und wird in main.ts eingegbaut.
Hier ist der gesamte Quelltext von AmazonModule untergebracht.


## AmazonModule API

Das AmazonModule API besteht aus folgenden Dateien:

* **amazon-module-config.interface.ts:** Konfigurationsparameter zum Unkonfigurieren von AmazonModule
* **amazon-module-option.interface.ts:** Optionale Parameter zur Initialisierung von AmazonModule
* **amazon-module.ts:** AmazonModule API und Wrapper für die speech-framework.Amazon Komponente
* **amazon-service.ts:** AmazonService zum dynamischen Setzen der Amazon-Credentials
