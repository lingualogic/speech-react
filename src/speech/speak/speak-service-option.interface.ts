/** @packageDocumentation
 * SpeakServiceOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * @module speech/speak
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './../base/base-service-option.interface';


/** @export
 * SpeakServiceOption Schnittstelle fuer optionale Konfigurationsparameter des SpeakService bei der Initialisierung
 */

export interface SpeakServiceOptionInterface extends BaseServiceOptionInterface {
    /** setzt die Sprache fuer die Sprachausgabe ( 'de', 'en' )*/
    speakLanguage?: string;
    /** Audioformat 'mp3' oder 'wav' */
    audioFormat?: string;
    /** lokales Verzeichnis, in dem die Audiodateien liegen, z.B. 'assets/speech/audio' */
    audioFilePath?: string;
    /** True, wenn Audiodateien abgespielt werden sollen, anstelle der Sprachsynthese */
    audioFlag?: boolean;
}

