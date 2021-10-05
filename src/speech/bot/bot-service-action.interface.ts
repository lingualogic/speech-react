/** @packageDocumentation
 * Public BotService Aktion Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * @module speech/bot
 * @author SB
 */


// Global API


/** @export
 * Action Event Schnittstelle fuer das Action-Datentransferobjekt
 */

export interface BotServiceActionInterface {
    /** aktueller Dialogzustand */
    state: string;
    /** definierte Aktion */
    action: string;
    /** Objekttyp fuer die Aktion */
    type: string;
    /** eindeutiger Objektname fuer die Aktion */
    id: string;
}

