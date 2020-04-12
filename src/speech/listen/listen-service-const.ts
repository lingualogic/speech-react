/**
 * Globale Konstanten fuer ListenService
 *
 * API-Version: 1.1
 * Datum:       24.10.2018
 *
 * @module speech/listen
 * @author SB
 */


// Konstanten


/** @export
 * Servicename zur Erzeugung des Default ListenService. Wird in der ListenServiceFactory verwendet.
 */

export const LISTEN_SERVICE_NAME = 'ListenService';


/** @export
 * Servicename zur Erzeugung des ListenService Mock zum testen. Wird in der ListenServiceFactory verwendet.
 */

export const LISTEN_SERVICEMOCK_NAME = 'ListenServiceMock';


// ASR-Plugins

export const LISTEN_HTML5_ASR = 'ASRHtml5';
export const LISTEN_GOOGLE_ASR = 'ASRGoogle';  // noch nicht implementiert
export const LISTEN_MICROSOFT_ASR = 'ASRMicrosoft';
export const LISTEN_NUANCE_ASR = 'ASRNuance'; // deprecated


// Sprach-Konstanten fuer Deutsch und Englisch

export const LISTEN_DE_LANGUAGE = 'de';
export const LISTEN_EN_LANGUAGE = 'en';


// Modus-Konstanten fuer Command und Dictate

export const LISTEN_COMMAND_MODE = 'Command';
export const LISTEN_DICTATE_MODE = 'Dictate';
