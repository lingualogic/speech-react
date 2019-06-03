/**
 * ListenServiceOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.10.2018
 *
 * @module speech/listen
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './../base/base-service-option.interface';


/** @export
 * ListenServiceOption Schnittstelle fuer optionale Konfigurationsparameter des ListenService bei der Initialisierung
 */

export interface ListenServiceOptionInterface extends BaseServiceOptionInterface {
    /** setzt die Sprache fuer die Sprachausgabe ( 'de', 'en' )*/
    listenLanguage?: string;
}

