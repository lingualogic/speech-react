/**
 * DialogService Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum:       26.03.2019
 *
 * @module speech/dialog
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

export const DIALOGSERVICE_VERSION_NUMBER = SPEECHSERVICE_VERSION_NUMBER;
export const DIALOGSERVICE_VERSION_BUILD = SPEECHSERVICE_VERSION_BUILD;
export const DIALOGSERVICE_VERSION_TYPE = SPEECHSERVICE_VERSION_TYPE;
export const DIALOGSERVICE_VERSION_DATE = SPEECHSERVICE_VERSION_DATE;

// tslint:disable-next-line
export const DIALOGSERVICE_VERSION_STRING = DIALOGSERVICE_VERSION_NUMBER + '.' + DIALOGSERVICE_VERSION_BUILD + ' vom ' + DIALOGSERVICE_VERSION_DATE + ' (' + DIALOGSERVICE_VERSION_TYPE + ')';
export const DIALOGSERVICE_API_VERSION = DIALOGSERVICE_VERSION_STRING;
