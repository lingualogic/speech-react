# GoogleService

Der GoogleService dient zur dynamischen Änderung der Google-Credentials. damit wird es möglich Google-Credentials über ein Formular einzugeben und dann erst einzutragen.

## GoogleService-API

Der Google-Service hat nur eine Funktion:

	const result = googleService.setCredentials( appKey ): number;

mit der der AppKey als Strings übergeben und als neue Google-Credentials im GoogleModule eingetragen wird.
