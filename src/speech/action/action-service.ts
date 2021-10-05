/** @packageDocumentation
 * ActionService zur Anbindung der Action-Komponente
 *
 * API-Version: 1.0
 * Datum:       15.09.2018
 *
 * Letzte Aenderung: 24.05.2019
 * Status:           gelb
 *
 * @module speech/action
 * @author SB
 */


// extern




// speech-framework

import {
    ACTION_COMPONENT_NAME,
    ActionFactory,
    ActionInterface
} from 'speech-framework';


// base

import { BaseService } from './../base/base-service';


// action

import { ACTION_SERVICE_NAME } from './action-service-const';
import { ACTIONSERVICE_API_VERSION } from './action-service-version';
import { ActionServiceConfig } from './action-service-config';
import { ActionServiceDataInterface } from './action-service-data.interface';
import { ActionServiceOptionInterface } from './action-service-option.interface';


// Konstanten


// Action-Funktionen


/** Definiert die StartAction Funktion fuer eine Dialogaktion */
export type ActionStartFunc = (aAction: ActionServiceDataInterface) => number;
/** Definiert die StopAction Funktion fuer eine Dialogaktion */
export type ActionStopFunc = () => number;


/** @export
 * ActionService Klasse fuer Speech-Angular. Dient der Ausfuehrung von Aktionen
 * in der WebApp.
 */


export class ActionService extends BaseService {

    /** definiert die Konfiguration des Service */

    private static actionServiceConfig = ActionServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Action-Komponente

    private mAction: ActionInterface = null;


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den Service, False sonst
     */

    static isConstructorInit(): boolean {
        return ActionService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        ActionService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        ActionService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den Service, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des Service aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des Service
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return {ActionServiceOptionInterface} ActionServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): ActionServiceOptionInterface {
        return ActionService.actionServiceConfig;
    }


    /**
     * Konstruktor fuer die Initialisierung des ActionService
     */

    constructor() {
        super( ACTION_COMPONENT_NAME, ACTION_SERVICE_NAME, ACTIONSERVICE_API_VERSION );
        // console.log('ActionService.constructor: initFlag = ', ActionService.isConstructorInit(), ActionService.getConfig());
        if ( ActionService.isConstructorInit()) {
            if ( this.init( ActionService.getConfig()) !== 0 ) {
                throw new Error( 'Action nicht initialisiert' );
            }
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @private
     * @param {ActionServiceOptionInterface} aOption - optionale Parameter
     */

    protected _setOption( aOption: ActionServiceOptionInterface ): number {
        // console.log('ActionService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // hier kommen die individuellen Parameter von ActionService hin
    }


    /**
     * Optionen uebertragen in ActionOptionen
     *
     * @protected
     * @param {ActionServiceOptionInterface} aOption - optionale Parameter
     * @return {any} Rueckgabe fuer Bot Optionen
     */

    protected _mapOption( aOption: ActionServiceOptionInterface ): any {
        // Optionen uebertragen
        const option = super._mapOption( aOption ) as ActionServiceOptionInterface;
        if ( !aOption ) {
            return option;
        }
        // hier kommen die individuellen Parameter von ActionService hin
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
        // console.log('ActionService._createComponent:', aComponentName);
        this.mAction = ActionFactory.create( aComponentName, aOption );
        // console.log('ActionService._createComponent:', typeof this.mAction);
        return this.mAction;
    }


    /**
     * Initialisierung des Service
     *
     * @param {ActionServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} errorCode(0,-1)
     */

    init( aOption?: ActionServiceOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param {ActionServiceOptionInterface} aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: ActionServiceOptionInterface ): number {
        return super.reset( aOption );
    }


    // Aktions-Funktionen


    /**
     * Eintragen des Aktionsnamens
     *
     * @param {string} aActionName - Name der auszufuehrenden Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionName( aActionName: string ): number {
        if ( !this.mAction ) {
            this._error('setActionName', 'keine Action-Komponente vorhanden');
            return -1;
        }
        return this.mAction.setActionName( aActionName );
    }


    /**
     * Rueckgabe des aktuell eingestellten Aktionsnamens
     *
     * @return {string} Aktionsname
     */

    getActionName(): string {
        if ( !this.mAction ) {
            this._error('getActionName', 'keine Action-Komponente vorhanden');
            return '';
        }
        return this.mAction.getActionName();
    }


    /**
     * Eigenschaft Action setzen.
     *
     * @param {string} aActionName - Name der auszufuehrenden Aktion
     */

    set action( aActionName: string ) {
        this.setActionName( aActionName );
    }

    /**
     * Eigenschaft Action zurueckgeben
     *
     * @readonly
     * @return {string} ActionName - Name der auszufuehrenden Aktion
     */

    get action() {
        return this.getActionName();
    }


    /**
     * Eintragen des Elementtyps
     *
     * @param {string} aElementype - Name des Elementyps
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setElementType( aElementType: string ): number {
        if ( !this.mAction ) {
            this._error('setElementType', 'keine Action-Komponente vorhanden');
            return -1;
        }
        return this.mAction.setElementType( aElementType );
    }


    /**
     * Rueckgabe des aktuell eingestellten Elementtyps
     *
     * @return {string} Elementtyp
     */

    getElementType(): string {
        if ( !this.mAction ) {
            this._error('getElementType', 'keine Action-Komponente vorhanden');
            return '';
        }
        return this.mAction.getElementType();
    }


    /**
     * Eigenschaft Type setzen.
     *
     * @param {string} aElementType - Name des Elementtyps
     */

    set type( aElementType: string ) {
        this.setElementType( aElementType );
    }

    /**
     * Eigenschaft Type zurueckgeben
     *
     * @readonly
     * @return {string} ElementType - Name des Elementtyps
     */

    get type() {
        return this.getElementType();
    }


    /**
     * Eintragen des Elementnamens
     *
     * @param {string} aElementName - Name des Elements
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setElementName( aElementName: string ): number {
        if ( !this.mAction ) {
            this._error('setElementName', 'keine Action-Komponente vorhanden');
            return -1;
        }
        return this.mAction.setElementName( aElementName );
    }


    /**
     * Rueckgabe des aktuell eingestellten Elementnamens
     *
     * @return {string} Elementname
     */

    getElementName(): string {
        if ( !this.mAction ) {
            this._error('getElementName', 'keine Action-Komponente vorhanden');
            return '';
        }
        return this.mAction.getElementName();
    }


    /**
     * Eigenschaft Element setzen.
     *
     * @param {string} aElementName - Name des Elements
     */

    set element( aElementName: string ) {
        this.setElementName( aElementName );
    }

    /**
     * Eigenschaft Element zurueckgeben
     *
     * @readonly
     * @return {string} ElementName - Name des Elements
     */

    get element() {
        return this.getElementName();
    }


    // Aktionsfunktion-Funktionen


    /**
     * Hinzufuegen einer Aktionsfunktion mit Start- und Stop Callbacks, um eine Aktion unter diesem
     * Namen auszufuehren.
     *
     * @param {string} aFunctionName - Name der Aktionsfunktion
     * @param {ActionStartFunc} aStartActionFunc - Callback-Funktion fuer Start der Aktion
     * @param {ActionStopFunc} aStopActionFunc - Callback-Funktion fuer Stopp der Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addFunction( aFunctionName: string, aStartActionFunc: ActionStartFunc, aStopActionFunc: ActionStopFunc ): number {
        if ( !this.mAction ) {
            this._error( 'addFunction', 'keine Action-Komponente vorhanden' );
            return -1;
        }
        return this.mAction.addFunction( aFunctionName, aStartActionFunc, aStopActionFunc );
    }


    /**
     * Entfernen einer Aktionsfunktion.
     *
     * @param {string} aFunctionName - Name der Aktionsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeFunction( aFunctionName: string ): number {
        if ( !this.mAction ) {
            this._error( 'removeFunction', 'keine Action-Komponente vorhanden' );
            return -1;
        }
        return this.mAction.removeFunction( aFunctionName );
    }


    // Aktionelement-Funktionen


    /**
     * Hinzufuegen eines Aktionselements mit Start- und Stop-Callbacks, um eine Aktion fuer dieses Element
     * auszufuehren.
     *
     * @param {string} aElementName - Name des Aktionselementes
     * @param {ActionStartFunc} aStartActionFunc - Callback-Funktion fuer Start der Aktion zum Element
     * @param {ActionStopFunc} aStopActionFunc - Callback-Funktion fuer Stopp der Aktion zum Element
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addElement( aElementName: string, aStartActionFunc: ActionStartFunc, aStopActionFunc: ActionStopFunc ): number {
        if ( !this.mAction ) {
            this._error( 'addElement', 'keine Action-Komponente vorhanden' );
            return -1;
        }
        return this.mAction.addElement( aElementName, aStartActionFunc, aStopActionFunc );
    }


    /**
     * Entfernen eines Aktionselementes.
     *
     * @param {string} aElementName - Name des Aktionselementes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeElement( aElementName: string ): number {
        if ( !this.mAction ) {
            this._error( 'removeElement', 'keine Action-Komponente vorhanden' );
            return -1;
        }
        return this.mAction.removeElement( aElementName );
    }

}
