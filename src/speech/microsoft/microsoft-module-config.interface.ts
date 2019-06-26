/**
 * MicrosoftModuleConfig-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       20.06.2019
 *
 * Letzte Aenderung: 20.06.2019
 * Status: rot
 *
 * @module speech/microsoft
 * @author SB
 */


/** @export
 * MicrosoftConfigData Schnittstelle fuer Konfigurationsparameter von Microsoft
 */

export interface MicrosoftModuleConfigInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey: string;
}
