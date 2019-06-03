/**
 * Speak-Service fuer die Integration von Speak in Angular
 *
 * API-Version: 1.3
 * Datum:       21.02.2019
 *
 * Letzte Aenderung: 28.02.2019
 * Status:           gelb
 *
 * @module speech/speak
 * @author SB
 */


// extern

import { EventEmitter } from './../common/event_emitter';


// speech-framework

import {
    SPEAK_COMPONENT_NAME,
    SpeakFactory,
    SpeakInterface
} from 'speech-framework';


// base

import { BaseService } from './../base/base-service';


// speak

import { SPEAK_SERVICE_NAME } from './speak-service-const';
import { SPEAKSERVICE_API_VERSION } from './speak-service-version';
import { SpeakServiceConfig } from './speak-service-config';
import { SpeakServiceOptionInterface } from './speak-service-option.interface';


// Konstante


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

const SPEAK_ASYNC_EVENT = true;


/** @export
 * SpeakService Klasse
 */


export class SpeakService extends BaseService {

    /** definiert die Konfiguration des Service */

    private static speakServiceConfig = SpeakServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Speak-Komponente

    private mSpeak: SpeakInterface = null;

    // Service-Events

    private mSpeakAudioUnlockEvent = new EventEmitter<boolean>( SPEAK_ASYNC_EVENT );


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den Service, False sonst
     */

    static isConstructorInit(): boolean {
        return SpeakService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        SpeakService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        SpeakService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den Service, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des Service aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des Service
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return {SpeakServiceOptionInterface} SpeakServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): SpeakServiceOptionInterface {
        return SpeakService.speakServiceConfig;
    }


    /**
     * Konstruktor
     */

    constructor() {
        super( SPEAK_COMPONENT_NAME, SPEAK_SERVICE_NAME, SPEAKSERVICE_API_VERSION );
        // console.log('SpeakService.constructor: initFlag = ', SpeakService.isConstructorInit(), SpeakService.getConfig());
        if ( SpeakService.isConstructorInit()) {
            if ( this.init( SpeakService.getConfig()) !== 0 ) {
                throw new Error( 'Speak nicht initialisiert' );
            }
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @private
     * @param {SpeakServiceOptionInterface} aOption - optionale Parameter
     */

    protected _setOption( aOption: SpeakServiceOptionInterface ): number {
        // console.log('SpeakService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // Sprache uebertragen
        if ( typeof aOption.speakLanguage === 'string' ) {
            this.language = aOption.speakLanguage;
        }
        // Audioformat uebertragen
        if ( typeof aOption.audioFormat === 'string' ) {
            this.format = aOption.audioFormat;
        }
        // Audiodateiverzeichnis uebertragen
        if ( typeof aOption.audioFilePath === 'string' ) {
            this.path = aOption.audioFilePath;
        }
        // Audioflag uebertragen
        if ( typeof aOption.audioFlag === 'boolean' ) {
            this.audio = aOption.audioFlag;
        }
        return 0;
    }


    /**
     * Optionen uebertragen in SpeakOptionen
     *
     * @protected
     * @param {SpeakServiceOptionInterface} aOption - optionale Parameter
     * @return {any} Rueckgabe fuer Bot Optionen
     */

    protected _mapOption( aOption: SpeakServiceOptionInterface ): any {
        // Optionen uebertragen
        const option = super._mapOption( aOption ) as SpeakServiceOptionInterface;
        if ( !aOption ) {
            return option;
        }
        // Sprache uebertragen
        if ( typeof aOption.speakLanguage === 'string' ) {
            option.speakLanguage = aOption.speakLanguage;
        }
        // Audioformat uebertragen
        if ( typeof aOption.audioFormat === 'string' ) {
            option.audioFormat = aOption.audioFormat;
        }
        // Audiodateiverzeichnis uebertragen
        if ( typeof aOption.audioFilePath === 'string' ) {
            option.audioFilePath = aOption.audioFilePath;
        }
        // Audioflag uebertragen
        if ( typeof aOption.audioFlag === 'boolean' ) {
            option.audioFlag = aOption.audioFlag;
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
     * @return {*} Rueckgabe der Speak-Instanz
     */

    protected _createComponent( aComponentName: string, aOption: any ): any {
        // console.log('SpeakService._createComponent:', aComponentName);
        this.mSpeak = SpeakFactory.create( aComponentName, aOption );
        // console.log('SpeakService._createComponent:', typeof this.mSpeak);
        return this.mSpeak;
    }


    /**
     * Initialisierung des Service
     *
     * @param {SpeakServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: SpeakServiceOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param {SpeakServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: SpeakServiceOptionInterface ): number {
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

        this.mSpeak.addAudioUnlockEvent( aServiceName, (aUnlockFlag: boolean) => {
            this.mSpeakAudioUnlockEvent.emit( aUnlockFlag );
            return 0;
        });

        return 0;
    }


    /**
     * Ereignis fuer Audio-Unlock
     *
     * @readonly
     * @return {EventEmitter} audioUnlockEvent
     */

    get audioUnlockEvent() {
        return this.mSpeakAudioUnlockEvent;
    }


    // Audio-Funktionen


    /**
     * AudioContext entsperren
     *
     * @deprecated
     */

    unlockAudio(): number {
        if ( !this.mSpeak ) {
            this._error('unlockAudio', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.unlockAudio();
    }


    /**
     * pruefen auf entsperrten AudioContext
     */

    isUnlockAudio(): boolean {
        if ( !this.mSpeak ) {
            this._error('isUnlockAudio', 'keine Speak-Komponente vorhanden');
            return false;
        }
        return this.mSpeak.isUnlockAudio();
    }


    /**
     * pruefen, ob Audio fuer Sprachausgabe eingestellt ist
     *
     * @return {boolean} audioFlag - true, es wird zur Sprachausgabe eine Audiodatei abgespielt
     */

    isAudio(): boolean {
        if ( !this.mSpeak ) {
            this._error('isAudio', 'keine Speak-Komponente vorhanden');
            return false;
        }
        return this.mSpeak.isAudio();
    }


    /**
     * Audio fuer Sprachausgabe einschalten
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    setAudioOn(): number {
        if ( !this.mSpeak ) {
            this._error('setAudioOn', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setAudioOn();
    }


    /**
     * Audio fuer Sprachausgabe ausschalten
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    setAudioOff(): number {
        if ( !this.mSpeak ) {
            this._error('setAudioOff', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setAudioOff();
    }


    /**
     * Eigenschaft Audio setzen. Wenn Audio eingeschaltet ist,
     * wird eine Audiodatei fuer Speak abgespielt.
     *
     * @param {boolean} aAudioFlag - True, wenn Audiodatei abgespielt werden soll, False sonst
     */

    set audio( aActionFlag: boolean ) {
        if ( aActionFlag ) {
            this.setAudioOn();
        } else {
            this.setAudioOff();
        }
    }


    /**
     * Eigenschaft Audio zurueckgeben.
     *
     * @readonly
     * @param {boolean} aAudioFlag - True, wenn Audiodatei abgespielt wird, False wenn Sprachsynthese verwendet wird
     */

    get audio() {
        return this.isAudio();
    }


    /**
     * Eintragen des Audioformats fuer die Audiodateien (mp3, wav)
     *
     * @param aAudioFormat - Name des Formats eintragen ('mp3', 'wav')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFormat( aAudioFormat: string ): number {
        if ( !this.mSpeak ) {
            this._error('setAudioFormat', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setAudioFormat( aAudioFormat );
    }


    /**
     * Rueckgabe des aktuell eingestellten Audioformats
     */

    getAudioFormat(): string {
        if ( !this.mSpeak ) {
            this._error('getAudioFormat', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getAudioFormat();
    }


    /**
     * Eigenschaft Format eintragen fuer das Audiodateienformat.
     *
     * @param {string} aFormat - Format fuer die Audiodateien
     */

    set format( aFormat: string ) {
        this.setAudioFormat( aFormat );
    }

    /**
     * Eigenschaft Format zurueckgeben
     *
     * @readonly
     * @return {string} aFormat - Audioformat fuer alle Audiodateien
     */

    get format() {
        return this.getAudioFormat();
    }


    /**
     * Eintragen des Audiodateiverzeichnisses
     *
     * @param {string} aFilePath - Name des Audioverzeichnisses
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFilePath( aFilePath: string ): number {
        if ( !this.mSpeak ) {
            this._error('setAudioFilePath', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setAudioFilePath( aFilePath );
    }


    /**
     * Rueckgabe des aktuell eingestellten Audioverzeichnisses
     *
     * @return {string} Verzeichnis
     */

    getAudioFilePath(): string {
        if ( !this.mSpeak ) {
            this._error('getAudioFilePath', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getAudioFilePath();
    }


    /**
     * Eigenschaft Path eintragen fuer das Audiodateienverzeichnis.
     *
     * @param {string} aPath - lokales Verzeichnis zu den Audiodateien
     */

    set path( aPath: string ) {
        this.setAudioFilePath( aPath );
    }

    /**
     * Eigenschaft Path zurueckgeben
     *
     * @readonly
     * @return {string} aPath - Audioverzeichnis fuer alle Audiodateien
     */

    get path() {
        return this.getAudioFilePath();
    }


    /**
     * Eintragen des Audiodateinamens
     *
     * @param {string} aFileName - Name der Audiodatei (ohne Formatextension)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFileName( aFileName: string ): number {
        if ( !this.mSpeak ) {
            this._error('setAudioFileName', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setAudioFileName( aFileName );
    }


    /**
     * Rueckgabe des aktuell eingestellten Audiodateinamens
     *
     * @return {string} Verzeichnis
     */

    getAudioFileName(): string {
        if ( !this.mSpeak ) {
            this._error('getAudioFileName', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getAudioFileName();
    }


    /**
     * Eigenschaft File eintragen fuer die aktuelle Audiodatei.
     *
     * @param {string} aFileName - Name der Audiodatei
     */

    set file( aFileName: string ) {
        this.setAudioFileName( aFileName );
    }


    /**
     * Eigenschaft File fuer die aktuelle Audiodatei zurueckgeben.
     *
     * @return {string} aFileName - Name der aktuellen Audiodatei
     */

    get file(): string {
        return this.getAudioFileName();
    }


    // TTS-Funktionen


    /**
     * pruefen, ob TTS vorhanden ist
     */

    isTTS(): boolean {
        if ( !this.mSpeak ) {
            return false;
        }
        return this.mSpeak.isTTS();
    }


    /**
     * TTS fuer die Sprachausgabe einstellen
     *
     * @param {string} aTTSName - einzustellende TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number {
        if ( !this.mSpeak ) {
            this._error('setTTS', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setTTS( aTTSName );
    }


    /**
     * Rueckgabe der eingestellten TTS
     *
     * @return {string} eingestellte TTS
     */

    getTTS(): string {
        if ( !this.mSpeak ) {
            this._error('getTTS', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getTTS();
    }


    /**
     * Eigenschaft TTS eintragen fuer die Sprachausgabe.
     *
     * @param {string} aTTSName - Name der TTS
     */

    set tts( aTTSName: string ) {
        this.setTTS( aTTSName );
    }


    /**
     * Eigenschaft TTS zurueckgeben.
     *
     * @return {string} Name der TTS
     */

    get tts(): string {
        return this.getTTS();
    }


    /**
     * Liste aller verfuegbaren TTS zurueckgeben
     *
     * @return {Array<string>} Liste der vorhandenen TTS zurueckgeben oder leere Liste
     */

    getTTSList(): Array<string> {
        if ( !this.mSpeak ) {
            this._error('getTTSList', 'keine Speak-Komponente vorhanden');
            return [];
        }
        return this.mSpeak.getTTSList();
    }


    /**
     * Eigenschaft alle verfuegbaren TTS zurueckgeben
     *
     * @return {Array<string>} Liste aller TTS zurueckgeben
     */


    get ttses(): Array<string> {
        return this.getTTSList();
    }


    // Language-Funktionen


    /**
     * Sprache fuer die Sprachausgabe einstellen
     *
     * @param {string} aLanguage - einzustellende Sprache als Kurzname ('de' oder 'en')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        if ( !this.mSpeak ) {
            this._error('setLanguage', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setLanguage( aLanguage );
    }


    /**
     * Rueckgabe der eingestellten Sprache
     *
     * @return {string} eingestellte Sprache als Kurzstring ('de' oder 'en')
     */

    getLanguage(): string {
        if ( !this.mSpeak ) {
            this._error('getLanguage', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getLanguage();
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
        if ( !this.mSpeak ) {
            this._error('getLanguageList', 'keine Speak-Komponente vorhanden');
            return [];
        }
        return this.mSpeak.getLanguageList();
    }


    /**
     * Eigenschaft alle verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en)
     */


    get languages(): Array<string> {
        return this.getLanguageList();
    }


    // Voice-Funktionen


    /**
     * Stimme fuer die Sprachausgabe einstellen
     *
     * @param {string} aVoice - einzustellende Stimme
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string ): number {
        if ( !this.mSpeak ) {
            this._error('setVoice', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setVoice( aVoice );
    }


    /**
     * Rueckgabe der eingestellten Stimme
     *
     * @return {string} eingestellte Stimme
     */

    getVoice(): string {
        if ( !this.mSpeak ) {
            this._error('getVoice', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getVoice();
    }


    /**
     * Eigenschaft Stimme eintragen fuer die Sprachausgabe.
     *
     * @param {string} aVoiceName - Name der Stimme
     */

    set voice( aVoiceName: string ) {
        this.setVoice( aVoiceName );
    }


    /**
     * Eigenschaft Stimme zurueckgeben.
     *
     * @return {string} Name der Stimme
     */

    get voice(): string {
        return this.getVoice();
    }


    /**
     * Liste aller verfuegbaren Stimmen zurueckgeben
     *
     * @return {Array<string>} Liste aller Stimmen
     */

    getVoiceList(): Array<string> {
        if ( !this.mSpeak ) {
            this._error('getVoiceList', 'keine Speak-Komponente vorhanden');
            return [];
        }
        return this.mSpeak.getVoiceList();
    }


    /**
     * Eigenschaft alle verfuegbaren Stimmen
     *
     * @return {string} Liste aller Stimmen
     */


    get voices(): Array<string> {
        return this.getVoiceList();
    }


    // Speak-Funktionen


    /**
     * Eintragen des Speaktextes
     *
     * @param {string} aText - Text fuer die Sprachausgabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setText( aText: string ): number {
        if ( !this.mSpeak ) {
            this._error('setText', 'keine Speak-Komponente vorhanden');
            return -1;
        }
        return this.mSpeak.setSpeakText( aText );
    }


    /**
     * Rueckgabe des aktuell eingestellten Speaktextes
     *
     * @return {string} Text
     */

    getText(): string {
        if ( !this.mSpeak ) {
            this._error('getText', 'keine Speak-Komponente vorhanden');
            return '';
        }
        return this.mSpeak.getSpeakText();
    }


    /**
     * Eigenschaft Text eintragen fuer die Sprachausgabe.
     *
     * @param {string} aText - Text fuer die Sprachausgabe
     */

    set text( aText: string ) {
        this.setText( aText );
    }


    /**
     * Eigenschaft Text zurueckgeben.
     *
     * @return {string} aText - Text fuer die Sprachausgabe
     */

    get text(): string {
        return this.getText();
    }

}
