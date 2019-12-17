/**
 * GoogleModuleOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       17.12.2019
 *
 * Letzte Aenderung: 17.12.2019
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
    /** legt die URL fuer den Google Tokenserver fest */
    googleServerUrl?: string;
    /** legt fest, ob Port oder Mock geladen werden */
    googleMockFlag?: boolean;
    /** legt die URL fuer die Verbindung zum Dialogflow-TokenServer fest */
    dialogflowTokenServerUrl?: string;
    /** legt die Projekt-ID von Dialogflow fest */
    dialogflowProjectId?: string;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
