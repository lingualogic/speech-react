/**
 * IntentService Konfiguration, wird in IntentService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       28.11.2018
 *
 * @module speech/intent
 * @author SB
 */


// intent

import { INTENT_DE_LANGUAGE } from './intent-service-const';
import { IntentServiceOptionInterface } from './intent-service-option.interface';


/** @export
 * IntentService Konfiguration, um Intent anzupassen
 */

export const IntentServiceConfig: IntentServiceOptionInterface = {
    /** ein/ausschalten der Intentkomponente */
    activeFlag: true,
    /** setzt die Sprache fuer die Sprachanalyse ( 'de', 'en' )*/
    intentLanguage: INTENT_DE_LANGUAGE,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

