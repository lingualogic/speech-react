/**
 * RasaModuleConfig-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.07.2019
 *
 * Letzte Aenderung: 11.07.2019
 * Status: rot
 *
 * @module speech/rasa
 * @author SB
 */


/** @export
 * RasaConfigData Schnittstelle fuer Konfigurationsparameter von Rasa
 */

export interface RasaModuleConfigInterface {
    /** legt den AppKey fuer die Verbindung zum Server fest */
    rasaAppKey: string;
}
