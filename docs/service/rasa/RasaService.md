# RasaService

Der RasaService dient zur dynamischen Änderung der Rasa-Credentials. damit wird es möglich Rasa-Credentials über ein Formular einzugeben und dann erst einzutragen.


## RasaService-API

Der Rasa-Service hat nur eine Funktion:

	const result = rasaService.setCredentials( appKey ): number;

mit der der AppKey als Strings übergeben und als neue Rasa-Credentials im RasaModule eingetragen wird.
