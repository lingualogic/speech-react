/**
 * AmazonModuleConfig-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       03.04.2019
 *
 * Letzte Aenderung: 03.04.2019
 * Status: rot
 *
 * @module speech/amazon
 * @author SB
 */


/** @export
 * AmazonConfigData Schnittstelle fuer Konfigurationsparameter von Amazon
 */

export interface AmazonModuleConfigInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    amazonRegion: string;
    /** legt die IdentityPoolId fuer die Verbindung zum Server fest */
    amazonIdentityPoolId: string;
}
