/** @packageDocumentation
 * RasaModuleConfig-Schnittstelle
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
 * RasaConfigData Schnittstelle fuer Konfigurationsparameter von Rasa
 */

export interface RasaModuleConfigInterface {
    /** legt die URL fuer die Verbindung zum Server fest */
    rasaServerUrl?: string;
    /** legt den AppKey fuer die Verbindung zum Server fest */
    rasaAppKey: string;
}
