/** @packageDocumentation
 * Globale Konstanten fuer IntentService
 *
 * API-Version: 1.0
 * Datum:       ß3.12.2018
 *
 * @module speech/intent
 * @author SB
 */


// Konstanten


/** @export
 * Servicename zur Erzeugung des Default IntentService. Wird in der IntentServiceFactory verwendet.
 */

export const INTENT_SERVICE_NAME = 'IntentService';


/** @export
 * Servicename zur Erzeugung des IntentService Mock zum testen. Wird in der IntentServiceFactory verwendet.
 */

export const INTENT_SERVICEMOCK_NAME = 'IntentServiceMock';


// NLU-Plugins


export const INTENT_HTML5_NLU = 'NLUHtml5';   // noch nicht implementiert
export const INTENT_GOOGLE_NLU = 'NLUGoogle';
export const INTENT_MICROSOFT_NLU = 'NLUMicrosoft';
export const INTENT_RASA_NLU = 'NLURasa';
export const INTENT_NUANCE_NLU = 'NLUNuance'; // deprecated


// Sprach-Konstanten fuer Deutsch und Englisch

export const INTENT_DE_LANGUAGE = 'de';
export const INTENT_EN_LANGUAGE = 'en';
