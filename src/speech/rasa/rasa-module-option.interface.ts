/** @packageDocumentation
 * RasaModuleOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       22.07.2019
 *
 * Letzte Aenderung: 22.07.2019
 * Status: rot
 *
 * @module speech/rasa
 * @author SB
 */


/** @export
 * RasaOption Schnittstelle fuer optionale Konfigurationsparameter von Rasa bei der Initialisierung
 */

export interface RasaModuleOptionInterface {
    /** legt die URL fuer die Verbindung zum Server fest */
    rasaServerUrl?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    rasaDynamicCredentialsFlag?: boolean;
    /** legt den AppKey fuer die Verbindung zum Server fest */
    rasaAppKey?: string;
    /** legt fest, ob Port oder Mock geladen werden */
    rasaMockFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
