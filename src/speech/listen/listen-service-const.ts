/**
 * Globale Konstanten fuer ListenService
 *
 * API-Version: 1.0
 * Datum:       11.10.2018
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
export const LISTEN_NUANCE_ASR = 'ASRNuance'; // deprecated


// Sprach-Konstanten fuer Deutsch und Englisch

export const LISTEN_DE_LANGUAGE = 'de';
export const LISTEN_EN_LANGUAGE = 'en';
