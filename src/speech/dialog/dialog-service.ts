/**
 * DialogService zur Anbindung des Dialogs an Angular.
 *
 * API-Version: 1.0
 * Datum:       26.03.2019
 *
 * Letzte Aenderung: 26.03.2019
 * Status:           rot
 *
 * @module speech/dialog
 * @author SB
 */


// extern

import { EventEmitter } from './../common/event_emitter';


// speech-framework

import {
    DIALOG_COMPONENT_NAME,
    DialogFactory,
    DialogInterface,
    DialogActionInterface,
    DialogSpeakInterface
} from 'speech-framework';


// base

import { BaseService } from './../base/base-service';


// dialog

import { DIALOG_SERVICE_NAME } from './dialog-service-const';
import { DIALOGSERVICE_API_VERSION } from './dialog-service-version';
import { DialogServiceConfig } from './dialog-service-config';
import { DialogServiceActionInterface } from './dialog-service-action.interface';
import { DialogServiceSpeakInterface } from './dialog-service-speak.interface';
import { DialogServiceOptionInterface } from './dialog-service-option.interface';


// Konstanten


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

const DIALOG_ASYNC_EVENT = true;


// Action-Funktionen


/** Definiert die StartAction Funktion fuer eine Dialogaktion */
export type DialogServiceActionStartFunc = (aAction: DialogServiceActionInterface) => void;
/** Definiert die StopAction Funktion fuer eine Dialogaktion */
export type DialogServiceActionStopFunc = () => void;


/** @export
 * DialogService Klasse fuer Speech-Angular.
 */


export class DialogService extends BaseService {

    /** definiert die Konfiguration des DialogService */

    private static dialogServiceConfig = DialogServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Dialog-Komponente

    private mDialog: DialogInterface = null;

    // Service-Events

    private mDialogSetEvent = new EventEmitter<string>( DIALOG_ASYNC_EVENT );
    private mDialogParseEvent = new EventEmitter( DIALOG_ASYNC_EVENT );
    private mDialogStartEvent = new EventEmitter( DIALOG_ASYNC_EVENT );
    private mDialogStopEvent = new EventEmitter( DIALOG_ASYNC_EVENT );
    private mDialogStateSetEvent = new EventEmitter<string>( DIALOG_ASYNC_EVENT );
    private mDialogActionEvent = new EventEmitter<DialogServiceActionInterface>( DIALOG_ASYNC_EVENT );
    private mDialogActionStopEvent = new EventEmitter( DIALOG_ASYNC_EVENT );
    private mDialogSpeakEvent = new EventEmitter<DialogServiceSpeakInterface>( DIALOG_ASYNC_EVENT );
    private mDialogSpeakStopEvent = new EventEmitter( DIALOG_ASYNC_EVENT );


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den DialogService, False sonst
     */

    static isConstructorInit(): boolean {
        return DialogService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        DialogService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        DialogService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den DialogService, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des DialogService aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des DialogService
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return {DialogServiceOptionInterface} DialogServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): DialogServiceOptionInterface {
        return DialogService.dialogServiceConfig;
    }


    /**
     * Konstruktor
     */

    constructor() {
        super( DIALOG_COMPONENT_NAME, DIALOG_SERVICE_NAME, DIALOGSERVICE_API_VERSION );
        // console.log('DialogService.constructor: initFlag = ', DialogService.isConstructorInit(), DialogService.getConfig());
        if ( DialogService.isConstructorInit()) {
            if ( this.init( DialogService.getConfig()) !== 0 ) {
                throw new Error( 'Dialog nicht initialisiert' );
            }
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @protected
     * @param {DialogServiceOptionInterface} aOption - optionale Parameter
     */

    protected _setOption( aOption: DialogServiceOptionInterface ): number {
        // console.log('DialogService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // Dialogname uebertragen
        if ( typeof aOption.dialogName === 'string' ) {
            this.dialog = aOption.dialogName;
        }
        // Startzustand uebertragen
        if ( typeof aOption.dialogRootState === 'string' ) {
            this.state = aOption.dialogRootState;
        }
        // Dialogdateiverzeichnis uebertragen
        if ( typeof aOption.dialogFilePath === 'string' ) {
            this.path = aOption.dialogFilePath;
        }
        // Dialogdateiname uebertragen
        if ( typeof aOption.dialogFileName === 'string' ) {
            this.file = aOption.dialogFileName;
        }
        return 0;
    }


    /**
     * Optionen uebertragen in DialogOptionen
     *
     * @protected
     * @param {DialogServiceOptionInterface} aOption - optionale Parameter
     * @return {any} Rueckgabe fuer Bot Optionen
     */

    protected _mapOption( aOption: DialogServiceOptionInterface ): any {
        // Optionen uebertragen
        const option = super._mapOption( aOption ) as DialogServiceOptionInterface;
        if ( !aOption ) {
            return option;
        }
        // Dialogname uebertragen
        if ( typeof aOption.dialogName === 'string' ) {
            option.dialogName = aOption.dialogName;
        }
        // Startzustand uebertragen
        if ( typeof aOption.dialogRootState === 'string' ) {
            option.dialogRootState = aOption.dialogRootState;
        }
        // Dialogladeflag uebertragen
        if ( typeof aOption.dialogLoadFlag === 'boolean' ) {
            option.dialogLoadFlag = aOption.dialogLoadFlag;
        }
        // Dialogdateiverzeichnis uebertragen
        if ( typeof aOption.dialogFilePath === 'string' ) {
            option.dialogFilePath = aOption.dialogFilePath;
        }
        // Dialogdateiname uebertragen
        if ( typeof aOption.dialogFileName === 'string' ) {
            option.dialogFileName = aOption.dialogFileName;
        }
        return option;
    }


    /**
     * Hier wird die Komponente erzeugt.
     *
     * @protected
     * @param aComponentName - Name der zu erzeugenden Komponente
     * @param aOption - optionale Parameter fuer die Initialisierung der Komponente
     *
     * @return {*} Rueckgabe der Action-Instanz
     */

    protected _createComponent( aComponentName: string, aOption: any ): any {
        // console.log('DialogService._createComponent:', aComponentName);
        this.mDialog = DialogFactory.create( aComponentName, aOption );
        // console.log('DialogService._createComponent:', this.mDialog !== null );
        return this.mDialog;
    }


    /**
     * Initialisierung des Service.
     *
     * @param {DialogServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} errorCode(0,-1)
     */

    init( aOption?: DialogServiceOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param {DialogServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: DialogServiceOptionInterface ): number {
        return super.reset( aOption );
    }


    // Event-Funktionen


    /**
     * Anbindung der Bot-Events an die EventEmitter von Angular
     *
     * @protected
     * @param {string} aServiceName - Name  des Services
     *
     * @return {number} Fehlercode 0 oder 1
     */

    protected _addAllEvent( aServiceName: string ): number {
        if ( super._addAllEvent( aServiceName ) !== 0 ) {
            return -1;
        }

        this.mDialog.addDialogSetEvent( aServiceName, (aDialogName: string) => {
            // console.log('DialogService._initAllEvent: dialog start event:');
            this.mDialogSetEvent.emit(aDialogName);
            return 0;
        });

        this.mDialog.addDialogParseEvent( aServiceName, () => {
            // console.log('DialogService._initAllEvent: dialog start event:');
            this.mDialogParseEvent.emit();
            return 0;
        });

        this.mDialog.addDialogStartEvent( aServiceName, () => {
            // console.log('DialogService._initAllEvent: dialog start event:');
            this.mDialogStartEvent.emit();
            return 0;
        });

        this.mDialog.addDialogStopEvent( aServiceName, () => {
            // console.log('DialogService._initAllEvent: dialog stop event:');
            this.mDialogStopEvent.emit();
            return 0;
        });

        this.mDialog.addDialogStateSetEvent( aServiceName, (aStateName: string) => {
            // console.log('DialogService._initAllEvent: dialog state changed event:');
            this.mDialogStateSetEvent.emit(aStateName);
            return 0;
        });

        this.mDialog.addDialogActionEvent( aServiceName, (aActionData: DialogActionInterface) => {
            // Mapping zwischen Dialog und DialogService
            const action: DialogServiceActionInterface = {
                state: aActionData.state,
                action: aActionData.action,
                type: aActionData.type,
                id: aActionData.id
            };
            // console.log('DialogService._initAllEvent: action start event:', action);
            this.mDialogActionEvent.emit( action );
            return 0;
        });

        this.mDialog.addDialogActionStopEvent( aServiceName, () => {
            // console.log('DialogService._initAllEvent: action stop event:');
            this.mDialogActionStopEvent.emit();
            return 0;
        });

        this.mDialog.addDialogSpeakEvent( aServiceName, (aSpeakData: DialogSpeakInterface) => {
            // console.log('DialogService._initAllEvent: speak start event:');
            // Mapping zwischen Dialog und DialogService
            const speak: DialogServiceSpeakInterface = {
                event: aSpeakData.event,
                state: aSpeakData.state,
                id: aSpeakData.id,
                text: aSpeakData.text,
                timeout: aSpeakData.timeout
            };
            this.mDialogSpeakEvent.emit( speak );
            return 0;
        });

        this.mDialog.addDialogSpeakStopEvent( aServiceName, () => {
            // console.log('DialogService._initAllEvent: speak stop event:');
            this.mDialogSpeakStopEvent.emit();
            return 0;
        });
        return 0;
    }


    /**
     * Ereignis fuer neu eingestellten Dialog
     *
     * @readonly
     */

    get setDialogEvent() {
        return this.mDialogSetEvent;
    }


    /**
     * Ereignis fuer geparstes Dialogskript
     *
     * @readonly
     */

    get parseEvent() {
        return this.mDialogParseEvent;
    }


    /**
     * Ereignis fuer gestarteten Dialog
     *
     * @readonly
     */

    get startEvent() {

        return this.mDialogStartEvent;
    }


    /**
     * Ereignis fuer beendeten Dialog
     *
     * @readonly
     */

    get stopEvent() {
        return this.mDialogStopEvent;
    }


    /**
     * Ereignis fuer neu eingestellten Dialogzustand
     *
     * @readonly
     */

    get setStateEvent() {
        return this.mDialogStateSetEvent;
    }

    /**
     * Ereignis fuer Aktionen
     *
     * @readonly
     */

    get actionEvent() {
        return this.mDialogActionEvent;
    }


    /**
     * Ereignis fuer Aktionen beenden
     *
     * @readonly
     */

    get actionStopEvent() {
        return this.mDialogActionStopEvent;
    }


    /**
     * Ereignis fuer Sprachausgabe starten
     *
     * @readonly
     */

    get speakEvent() {
        return this.mDialogSpeakEvent;
    }


    /**
     * Ereignis fuer Sprachausgabe beendet
     *
     * @readonly
     */

    get speakStopEvent() {
        return this.mDialogSpeakStopEvent;
    }


    // Dialog-Funktionen


    /**
     * Eintragen eines Dialogdateiverzeichnisses (z.B. 'assets/speech/').
     * Muss mit '/' abgeschlossen werden !
     *
     * @param {string} aFilePath - lokales Verzeichnis zu den Dialogdaten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setPath( aFilePath: string): number {
        if ( !this.mDialog ) {
            this._error('setPath', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.setDialogFilePath( aFilePath );
    }


    /**
     * Rueckgabe des aktuell eingetragenen Dialogverzeichnisses
     *
     * @return {string} aktuelles Dialogverzeichnis zurueckgeben
     */

    getPath(): string {
        if ( !this.mDialog ) {
            this._error('getPath', 'keine Dialog-Komponente vorhanden');
            return '';
        }
        return this.mDialog.getDialogFilePath();
    }


    /**
     * Eigenschaft Path eintragen fuer das Dialogverzeichnis.
     *
     * @param {string} aPath - lokales Verzeichnis zu den Dialogdateien
     */

    set path( aPath: string ) {
        this.setPath( aPath );
    }

    /**
     * Eigenschaft Path zurueckgeben
     *
     * @readonly
     * @return {string} aPath - Dialogverzeichnis fuer alle Dialogdateien
     */

    get path() {
        return this.getPath();
    }


    /**
     * Eintragen einer Dialogdatei (z.B. 'speech.def'). Beinhalted das
     * Dialogskript fuer den Dialoginterpreter.
     *
     * @param {string} aFileName - Dialogskriptdateiname
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setFile( aFileName: string): number {
        if ( !this.mDialog ) {
            this._error('setFile', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.setDialogFileName( aFileName );
    }


    /**
     * Rueckgabe des aktuell eingetragenen Dialogdateinamens
     *
     * @return {string} aktuellen Dialogdateinamen zurueckgeben
     */

    getFile(): string {
        if ( !this.mDialog ) {
            this._error('getFile', 'keine Dialog-Komponente vorhanden');
            return '';
        }
        return this.mDialog.getDialogFileName();
    }


    /**
     * Eigenschaft File eintragen fuer die aktuelle Dialogdatei.
     *
     * @param {string} aFileName - Name der Dialogdatei
     */

    set file( aFileName: string ) {
        this.setFile( aFileName );
    }


    /**
     * Eigenschaft File fuer die aktuelle Dialogdatei zurueckgeben.
     *
     * @return {string} aFileName - Name der aktuellen Dialogdatei
     */

    get file(): string {
        return this.getFile();
    }


    /**
     * alle Dialogdaten aus dem Dialogspeicher loeschen.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearDialog(): number {
        if ( !this.mDialog ) {
            this._error('clearDialog', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.clearDialog();
    }


    /**
     * Dialog ueber seinen Namen einstellen. Der Dialog muss im Dialogskript vorhanden sein.
     *
     * @param {string} aDialogName - Name des Dialogs im Dialogskript
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialog( aDialogName: string ): number {
        if ( !this.mDialog ) {
            this._error('setDialog', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.setDialog( aDialogName );
    }


    /**
     * Aktuell eingestellten Dialog zurueckgeben
     *
     * @return {string} Rueckgabe des Dialognamens
     */

    getDialog(): string {
        if ( !this.mDialog ) {
            this._error('getDialog', 'keine Dialog-Komponente vorhanden');
            return '';
        }
        return this.mDialog.getDialog();
    }


    /**
     * Eigenschaft Dialog eintragen.
     *
     * @param {string} aDialogName - Name des aktuellen Dialogs
     */

    set dialog( aDialogName: string ) {
        this.setDialog( aDialogName );
    }


    /**
     * Eigenschaft Dialog zurueckgeben.
     *
     * @return {string} aDialogName - Name des aktuellen Dialogs
     */

    get dialog() {
        return this.getDialog();
    }


    /**
     * Dialogskript parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogData - Dialogskript
     *
     * @returns {number}
     */

    parse( aDialogData: string ): number {
        if ( !this.mDialog ) {
            this._error('parse', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.writeDialogData( aDialogData );
    }


    /**
     * Dialogskript Datei parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogFileName - Dialogskript Dateiname
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    parseFile( aDialogFileName?: string ): number {
        if ( !this.mDialog ) {
            this._error('parseFile', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.loadDialogFile( aDialogFileName );
    }


    /**
     * Dialog ein/ausschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    toggle(): number {
        if ( !this.mDialog ) {
            this._error('toggle', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.toggleDialog();
    }


    // Dialogzustands-Funktionen


    /**
     * Dialogzustand setzen
     *
     * @param {string} aStateName - Name des Dialogzustands im Dialogskript
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setState( aStateName: string ): number {
        if ( !this.mDialog ) {
            this._error('setState', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.setDialogState( aStateName );
    }


    /**
     * Hier wird der aktuelle Dialogzustand zurueckgegeben
     *
     * @return {string} Rueckgabe des Dialogzustandsnamens
     */

    getState(): string {
        if ( !this.mDialog ) {
            this._error('getState', 'keine Dialog-Komponente vorhanden');
            return '';
        }
        return this.mDialog.getDialogState();
    }


    /**
     * Eigenschaft State setzen.
     *
     * @param {string} aStateName - Name des aktuell einzustellenden Zustands
     */

    set state( aStateName: string ) {
        this.setState( aStateName );
    }


    /**
     * Eigenschaft State zurueckgeben.
     *
     * @param {string} aStateName - Name des aktuell eingestellten Zustands
     */

    get state() {
        return this.getState();
    }


    /**
     * Dialogzustandskontext eintragen. Der Kontext dient zur variablen Steuerung der Dialogzustaende.
     *
     * @param {*} aStateContext - Dialogzustantskontext
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    setStateContext( aStateContext: any ): number {
        if ( !this.mDialog ) {
            this._error('setStateContext', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.setDialogStateContext( aStateContext );
    }


    /**
     * Eigenschaft Kontext eintragen.
     *
     * @param {*} aStateContext - aktuelles Kontextobjekt zum State eintragen
     */

    set context( aStateContext: any ) {
        this.setStateContext( aStateContext );
    }


    // Kontext-Funktionen


    /**
     * Loeschen des aktuellen Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearContext(): number {
        if ( !this.mDialog ) {
            this._error('clearContext', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.clearContext();
    }


    /**
     * Eintragen eines Kontextes zu einem Element.
     *
     * @param {string} aElementName - Name des Elementes
     * @param {string} aContextName - Name des Kontexts
     *
     * @returns {number}
     */

    addContextElement( aElementName: string, aContextName: string ): number {
        if ( !this.mDialog ) {
            this._error('addContextElement', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.addContextElement( aElementName, aContextName );
    }


    /**
     * Entfernen eines Kontextes zu einem Element.
     *
     * @param {string} aElementName - Name des Elementes
     * @param {string} aContextName - Name des Kontexts
     *
     * @returns {number}
     */

    removeContextElement( aElementName: string, aContextName: string ): number {
        if ( !this.mDialog ) {
            this._error('removeContextElement', 'keine Dialog-Komponente vorhanden');
            return -1;
        }
        return this.mDialog.removeContextElement( aElementName, aContextName );
    }

}
