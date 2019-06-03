/**
 * AmazonService zur Aenderung der Credentials
 *
 * API-Version: 1.1
 * Datum:       24.05.2019
 *
 * Letzte Aenderung: 24.05.2019
 * Status: rot
 *
 * @module speech/amazon
 * @author SB
 */


 // extern
 



// amazon

import { AmazonModule } from './amazon-module';
import { AmazonModuleConfigInterface } from './amazon-module-config.interface';



export class AmazonService {

    
    /**
     * Dummy-Initfunktion fuer Service-Manager
     *
     * @param aOption
     */

    init( aOption: any ): number {
        return 0;
    }


    /**
     * Uebergabe der Amazon-Credentials
     *
     * @param aRegion - Amazon Region
     * @param aIdentityPoolId - Amazon Credentials
     */

    setCredentials( aRegion: string, aIdentityPoolId: string ): number {
        const configData: AmazonModuleConfigInterface = {
            amazonRegion: aRegion,
            amazonIdentityPoolId: aIdentityPoolId
        };
        console.log('AmazonService.setCredentials:', configData);
        return AmazonModule.setConfig( configData );
    }

}
