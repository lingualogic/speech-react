/**
 * RasaService zur Aenderung der Credentials
 *
 * API-Version: 1.0
 * Datum:       11.07.2019
 *
 * Letzte Aenderung: 11.07.2019
 * Status: rot
 *
 * @module speech/rasa
 * @author SB
 */


// extern




// rasa

import { RasaModule } from './rasa-module';
import { RasaModuleConfigInterface } from './rasa-module-config.interface';



export class RasaService {


    /**
     * Dummy-Initfunktion fuer Service-Manager
     *
     * @param aOption
     */

    init( aOption: any ): number {
        return 0;
    }


    /**
     * Uebergabe der Rasa-Credentials
     *
     * @param aAppKey - Rasa AppKey
     */

    setCredentials( aAppKey: string ): number {
        const configData: RasaModuleConfigInterface = {
            rasaAppKey: aAppKey
        };
        console.log('RasaService.setCredentials:', configData);
        return RasaModule.setConfig( configData );
    }

}
