/**
 * ListenService fuer die Integration von Listen in Angular
 *
 * API-Version: 1.1
 * Datum:       21.02.2019
 *
 * Letzte Aenderung: 28.02.2019
 * Status: gelb
 *
 * @module speech/listen
 * @author SB
 */


// extern

import { EventEmitter } from './../common/event_emitter';


// speech-framework

import {
    LISTEN_COMPONENT_NAME,
    ListenFactory,
    ListenInterface
} from 'speech-framework';


// base

import { BaseService } from './../base/base-service';


// listen

import { LISTEN_SERVICE_NAME } from './listen-service-const';
import { LISTENSERVICE_API_VERSION } from './listen-service-version';
import { ListenServiceConfig } from './listen-service-config';
import { ListenServiceOptionInterface } from './listen-service-option.interface';


// Konstanten


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

const LISTEN_ASYNC_EVENT = true;


/**
 * ListenService Klasse
 *
 * @export
 * @class ListenService
 */


export class ListenService extends BaseService {

    /** definiert die Konfiguration des Service */

    private static listenServiceConfig = ListenServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Listen-Komponente

    private mListen: ListenInterface = null;

    // Service-Events

    private mListenResultEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den Service, False sonst
     */

    static isConstructorInit(): boolean {
        return ListenService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        ListenService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        ListenService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den Service, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des Service aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des Service
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return {ListenServiceOptionInterface} BaseServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): ListenServiceOptionInterface {
        return ListenService.listenServiceConfig;
    }



    /**
     * Konstruktor fuer Initialisierung des Listen-Service
     */

    constructor() {
        super( LISTEN_COMPONENT_NAME, LISTEN_SERVICE_NAME, LISTENSERVICE_API_VERSION );
        // console.log('ListenService.constructor: initFlag = ', ListenService.isConstructorInit(), ListenService.getConfig());
        if ( ListenService.isConstructorInit()) {
            if ( this.init( ListenService.getConfig()) !== 0 ) {
                throw new Error( 'Listen nicht initialisiert' );
            }
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @private
     * @param {ListenServiceOptionInterface} aOption - optionale Parameter
     */

    protected _setOption( aOption: ListenServiceOptionInterface ): number {
        // console.log('ListenService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // Sprache uebertragen
        if ( typeof aOption.listenLanguage === 'string' ) {
            // console.log('ListenService._setOption:', aOption.listenLanguage);
            this.language = aOption.listenLanguage;
        }
        return 0;
    }


    /**
     * Optionen uebertragen in ListenOptionen
     *
     * @protected
     * @param {ListenServiceOptionInterface} aOption - optionale Parameter
     * @return {any} Rueckgabe fuer Bot Optionen
     */

    protected _mapOption( aOption: ListenServiceOptionInterface ): any {
        // Optionen uebertragen
        const option = super._mapOption( aOption ) as ListenServiceOptionInterface;
        if ( !aOption ) {
            return option;
        }
        // Sprache uebertragen
        if ( typeof aOption.listenLanguage === 'string' ) {
            option.listenLanguage = aOption.listenLanguage;
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
     * @return {*} Rueckgabe der Listen-Instanz
     */

    protected _createComponent( aComponentName: string, aOption: any ): any {
        // console.log('ListenService._createComponent:', aComponentName, aOption);
        this.mListen = ListenFactory.create( aComponentName, aOption );
        // console.log('ListenService._createComponent:', typeof this.mListen);
        return this.mListen;
    }


    /**
     * Initialisierung des Service
     *
     * @param {ListenServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} errorCode(0,-1)
     */

    init( aOption?: ListenServiceOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param {ListenServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: ListenServiceOptionInterface ): number {
        return super.reset( aOption );
    }


    // Event-Funktionen


    /**
     * Anbindung der Events
     *
     * @protected
     * @param {string} aServiceName - Name  des Services
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _addAllEvent( aServiceName: string ): number {
        if ( super._addAllEvent( aServiceName ) !== 0 ) {
            return -1;
        }

        this.mListen.addListenResultEvent( aServiceName, (aResult: string) => {
            this.mListenResultEvent.emit(aResult);
            return 0;
        });

        return 0;
    }


    /**
     * Ereignis fuer Sprachausgabe erkannten Text
     *
     * @readonly
     * @return {EventEmitter} listenResultEvent
     */

    get resultEvent() {
        return this.mListenResultEvent;
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     */

    isASR(): boolean {
        // console.log('ListenService.setASR:', aASRName);
        if ( !this.mListen ) {
            return false;
        }
        return this.mListen.isASR();
    }

    /**
     * ASR fuer die Spracheingabe einstellen
     *
     * @param {string} aASRName - einzustellende TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        // console.log('ListenService.setASR:', aASRName);
        if ( !this.mListen ) {
            this._error('setASR', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.setASR( aASRName );
    }


    /**
     * Rueckgabe der eingestellten ASR
     *
     * @return {string} eingestellte ASR
     */

    getASR(): string {
        if ( !this.mListen ) {
            this._error('getASR', 'keine Listen-Komponente vorhanden');
            return '';
        }
        return this.mListen.getASR();
    }


    /**
     * Eigenschaft ASR eintragen fuer die Spracheingabe.
     *
     * @param {string} aASRName - Name der ASR
     */

    set asr( aASRName: string ) {
        this.setASR( aASRName );
    }


    /**
     * Eigenschaft ASR zurueckgeben.
     *
     * @return {string} Name der ASR
     */

    get asr(): string {
        return this.getASR();
    }


    /**
     * Liste aller verfuegbaren ASRs zurueckgeben
     *
     * @return {Array<string>} Liste der vorhandenen ASRs zurueckgeben oder leere Liste
     */

    getASRList(): Array<string> {
        if ( !this.mListen ) {
            this._error('getASRList', 'keine Listen-Komponente vorhanden');
            return [];
        }
        return this.mListen.getASRList();
    }


    /**
     * Eigenschaft alle verfuegbaren ASR zurueckgeben
     *
     * @return {Array<string>} Liste aller ASR zurueckgeben
     */


    get asrs(): Array<string> {
        return this.getASRList();
    }


    // Language-Funktionen


    /**
     * Sprache fuer die Spracheingabe einstellen
     *
     * @param {string} aLanguage - einzustellende Sprache als Kurzname ('de' oder 'en')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        if ( !this.mListen ) {
            this._error('setLanguage', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.setLanguage( aLanguage );
    }


    /**
     * Rueckgabe der eingestellten Sprache
     *
     * @return {string} eingestellte Sprache als Kurzstring ('de' oder 'en')
     */

    getLanguage(): string {
        if ( !this.mListen ) {
            this._error('getLanguage', 'keine Listen-Komponente vorhanden');
            return '';
        }
        return this.mListen.getLanguage();
    }


    /**
     * Eigenschaft Language eintragen fuer die Sprachausgabe.
     *
     * @param {string} aLanguageName - Name der Sprache in Kurzform (de, en)
     */

    set language( aLanguageName: string ) {
        this.setLanguage( aLanguageName );
    }


    /**
     * Eigenschaft Language zurueckgeben.
     *
     * @return {string} aLanguageName - Name der Sprache in Kurzform (de, en)
     */

    get language(): string {
        return this.getLanguage();
    }


    /**
     * Liste aller verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en) oder leere Liste
     */

    getLanguageList(): Array<string> {
        if ( !this.mListen ) {
            this._error('getLanguageList', 'keine Listen-Komponente vorhanden');
            return [];
        }
        return this.mListen.getLanguageList();
    }


    /**
     * Eigenschaft alle verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en)
     */


    get languages(): Array<string> {
        return this.getLanguageList();
    }


    // Listen-Funktionen


    /**
     * Spracheingabe abbrechen
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    abort(): number {
        if ( !this.mListen ) {
            this._error('abort', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.abort();
    }

}
