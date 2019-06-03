/**
 * AmazonModuleOption Schnittstelle
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
 * AmazonOption Schnittstelle fuer optionale Konfigurationsparameter von Amazon bei der Initialisierung
 */

export interface AmazonModuleOptionInterface {
    /** legt dynamische Konfigurierbarkeit fest */
    amazonDynamicCredentialsFlag?: boolean;
    /** legt die Region fuer die Verbindung zum Server fest */
    amazonRegion?: string;
    /** legt die IdentityPoolId fuer die Verbindung zum Server fest */
    amazonIdentityPoolId?: string;
    /** legt fest, ob Port oder Mock geladen werden */
    amazonMockFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
