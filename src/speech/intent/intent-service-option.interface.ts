/** @packageDocumentation
 * IntentServiceOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       28.11.2018
 *
 * @module speech/intent
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './../base/base-service-option.interface';


/** @export
 * IntentServiceOption Schnittstelle fuer optionale Konfigurationsparameter des IntentService bei der Initialisierung
 */

export interface IntentServiceOptionInterface extends BaseServiceOptionInterface {
    /** setzt die Sprache fuer die Sprachanalyse ( 'de', 'en' )*/
    intentLanguage?: string;
}

