/** @packageDocumentation
 * IntentServiceOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       29.03.2019
 *
 * @module speech/intent
 * @author SB
 */


/** @export
 * Intent-Event Schnittstelle fuer das Intent-Datentransferobjekt
 */

export interface IntentServiceDataInterface {
    /** definiert den Intent-Namen */
    intent: string;
    /** definiert die Wahrscheinlichkeit fuer den Intent */
    confidence: number;
    /** defniert moegliche Konzepte */
    conceptList: any;
    /** Text zum Intent */
    literal: string;
    /** aufgetretene Fehler */
    error: string;
}
