/**
 * ListenService Konfiguration, wird in ListenService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       11.10.2018
 *
 * @module speech/listen
 * @author SB
 */


// listen

import { LISTEN_DE_LANGUAGE } from './listen-service-const';
import { ListenServiceOptionInterface } from './listen-service-option.interface';


/** @export
 * ListenService Konfiguration, um Listen anzupassen
 */

export const ListenServiceConfig: ListenServiceOptionInterface = {
    /** ein/ausschalten der Listenkomponente */
    activeFlag: true,
    /** setzt die Sprache fuer die Spracheingabe ( 'de', 'en' )*/
    listenLanguage: LISTEN_DE_LANGUAGE,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

