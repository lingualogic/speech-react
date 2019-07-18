/**
 * GoogleModuleOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       09.05.2019
 *
 * Letzte Aenderung: 09.05.2019
 * Status: rot
 *
 * @module speech/google
 * @author SB
 */


/** @export
 * GoogleOption Schnittstelle fuer optionale Konfigurationsparameter von Google bei der Initialisierung
 */

export interface GoogleModuleOptionInterface {
    /** legt dynamische Konfigurierbarkeit fest */
    googleDynamicCredentialsFlag?: boolean;
    /** legt den AppKey fuer die Verbindung zum Server fest */
    googleAppKey?: string;
    /** legt fest, ob Port oder Mock geladen werden */
    googleMockFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
