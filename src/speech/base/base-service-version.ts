/**
 * BaseService Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum:       10.10.2018
 *
 * @module speech/base
 * @author SB
 */


// global

import {
    SPEECHSERVICE_VERSION_NUMBER,
    SPEECHSERVICE_VERSION_BUILD,
    SPEECHSERVICE_VERSION_TYPE,
    SPEECHSERVICE_VERSION_DATE
} from './../const/speech-service-version';


// Versions-Konstanten

export const BASESERVICE_VERSION_NUMBER = SPEECHSERVICE_VERSION_NUMBER;
export const BASESERVICE_VERSION_BUILD = SPEECHSERVICE_VERSION_BUILD;
export const BASESERVICE_VERSION_TYPE = SPEECHSERVICE_VERSION_TYPE;
export const BASESERVICE_VERSION_DATE = SPEECHSERVICE_VERSION_DATE;

// tslint:disable-next-line
export const BASESERVICE_VERSION_STRING = BASESERVICE_VERSION_NUMBER + '.' + BASESERVICE_VERSION_BUILD + ' vom ' + BASESERVICE_VERSION_DATE + ' (' + BASESERVICE_VERSION_TYPE + ')';
export const BASESERVICE_API_VERSION = BASESERVICE_VERSION_STRING;
