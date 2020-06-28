/**
 * GoogleModuleOption Schnittstelle
 *
 * API-Version: 1.3
 * Datum:       20.06.2020
 *
 * Letzte Aenderung: 20.06.2020
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
    /** legt die Session-ID von Dialogflow fest */
    dialogflowSessionId?: string;
    /** legt den Enviromment-Namen des Dialogflow-Agenten fest */
    dialogflowEnvironmentName?: string;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
