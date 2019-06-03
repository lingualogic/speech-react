/**
 * BotService zur Anbindung des Bot an Angular.
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * Letzte Aenderung: 28.02.2019
 * Status:           gelb
 *
 * @module speech/bot
 * @author SB
 */


// extern

import { EventEmitter } from './../common/event_emitter';


// speech-framework

import {
    BOT_COMPONENT_NAME,
    BotFactory,
    BotInterface,
    DialogActionInterface,
    DialogSpeakInterface
} from 'speech-framework';


// base

import { BaseService } from './../base/base-service';


// bot

import { BOT_SERVICE_NAME } from './bot-service-const';
import { BOTSERVICE_API_VERSION } from './bot-service-version';
import { BotServiceConfig } from './bot-service-config';
import { BotServiceActionInterface } from './bot-service-action.interface';
import { BotServiceOptionInterface } from './bot-service-option.interface';


// Konstanten


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

const BOT_ASYNC_EVENT = true;


// Action-Funktionen


/** Definiert die StartAction Funktion fuer eine Dialogaktion */
export type BotServiceActionStartFunc = (aAction: BotServiceActionInterface) => void;
/** Definiert die StopAction Funktion fuer eine Dialogaktion */
export type BotServiceActionStopFunc = () => void;


/** @export
 * BotService Klasse fuer Speech-Angular. Definiert einen Bot mit Aktionen und Sprachausgabe
 */


export class BotService extends BaseService {

    /** definiert die Konfiguration des BotService */

    private static botServiceConfig = BotServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Bot-Komponente

    private mBot: BotInterface = null;

    // Service-Events

    private mDialogSetEvent = new EventEmitter<string>( BOT_ASYNC_EVENT );
    private mDialogParseEvent = new EventEmitter( BOT_ASYNC_EVENT );
    private mDialogStartEvent = new EventEmitter( BOT_ASYNC_EVENT );
    private mDialogStopEvent = new EventEmitter( BOT_ASYNC_EVENT );
    private mDialogStateSetEvent = new EventEmitter<string>( BOT_ASYNC_EVENT );
    private mDialogActionEvent = new EventEmitter<BotServiceActionInterface>( BOT_ASYNC_EVENT );
    private mDialogActionStopEvent = new EventEmitter( BOT_ASYNC_EVENT );
    private mDialogSpeakEvent = new EventEmitter<string>( BOT_ASYNC_EVENT );
    private mDialogSpeakStopEvent = new EventEmitter( BOT_ASYNC_EVENT );


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den BotService, False sonst
     */

    static isConstructorInit(): boolean {
        return BotService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        BotService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        BotService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den BotService, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des BotService aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des BotService
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return {BotServiceOptionInterface} BotServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): BotServiceOptionInterface {
        return BotService.botServiceConfig;
    }


    /**
     * Konstruktor
     */

    constructor() {
        super( BOT_COMPONENT_NAME, BOT_SERVICE_NAME, BOTSERVICE_API_VERSION );
        // console.log('BotService.constructor: initFlag = ', BotService.isConstructorInit(), BotService.getConfig());
        if ( BotService.isConstructorInit()) {
            if ( this.init( BotService.getConfig()) !== 0 ) {
                throw new Error( 'Bot nicht initialisiert' );
            }
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @protected
     * @param {BotServiceOptionInterface} aOption - optionale Parameter
     */

    protected _setOption( aOption: BotServiceOptionInterface ): number {
        // console.log('BotService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // SpeakFlag uebertragen
        if ( typeof aOption.speakFlag === 'boolean' ) {
            this.speak = aOption.speakFlag;
        }
        // ActionFlag uebertragen
        if ( typeof aOption.actionFlag === 'boolean' ) {
            this.action = aOption.actionFlag;
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
     * Optionen uebertragen in BotOptionen
     *
     * @protected
     * @param {BotServiceOptionInterface} aOption - optionale Parameter
     * @return {any} Rueckgabe fuer Bot Optionen
     */

    protected _mapOption( aOption: BotServiceOptionInterface ): any {
        // Optionen uebertragen
        const option = super._mapOption( aOption ) as BotServiceOptionInterface;
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
        // console.log('BotService._createComponent:', aComponentName);
        this.mBot = BotFactory.create( aComponentName, aOption );
        // console.log('BotService._createComponent:', this.mBot !== null );
        return this.mBot;
    }


    /**
     * Initialisierung des Service.
     *
     * @param {BotServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} errorCode(0,-1)
     */

    init( aOption?: BotServiceOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param {BotServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: BotServiceOptionInterface ): number {
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

        this.mBot.addDialogSetEvent( aServiceName, (aDialogName: string) => {
            // console.log('BotService._initAllEvent: dialog start event:');
            this.mDialogSetEvent.emit(aDialogName);
            return 0;
        });

        this.mBot.addDialogParseEvent( aServiceName, () => {
            // console.log('BotService._initAllEvent: dialog start event:');
            this.mDialogParseEvent.emit();
            return 0;
        });

        this.mBot.addDialogStartEvent( aServiceName, () => {
            // console.log('BotService._initAllEvent: dialog start event:');
            this.mDialogStartEvent.emit();
            return 0;
        });

        this.mBot.addDialogStopEvent( aServiceName, () => {
            // console.log('BotService._initAllEvent: dialog stop event:');
            this.mDialogStopEvent.emit();
            return 0;
        });

        this.mBot.addDialogStateSetEvent( aServiceName, (aStateName: string) => {
            // console.log('BotService._initAllEvent: dialog state changed event:');
            this.mDialogStateSetEvent.emit(aStateName);
            return 0;
        });

        this.mBot.addDialogActionEvent( aServiceName, (aAction: DialogActionInterface) => {
            // Mapping zwischen Bot und BotService
            const action: BotServiceActionInterface = {
                state: aAction.state,
                action: aAction.action,
                type: aAction.type,
                id: aAction.id
            };
            // console.log('BotService._initAllEvent: action start event:', action);
            this.mDialogActionEvent.emit( action );
            return 0;
        });

        this.mBot.addDialogActionStopEvent( aServiceName, () => {
            // console.log('BotService._initAllEvent: action stop event:');
            this.mDialogActionStopEvent.emit();
            return 0;
        });

        this.mBot.addDialogSpeakEvent( aServiceName, (aSpeakData: DialogSpeakInterface) => {
            // console.log('BotService._initAllEvent: speak start event:');
            const text = aSpeakData.text || '';
            this.mDialogSpeakEvent.emit( text );
            return 0;
        });

        this.mBot.addDialogSpeakStopEvent( aServiceName, () => {
            // console.log('BotService._initAllEvent: speak stop event:');
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


    // Speak-Funktionen


    /**
     * Pruefen auf aktive Sprachausgabe
     *
     * @return {boolean} speakFlag - true, Sprachausgabe ist aktiv, false sonst
     */

    isSpeak(): boolean {
        if ( !this.mBot ) {
            this._error('isSpeak', 'keine Bot-Komponente vorhanden');
            return false;
        }
        return this.mBot.isSpeak();
    }


    /**
     * Sprachausgabe fuer den Bot einschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setSpeakOn(): number {
        if ( !this.mBot ) {
            this._error('setSpeakOn', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setSpeakOn();
    }


    /**
     * Sprachausgabe fuer den Bot ausschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setSpeakOff(): number {
        if ( !this.mBot ) {
            this._error('setSpeakOff', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setSpeakOff();
    }


    /**
     * Eigenschaft Speak setzen. Wenn Speak eingeschaltet ist,
     * wird der Dialogtext als Sprachausgabe ueber die Speak-Komponente erzeugt.
     *
     * @param {boolean} aSpeakFlag - True, wenn Sprachausgabe erfolgen soll, False sonst
     */

    set speak( aSpeakFlag: boolean ) {
        if ( aSpeakFlag ) {
            this.setSpeakOn();
        } else {
            this.setSpeakOff();
        }
    }


    /**
     * Eigenschaft Speak zurueckgeben.
     *
     * @readonly
     * @param {boolean} aSpeakFlag - True, wenn Sprachausgabe erfolgt, False sonst
     */

    get speak() {
        return this.isSpeak();
    }


    // Action-Funktionen


    /**
     * Pruefen auf aktive Aktionsverarbeitung
     *
     * @return {boolean} actionFlag - true, Aktionsverarbeitung ist aktiv, false sonst
     */

    isAction(): boolean {
        if ( !this.mBot ) {
            this._error('isAction', 'keine Bot-Komponente vorhanden');
            return false;
        }
        return this.mBot.isAction();
    }


    /**
     * Aktionsverarbeitung fuer den Bot einschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionOn(): number {
        if ( !this.mBot ) {
            this._error('setActionOn', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setActionOn();
    }


    /**
     * Aktionsverarbeitung fuer den Bot ausschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionOff(): number {
        if ( !this.mBot ) {
            this._error('setActionOff', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setActionOff();
    }


    /**
     * Eigenschaft Action setzen. Wenn Action eingeschaltet ist,
     * wird die Dialogaktion ueber die Action-Komponente ausgefuehrt.
     *
     * @param {boolean} aActionFlag - True, wenn Aktionsverarbeitung erfolgen soll, False sonst
     */

    set action( aActionFlag: boolean ) {
        if ( aActionFlag ) {
            this.setActionOn();
        } else {
            this.setActionOff();
        }
    }


    /**
     * Eigenschaft Action zurueckgeben.
     *
     * @readonly
     * @param {boolean} aActionFlag - True, wenn Aktionsverarbeitung erfolgt, False sonst
     */

    get action() {
        return this.isAction();
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

    setDialogFilePath( aFilePath: string): number {
        if ( !this.mBot ) {
            this._error('setDialogFilePath', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setDialogFilePath( aFilePath );
    }


    /**
     * Rueckgabe des aktuell eingetragenen Dialogverzeichnisses
     *
     * @return {string} aktuelles Dialogverzeichnis zurueckgeben
     */

    getDialogFilePath(): string {
        if ( !this.mBot ) {
            this._error('getDialogFilePath', 'keine Bot-Komponente vorhanden');
            return '';
        }
        return this.mBot.getDialogFilePath();
    }


    /**
     * Eigenschaft Path eintragen fuer das Dialogverzeichnis.
     *
     * @param {string} aPath - lokales Verzeichnis zu den Dialogdateien
     */

    set path( aPath: string ) {
        this.setDialogFilePath( aPath );
    }

    /**
     * Eigenschaft Path zurueckgeben
     *
     * @readonly
     * @return {string} aPath - Dialogverzeichnis fuer alle Dialogdateien
     */

    get path() {
        return this.getDialogFilePath();
    }


    /**
     * Eintragen einer Dialogdatei (z.B. 'speech.def'). Beinhalted das
     * Dialogskript fuer den Dialoginterpreter.
     *
     * @param {string} aFileName - Dialogskriptdateiname
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialogFileName( aFileName: string): number {
        if ( !this.mBot ) {
            this._error('setDialogFileName', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setDialogFileName( aFileName );
    }


    /**
     * Rueckgabe des aktuell eingetragenen Dialogdateinamens
     *
     * @return {string} aktuellen Dialogdateinamen zurueckgeben
     */

    getDialogFileName(): string {
        if ( !this.mBot ) {
            this._error('getDialogFileName', 'keine Bot-Komponente vorhanden');
            return '';
        }
        return this.mBot.getDialogFileName();
    }


    /**
     * Eigenschaft File eintragen fuer die aktuelle Dialogdatei.
     *
     * @param {string} aFileName - Name der Dialogdatei
     */

    set file( aFileName: string ) {
        this.setDialogFileName( aFileName );
    }


    /**
     * Eigenschaft File fuer die aktuelle Dialogdatei zurueckgeben.
     *
     * @return {string} aFileName - Name der aktuellen Dialogdatei
     */

    get file(): string {
        return this.getDialogFileName();
    }


    /**
     * alle Dialogdaten aus dem Dialogspeicher loeschen.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearDialog(): number {
        if ( !this.mBot ) {
            this._error('clearDialog', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.clearDialog();
    }


    /**
     * Dialog ueber seinen Namen einstellen. Der Dialog muss im Dialogskript vorhanden sein.
     *
     * @param {string} aDialogName - Name des Dialogs im Dialogskript
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialog( aDialogName: string ): number {
        if ( !this.mBot ) {
            this._error('setDialog', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setDialog( aDialogName );
    }


    /**
     * Aktuell eingestellten Dialog zurueckgeben
     *
     * @return {string} Rueckgabe des Dialognamens
     */

    getDialog(): string {
        if ( !this.mBot ) {
            this._error('getDialog', 'keine Bot-Komponente vorhanden');
            return '';
        }
        return this.mBot.getDialog();
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
        if ( !this.mBot ) {
            this._error('parse', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.writeDialogData( aDialogData );
    }


    /**
     * Dialogskript Datei parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogFileName - Dialogskript Dateiname
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    parseFile( aDialogFileName?: string ): number {
        if ( !this.mBot ) {
            this._error('parseFile', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.loadDialogFile( aDialogFileName );
    }


    /**
     * Dialog ein/ausschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    toggle(): number {
        if ( !this.mBot ) {
            this._error('toggle', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.toggleDialog();
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
        if ( !this.mBot ) {
            this._error('setState', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setDialogState( aStateName );
    }


    /**
     * Hier wird der aktuelle Dialogzustand zurueckgegeben
     *
     * @return {string} Rueckgabe des Dialogzustandsnamens
     */

    getState(): string {
        if ( !this.mBot ) {
            this._error('getState', 'keine Bot-Komponente vorhanden');
            return '';
        }
        return this.mBot.getDialogState();
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
        if ( !this.mBot ) {
            this._error('setStateContext', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.setDialogStateContext( aStateContext );
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
        if ( !this.mBot ) {
            this._error('clearContext', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.clearContext();
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
        if ( !this.mBot ) {
            this._error('addContextElement', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.addContextElement( aElementName, aContextName );
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
        if ( !this.mBot ) {
            this._error('removeContextElement', 'keine Bot-Komponente vorhanden');
            return -1;
        }
        return this.mBot.removeContextElement( aElementName, aContextName );
    }

}
