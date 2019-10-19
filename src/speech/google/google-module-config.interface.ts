/**
 * GoogleModuleConfig-Schnittstelle
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
 * GoogleConfigData Schnittstelle fuer Konfigurationsparameter von Google
 */

export interface GoogleModuleConfigInterface {
    /** legt den AppKey fuer die Verbindung zum Server fest */
    googleAppKey: string;
    /** legt die URL fuer den Dialogflow Tokenserver fest */
    dialogflowTokenServerUrl: string;
    /** legt die   ProjektID fuer Dialogflow fest */
    dialogflowProjectId: string;
}
