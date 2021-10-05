/** @packageDocumentation
 * SpeakService Konfiguration, wird in SpeakService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * @module speech/speak
 * @author SB
 */


// speak

import { SpeakServiceOptionInterface } from './speak-service-option.interface';


/** @export
 * SpeakService Konfiguration, um Speak anzupassen
 */

export const SpeakServiceConfig: SpeakServiceOptionInterface = {
    /** ein/ausschalten der Speak-Komponente */
    activeFlag: true,
    /** setzt die Sprache fuer die Sprachausgabe ( 'de', 'en' )*/
    speakLanguage: 'de',
    /** Audioformat 'mp3' oder 'wav' */
    audioFormat: 'mp3',
    /** lokales Verzeichnis, in dem die Audiodateien liegen, z.B. 'assets/speech/audio/', unbedingt mit '/' am Ende abschliessen! */
    audioFilePath: 'assets/',
    /** True, wenn Audiodateien abgespielt werden sollen, anstelle der Sprachsynthese */
    audioFlag: false,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

