/**
 * GoogleModul zur Initialisierung von Google mit den Credentials
 *
 * API-Version: 1.0
 * Datum:       09.05.2019
 *
 * Letzte Aenderung: 09.05.2019
 * Status: rot
 *
 * @module speech/google
 * @author SB
 */


// speech-framework

import {
    Google
 } from 'speech-framework';


// google

import { GoogleModuleConfigInterface } from './google-module-config.interface';
import { GoogleModuleOptionInterface } from './google-module-option.interface';


/**
 * Klasse GoogleModul zur Initialisierung des Google Cloud-Services
 */

export class GoogleModule {


    // statische Klasse

    private constructor() {}


    /**
     * Hier wird Google initialsiert
     *
     * @param {GoogleModuleOptionInterface} aGoogleOption - Parameter fuer Google
     * @param {(boolean)=>void} aCallback - Rueckgabefunktion fuer Google-Flag
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlermeldungen
     */

    static init( aGoogleOption: GoogleModuleOptionInterface, aCallback?: (aGoogleFlag: boolean) => void, aErrorOutputFlag = false ): void {
        // Fehlerausgabe einstellen
        if ( aErrorOutputFlag ) {
            Google.setErrorOutputOn();
        } else {
            Google.setErrorOutputOff();
        }
        // pruefen auf Mock einschalten
        if ( aGoogleOption && aGoogleOption.googleMockFlag ) {
            aGoogleOption['googlePortName'] = 'GoogleMock';
        }
        // starten von Google
        let googleFlag = false;
        if ( Google.init( aGoogleOption ) === 0 ) {
            Google.open((aError: any, aPortName: string, aPortResult: number) => {
                if ( aError === null && aPortResult === 0 ) {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Google ist vorhanden');
                    }
                    googleFlag = true;
                } else {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Google ist nicht geoeffnet');
                    }
                }
                aCallback( googleFlag );
            });
        } else {
            if ( aErrorOutputFlag ) {
                console.log('===> Google ist nicht initialisiert');
            }
            aCallback( googleFlag );
        }
    }


    /**
     * Freigabe des Google-Moduls
     */

    static done() {
        Google.done();
    }


    /**
     * Eintragen neuer Google-Credentials, wenn Google mit danamischen Credetials initialsiert wurde
     *
     * @param aConfigData - neue Credentials fuer Google eintragen
     *
     * @return Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: GoogleModuleConfigInterface ): number {
        // console.log('GoogleModule.setConfig:', aConfigData);
        return Google.setConfig( aConfigData );
    }


    /**
     * Rueckgabe der eingetragenen Google-Credentials, wenn Google mit dynamischen Credetials initialsiert wurde
     *
     * @return aConfigData - neue Credentials fuer Google eintragen
     */

    static getConfig(): GoogleModuleConfigInterface {
        return Google.getConfig();
    }

}
