# AmazonService

Der AmazonService dient zur dynamischen Änderung der Amazon-Credentials. damit wird es möglich Amazon-Credentials über ein Formular einzugeben und dann erst einzutragen.

## AmazonService-API

Der Amazon-Service hat nur eine Funktion:

	const result = amazonService.setCredentials( region, identityPoolId ): number;
	
mit der die Region und die IdentityPollId jeweils als Strings übergeben und als neue Amazon-Credentials im AmazonModule eingetragen werden. 


