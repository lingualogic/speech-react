/** @packageDocumentation
 * MicrosoftModuleOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       28.08.2019
 *
 * Letzte Aenderung: 28.08.2019
 * Status: rot
 *
 * @module speech/microsoft
 * @author SB
 */


/** @export
 * MicrosoftOption Schnittstelle fuer optionale Konfigurationsparameter von Microsoft bei der Initialisierung
 */

export interface MicrosoftModuleOptionInterface {
    /** legt dynamische Konfigurierbarkeit fest */
    microsoftDynamicCredentialsFlag?: boolean;
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion?: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey?: string;
    /** legt den Endpunkt fuer Luis (NLU) fuer die Verbindung zum Server fest */
    microsoftLuisEndpoint?: string;
    /** legt fest, ob Port oder Mock geladen werden */
    microsoftMockFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
