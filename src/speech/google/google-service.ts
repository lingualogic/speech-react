/** @packageDocumentation
 * GoogleService zur Aenderung der Credentials
 *
 * API-Version: 1.3
 * Datum:       20.06.2020
 *
 * Letzte Aenderung: 20.06.2020
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
     * @param aDialogflowEnvironmentName - (optional) DialogFlow EnvironmentName
     * @param aDialogflowSessionId - (optional) DialogFlow Session-ID
     */

    setCredentials(
        aAppKey: string,
        aServerUrl: string,
        aDialogflowTokenServerUrl: string,
        aDialogflowProjectId: string,
        aDialogflowEnvironmentName = '',
        aDialogflowSessionId = ''
    ): number {
        const configData: GoogleModuleConfigInterface = {
            googleAppKey: aAppKey,
            googleServerUrl: aServerUrl,
            dialogflowTokenServerUrl: aDialogflowTokenServerUrl,
            dialogflowProjectId: aDialogflowProjectId,
            dialogflowSessionId: aDialogflowSessionId,
            dialogflowEnvironmentName: aDialogflowEnvironmentName
        };
        // console.log('GoogleService.setCredentials:', configData);
        return GoogleModule.setConfig( configData );
    }

}
