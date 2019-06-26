/**
 * MicrosoftService zur Aenderung der Credentials
 *
 * API-Version: 1.0
 * Datum:       20.06.2019
 *
 * Letzte Aenderung: 20.06.2019
 * Status: rot
 *
 * @module speech/microsoft
 * @author SB
 */


 // extern
 



// microsoft

import { MicrosoftModule } from './microsoft-module';
import { MicrosoftModuleConfigInterface } from './microsoft-module-config.interface';



export class MicrosoftService {


    /**
     * Dummy-Initfunktion fuer Service-Manager
     *
     * @param aOption
     */

    init( aOption: any ): number {
        return 0;
    }


    /**
     * Uebergabe der Microsoft-Credentials
     *
     * @param aRegion - Microsoft Region
     * @param aSubscriptionKey - Microsoft Credentials
     */

    setCredentials( aRegion: string, aSubscriptionKey: string ): number {
        const configData: MicrosoftModuleConfigInterface = {
            microsoftRegion: aRegion,
            microsoftSubscriptionKey: aSubscriptionKey
        };
        console.log('MicrosoftService.setCredentials:', configData);
        return MicrosoftModule.setConfig( configData );
    }

}
