/**
 * BaseServiceOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       10.10.2018
 *
 * @module speech/base
 * @author SB
 */


/** @export
 * BaseServiceOption Schnittstelle fuer optionale Konfigurationsparameter des Service bei der Initialisierung
 */

export interface BaseServiceOptionInterface {
    /** ein/ausschalten der Komponente */
    activeFlag?: boolean;
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag?: boolean;
}

