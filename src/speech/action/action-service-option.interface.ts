/**
 * ActionServiceOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       18.10.2018
 *
 * @module speech/action
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './../base/base-service-option.interface';


/** @export
 * ActionServiceOption Schnittstelle fuer optionale Konfigurationsparameter des ActionService bei der Initialisierung
 */

export interface ActionServiceOptionInterface extends BaseServiceOptionInterface {
    // Dummy-Attribut fuer Vermeidung von TLint-Error
    dummy?: any;
}

