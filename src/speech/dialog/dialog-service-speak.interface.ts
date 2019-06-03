/**
 * Public DialogService Speak Schnittstelle
 *
 * API-Version: 1.0
 * Datum:   26.03.2019
 *
 * @module speech/dialog
 * @author SB
 */


// Global API


/** @export
 * Speak-Event Schnittstelle fuer das Speak-Datentransferobjekt
 */

export interface DialogServiceSpeakInterface {
    /** definiertes Ereignis */
    event: string;
    /** aktueller Dialogzustand */
    state: string;
    /** eindeutiger Audiodateiname fuer die Sprachausgabe */
    id: string;
    /** zu synthetisierender Text fuer die Sprachausgabe */
    text: string;
    /** Zeitdauer, die fuer die Sprachausgabe gewartet wird */
    timeout: number;
}
