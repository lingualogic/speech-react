/**
 * DialogService Konfiguration, wird in DialogService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       26.03.2019
 *
 * @module speech/dialog
 * @author SB
 */


// bot

import { DialogServiceOptionInterface } from './dialog-service-option.interface';


/** @export
 * DialogService Konfiguration, um Dialog anzupassen
 */

export const DialogServiceConfig: DialogServiceOptionInterface = {
    /** ein/ausschalten des Bot */
    activeFlag: true,
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

