/**  @packageDocumentation
 * ActionService Konfiguration, wird in ActionService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * @module speech/action
 * @author SB
 */


// action

import { ActionServiceOptionInterface } from './action-service-option.interface';


/** @export
 * ActionService Konfiguration, um Action anzupassen
 */

export const ActionServiceConfig: ActionServiceOptionInterface = {
    /** ein/ausschalten der Aktionskomponente */
    activeFlag: true,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

