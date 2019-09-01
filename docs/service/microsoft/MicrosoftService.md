# MicrosoftService

Der MicrosoftService dient zur dynamischen Änderung der Microsoft-Credentials. damit wird es möglich Microsoft-Credentials über ein Formular einzugeben und dann erst einzutragen.


## MicrosoftService-API

Der Microsoft-Service hat nur eine Funktion:

	const result = microsoftService.setCredentials( region, subscriptionKey, [luisEndpoint] ): number;
	
mit der die Region, der SubscriptionKey und optional der Luis Endpunkt jeweils als Strings übergeben und als neue Microsoft-Credentials im MicrosoftModule eingetragen werden.
 


