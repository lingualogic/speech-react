/**
 * RasaModul zur Initialisierung von Rasa mit den Credentials
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


// speech-framework

import {
    Rasa
 } from 'speech-framework';


// rasa

import { RasaModuleConfigInterface } from './rasa-module-config.interface';
import { RasaModuleOptionInterface } from './rasa-module-option.interface';


/**
 * Klasse RasaModul zur Initialisierung des Rasa Cloud-Services
 */

export class RasaModule {


    // statische Klasse

    private constructor() {}


    /**
     * Hier wird Rasa initialsiert
     *
     * @param {RasaModuleOptionInterface} aRasaOption - Parameter fuer Rasa
     * @param {(boolean)=>void} aCallback - Rueckgabefunktion fuer Rasa-Flag
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlermeldungen
     */

    static init( aRasaOption: RasaModuleOptionInterface, aCallback?: (aRasaFlag: boolean) => void, aErrorOutputFlag = false ): void {
        // Fehlerausgabe einstellen
        if ( aErrorOutputFlag ) {
            Rasa.setErrorOutputOn();
        } else {
            Rasa.setErrorOutputOff();
        }
        // pruefen auf Mock einschalten
        if ( aRasaOption && aRasaOption.rasaMockFlag ) {
            aRasaOption['rasaPortName'] = 'RasaMock';
        }
        // starten von Rasa
        let rasaFlag = false;
        if ( Rasa.init( aRasaOption ) === 0 ) {
            Rasa.open((aError: any, aPortName: string, aPortResult: number) => {
                if ( aError === null && aPortResult === 0 ) {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Rasa ist vorhanden');
                    }
                    rasaFlag = true;
                } else {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Rasa ist nicht geoeffnet');
                    }
                }
                aCallback( rasaFlag );
            });
        } else {
            if ( aErrorOutputFlag ) {
                console.log('===> Rasa ist nicht initialisiert');
            }
            aCallback( rasaFlag );
        }
    }


    /**
     * Freigabe des Rasa-Moduls
     */

    static done() {
        Rasa.done();
    }


    /**
     * Eintragen neuer Rasa-Credentials, wenn Rasa mit danamischen Credetials initialsiert wurde
     *
     * @param aConfigData - neue Credentials fuer Rasa eintragen
     *
     * @return Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: RasaModuleConfigInterface ): number {
        // console.log('RasaModule.setConfig:', aConfigData);
        return Rasa.setConfig( aConfigData );
    }


    /**
     * Rueckgabe der eingetragenen Rasa-Credentials, wenn Rasa mit dynamischen Credetials initialsiert wurde
     *
     * @return aConfigData - neue Credentials fuer Rasa eintragen
     */

    static getConfig(): RasaModuleConfigInterface {
        return Rasa.getConfig();
    }

}
