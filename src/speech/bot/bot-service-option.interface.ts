/** @packageDocumentation
 * BotServiceOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       19.10.2018
 *
 * @module speech/bot
 * @author SB
 */


// base

import { BaseServiceOptionInterface } from './../base/base-service-option.interface';


/** @export
 * BotServiceOption Schnittstelle fuer optionale Konfigurationsparameter des BotService bei der Initialisierung
 */

export interface BotServiceOptionInterface extends BaseServiceOptionInterface {
    /** ein/ausschalten der Sprachausgabe */
    speakFlag?: boolean;
    /** ein/ausschalten der Aktionsverarbeitung */
    actionFlag?: boolean;
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

