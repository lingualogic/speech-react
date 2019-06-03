/**
 * DialogServiceOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       26.03.2019
 *
 * @module speech/dialog
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './../base/base-service-option.interface';


/** @export
 * DialogServiceOption Schnittstelle fuer optionale Konfigurationsparameter des DialogService bei der Initialisierung
 */

export interface DialogServiceOptionInterface extends BaseServiceOptionInterface {
    /** einzustellender Startdialog */
    dialogName?: string;
    /** Startdialogzustand, wenn ein Dialog gestartet wird */
    dialogRootState?: string;
    /** legt fest, ob ein Dialog direkt geladen wird */
    dialogLoadFlag?: boolean;
    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien */
    dialogFilePath?: string;
    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei */
    dialogFileName?: string;
}

