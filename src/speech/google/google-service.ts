/**
 * GoogleService zur Aenderung der Credentials
 *
 * API-Version: 1.1
 * Datum:       17.12.2019
 *
 * Letzte Aenderung: 17.12.2019
 * Status: rot
 *
 * @module speech/google
 * @author SB
 */


// extern




// google

import { GoogleModule } from './google-module';
import { GoogleModuleConfigInterface } from './google-module-config.interface';



export class GoogleService {


    /**
     * Dummy-Initfunktion fuer Service-Manager
     *
     * @param aOption
     */

    init( aOption: any ): number {
        return 0;
    }


    /**
     * Uebergabe der Google-Credentials
     *
     * @param aAppKey - Google 
     * @param aServerUrl - Google Server/Tokenserver URL
     * @param aDialogflowTokenserverUrl - Dialogflow Tokenserver URL fuer Dialogflow V2
     * @param aDialogflowProjectId - DialogFlow Projektname
     */

    setCredentials( aAppKey: string, aServerUrl: string, aDialogflowTokenServerUrl: string, aDialogflowProjectId: string ): number {
        const configData: GoogleModuleConfigInterface = {
            googleAppKey: aAppKey,
            googleServerUrl: aServerUrl,
            dialogflowTokenServerUrl: aDialogflowTokenServerUrl,
            dialogflowProjectId: aDialogflowProjectId
        };
        console.log('GoogleService.setCredentials:', configData);
        return GoogleModule.setConfig( configData );
    }

}
