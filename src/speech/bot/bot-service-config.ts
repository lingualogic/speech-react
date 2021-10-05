/** @packageDocumentation
 * BotService Konfiguration, wird in BotService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * @module speech/bot
 * @author SB
 */


// bot

import { BotServiceOptionInterface } from './bot-service-option.interface';


/** @export
 * BotService Konfiguration, um Bot anzupassen
 */

export const BotServiceConfig: BotServiceOptionInterface = {
    /** ein/ausschalten des Bot */
    activeFlag: true,
    /** ein/ausschalten der Sprachausgabe */
    speakFlag: true,
    /** ein/ausschalten der Aktionsverarbeitung */
    actionFlag: true,
    /** einzustellender Startdialog */
    dialogName: 'main',
    /** Startdialogzustand, wenn ein Dialog gestartet wird */
    dialogRootState: 'home',
    /** legt fest, ob ein Dialog direkt geladen wird */
    dialogLoadFlag: true,
    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien */
    dialogFilePath: 'assets/',
    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei */
    dialogFileName: 'speech.def',
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

