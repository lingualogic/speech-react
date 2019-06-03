/**
 * BaseService Konfiguration, wird in BaseService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       10.10.2018
 *
 * @module speech/base
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './base-service-option.interface';


/** @export
 * BaseService Konfiguration, um Base anzupassen
 */

export const BaseServiceConfig: BaseServiceOptionInterface = {
    /** ein/ausschalten der Komponente */
    activeFlag: true,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

