/**
 * Public DialogService Aktion Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       26.03.2019
 *
 * @module speech/dialog
 * @author SB
 */


// Global API


/** @export
 * Action Event Schnittstelle fuer das Action-Datentransferobjekt
 */

export interface DialogServiceActionInterface {
    /** aktueller Dialogzustand */
    state: string;
    /** definierte Aktion */
    action: string;
    /** Objekttyp fuer die Aktion */
    type: string;
    /** eindeutiger Objektname fuer die Aktion */
    id: string;
}

