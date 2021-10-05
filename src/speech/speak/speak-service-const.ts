/** @packageDocumentation
 * Globale Konstanten fuer SpeakService
 *
 * API-Version: 1.2
 * Datum:       28.05.2019
 *
 * @module speech/speak
 * @author SB
 */


// Konstanten


/** @export
 * Servicename zur Erzeugung des Default SpeakService. Wird in der SpeakServiceFactory verwendet.
 */

export const SPEAK_SERVICE_NAME = 'SpeakService';


/** @export
 * Servicename zur Erzeugung des SpeakService Mock zum testen. Wird in der SpeakServiceFactory verwendet.
 */

export const SPEAK_SERVICEMOCK_NAME = 'SpeakServiceMock';


export const SPEAK_HTML5_TTS = 'TTSHtml5';
export const SPEAK_AMAZON_TTS = 'TTSAmazon';
export const SPEAK_GOOGLE_TTS = 'TTSGoogle';  // noch nicht implementiert
export const SPEAK_MICROSOFT_TTS = 'TTSMicrosoft';
export const SPEAK_NUANCE_TTS = 'TTSNuance'; // deprecated

export const SPEAK_DE_LANGUAGE = 'de';
export const SPEAK_EN_LANGUAGE = 'en';

export const SPEAK_MP3_AUDIOFORMAT = 'mp3';
export const SPEAK_WAV_AUDIOFORMAT = 'wav';
