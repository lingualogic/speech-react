/** @packageDocumentation
 * Unit-Test von DialogService
 *
 * Letzte Aenderung: 26.03.2019
 *
 * getestet unter:  Chrome(Mac), Firefox(Mac), Opera(Mac), Safari(Mac)
 *
 * @module speech/dialog
 * @author SB
 */


// speech-framework

import {
    DialogFactory,
    SpeechMain
} from 'speech-framework';


// dialog

import { DialogServiceConfig } from './dialog-service-config';
import { DialogServiceOptionInterface } from './dialog-service-option.interface';
import { DialogService } from './dialog-service';


// Dialogdaten

const dialogData = `# TestDialog
# Version 1.0
# Datum 15.09.2018

DIALOG main

	STATE home
		SPEAK 4, Hallo! Hier folgt eine Aktion.
		ACTION animate, Button, index

    STATE testState
		SPEAK 4, Hallo! Hier folgt eine andere Aktion.
		ACTION animate, Button, index2


 DIALOG testDialog

    STATE home
        SPEAK 4, Hallo! Hier folgt eine dritte Aktion.
        ACTION animate, Button, index3

`;


// Testklasse

class TestDialogService extends DialogService {

    constructor() {
        DialogService.setConstructorInitOff();
        super();
    }

    setOption( aOption: any): void {
        this._setOption( aOption );
    }

    mapOption( aOption: any): any {
        return this._mapOption( aOption );
    }

    error( aFuncName: string, aErrorText: string ): void {
        this._error( aFuncName, aErrorText );
    }

    exception( aFuncName: string, aException: any ): void {
        this._exception( aFuncName, aException );
    }

    addAllEvent(): number {
        return this._addAllEvent( this.getName());
    }

    get errorOutputFlag() {
        return this.mErrorOutputFlag;
    }

}


// Tests

describe('DialogService', () => {

    const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    let dialogService: TestDialogService = null;

    beforeAll(() => {
        console.log('DialogService Unit-Tests gestartet...');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineTimeout;
    });

    beforeEach(() => {
        DialogServiceConfig.errorOutputFlag = false;
        dialogService = new TestDialogService();
        dialogService.setErrorOutputOff();
    });

    afterEach(() => {
        dialogService.setErrorOutputOff();
        dialogService.reset();
        dialogService = null;
        SpeechMain.done();
    });

    // setConstructorInitOn/Off

    describe('Funktion setConstructorInitOn/Off', () => {

        it('sollte constructorInitFlag ein/ausschalten', () => {
            DialogService.setConstructorInitOn();
            expect( DialogService.isConstructorInit()).toBe( true );
            DialogService.setConstructorInitOff();
            expect( DialogService.isConstructorInit()).toBe( false );
            DialogService.setConstructorInitOn();
            expect( DialogService.isConstructorInit()).toBe( true );
        });

    });

    // getConfig

    describe('Function getConfig', () => {

        it('sollte dialogServiceConfig zurueckgeben', () => {
            const config = DialogService.getConfig();
            expect( config ).toBe( DialogServiceConfig );
        });

    });

    // constructor

    describe('Funktion constructor', () => {

        it('sollte erzeugt sein, ohne init auszufuehren', () => {
            expect( dialogService ).toBeTruthy();
            expect( dialogService.isInit()).toBe( false );
        });

        it('sollte dialog vorhanden sein, wenn mit init erzeugt', () => {
            DialogService.setConstructorInitOn();
            const service = new DialogService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( DialogServiceConfig.activeFlag );
            expect( service.dialog ).toEqual( DialogServiceConfig.dialogName );
            expect( service.state ).toEqual( DialogServiceConfig.dialogRootState );
            expect( service.path ).toEqual( DialogServiceConfig.dialogFilePath );
            expect( service.file ).toEqual( DialogServiceConfig.dialogFileName );
            expect( service.errorOutput ).toEqual( DialogServiceConfig.errorOutputFlag );
            service.reset();
            service.setErrorOutputOff();
        });

        it('sollte dialog vorhanden sein, wenn mit init erzeugt und config angepasst', () => {
            const config = DialogService.getConfig();
            config.dialogName = 'TestDialog';
            config.dialogRootState = 'TestState';
            config.dialogLoadFlag = false;
            config.dialogFilePath = 'TestPath';
            config.dialogFileName = 'TestFile';
            config.errorOutputFlag = true;
            DialogService.setConstructorInitOn();
            const service = new DialogService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( true );
            expect( service.dialog ).toEqual( 'TestDialog' );
            expect( service.state ).toEqual( 'TestState' );
            expect( service.path ).toEqual( 'TestPath' );
            expect( service.file ).toEqual( 'TestFile' );
            expect( service.errorOutput ).toEqual( true );
            service.reset();
            service.setErrorOutputOff();
        });

    });

    // _setOption

    describe('Funktion _setOption', () => {

        it('sollte activeFlag setzen, wenn option activeFlag', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.active ).toBe( true );
            dialogService.setOption({ activeFlag: false });
            expect( dialogService.active ).toBe( false );
            dialogService.setOption({ activeFlag: true });
            expect( dialogService.active ).toBe( true );
        });

        it('sollte dialogName setzen, wenn option dialogName', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.setOption({ dialogName: 'TestDialog' });
            expect( dialogService.dialog ).toEqual( 'TestDialog' );
        });

        it('sollte dialogState setzen, wenn option dialogRootState', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.setOption({ dialogRootState: 'TestDialogState' });
            expect( dialogService.state ).toEqual( 'TestDialogState' );
        });

        it('sollte dialogFilePath setzen, wenn option dialogFilePath', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.setOption({ dialogFilePath: 'TestDialogPath' });
            expect( dialogService.path ).toEqual( 'TestDialogPath' );
        });

        it('sollte dialogFileName setzen, wenn option dialogFileName', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.setOption({ dialogFileName: 'TestDialogFile' });
            expect( dialogService.file ).toEqual( 'TestDialogFile' );
        });

        it('sollte errorOutput auf true setzen, wenn option errorOutput true', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.setOption({ errorOutputFlag: true });
            expect( dialogService.errorOutputFlag).toBe( true );
            expect( dialogService.errorOutput ).toBe( true );
        });

        it('sollte errorOutput auf false setzen, wenn option errorOutput false', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.setOption({ errorOutputFlag: false });
            expect( dialogService.errorOutputFlag).toBe( false );
            expect( dialogService.errorOutput ).toBe( false );
        });

    });

    // _mapOption

    describe('Funktion _mapOption', () => {

        it('sollte dialogName zurueckgeben, wenn option dialogName', () => {
            const option = dialogService.mapOption({ dialogName: 'TestDialog' });
            expect( option ).toEqual({ dialogName: 'TestDialog', errorOutputFlag: dialogService.errorOutputFlag });
        });

        it('sollte dialogRootState zurueckgeben, wenn option dialogRootState', () => {
            const option = dialogService.mapOption({ dialogRootState: 'TestDialogState' });
            expect( option ).toEqual({ dialogRootState: 'TestDialogState', errorOutputFlag: dialogService.errorOutputFlag });
        });

        it('sollte dialogLoadFlag zurueckgeben, wenn option dialogLoadFlag', () => {
            const option = dialogService.mapOption({ dialogLoadFlag: true });
            expect( option ).toEqual({ dialogLoadFlag: true, errorOutputFlag: dialogService.errorOutputFlag });
        });

        it('sollte dialogFilePath zurueckgeben, wenn option dialogFilePath', () => {
            const option = dialogService.mapOption({ dialogFilePath: 'TestFilePath' });
            expect( option ).toEqual({ dialogFilePath: 'TestFilePath', errorOutputFlag: dialogService.errorOutputFlag });
        });

        it('sollte dialogFileName zurueckgeben, wenn option dialogFileName', () => {
            const option = dialogService.mapOption({ dialogFileName: 'TestFileName' });
            expect( option ).toEqual({ dialogFileName: 'TestFileName', errorOutputFlag: dialogService.errorOutputFlag });
        });

        it('sollte errorOutput true zurueckgeben, wenn option errorOutput true', () => {
            const option = dialogService.mapOption({ errorOutputFlag: true });
            expect( option ).toEqual({ errorOutputFlag: true });
            expect( dialogService.errorOutputFlag).toBe( true );
        });

        it('sollte errorOutput false zurueckgeben, wenn option errorOutput false', () => {
            const option = dialogService.mapOption({ errorOutputFlag: false });
            expect( option ).toEqual({ errorOutputFlag: false });
            expect( dialogService.errorOutputFlag ).toBe( false );
        });

    });

    // init

    describe('Funktion init', () => {

        it('sollte -1 zurueckgeben, wenn dialog nicht erzeugt', () => {
            const botCreateFunc = DialogFactory.create;
            DialogFactory.create = () => null;
            let errorText = '';
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                errorText = aError.message;
            });
            expect( dialogService.init()).toBe( -1 );
            expect( dialogService.isInit()).toBe( false );
            expect( dialogService.active ).toBe( false );
            expect( dialogService.path ).toEqual( '' );
            expect( dialogService.file ).toEqual( '' );
            expect( dialogService.dialog ).toEqual( '' );
            expect( dialogService.state ).toEqual( '' );
            expect(errorText).toEqual( '' );
            DialogFactory.create = botCreateFunc;
        });

        it('sollte 0 zurueckgeben, wenn init erfolgreich', () => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                console.log('DialogServiceSpec.init:', aError.message);
                fail('sollte nicht aufgerufen werden');
            });
            expect( dialogService.isInit()).toBe( false );
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.isInit()).toBe( true );
            expect( dialogService.active ).toBe( true );
            expect( dialogService.path ).toEqual( 'assets/' );
            expect( dialogService.file ).toEqual( 'speech.def' );
            expect( dialogService.dialog ).toEqual( 'main' );
            expect( dialogService.state ).toEqual( 'root' );
            errorEvent.unsubscribe();
        });

        it('sollte 0 zurueckgeben, wenn init zweimal aufgerufen wird', () => {
            expect( dialogService.init()).toBe( 0 );
            const option: DialogServiceOptionInterface = {
                dialogFilePath: 'TestPath',
                dialogFileName: 'TestFile',
                dialogName: 'TestDialog',
                dialogRootState: 'TestState',

            };
            expect( dialogService.init( option )).toBe( 0 );
            expect( dialogService.path ).toEqual( 'TestPath' );
            expect( dialogService.file ).toEqual( 'TestFile' );
            expect( dialogService.dialog ).toEqual( 'TestDialog' );
            expect( dialogService.state ).toEqual( 'TestState' );
        });

        it('sollte 0 zurueckgeben, wenn init zweimal aufgerufen wird, mit active false', () => {
            let callCount = 0;
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                callCount += 1;
                // console.log('BotServiceSpec.init:', callCount, aError.message);
                if ( callCount === 1 ) {
                    expect( aError.message ).toEqual( 'DialogComponent.setDialog: Komponente ist nicht aktiviert' );
                }
                if ( callCount === 2 ) {
                    expect( aError.message ).toEqual( 'DialogComponent.setDialogState: Komponente ist nicht aktiviert' );
                }
                if ( callCount === 3 ) {
                    expect( aError.message ).toEqual( 'DialogComponent.setDialogFilePath: Komponente ist nicht aktiviert' );
                }
                if ( callCount === 4 ) {
                    expect( aError.message ).toEqual( 'DialogComponent.setDialogFileName: Komponente ist nicht aktiviert' );
                    errorEvent.unsubscribe();
                }
            });
            expect( dialogService.init()).toBe( 0 );
            const option: DialogServiceOptionInterface = {
                activeFlag: false,
                dialogFilePath: 'TestPath',
                dialogFileName: 'TestFile',
                dialogName: 'TestDialog',
                dialogRootState: 'TestState',

            };
            expect( dialogService.init( option )).toBe( 0 );
            expect( dialogService.active ).toBe( false );
            // Werte sind nicht gesetzt, weil dialog deaktiviert ist !
            expect( dialogService.path ).toEqual( 'assets/' );
            expect( dialogService.file ).toEqual( 'speech.def' );
            expect( dialogService.dialog ).toEqual( 'main' );
            expect( dialogService.state ).toEqual( 'root' );
        });

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte -1 zurueckgeben, wenn ohne init aufgerufen', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual('DialogService.reset: keine Komponente vorhanden');
                done();
            });
            expect( dialogService.reset()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                fail('sollte nicht aufgerufen werden');
            });
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.reset()).toBe( 0 );
            errorEvent.unsubscribe();
        });

        it('sollte neue optionen eintragen, wenn optionen uebergeben wurden', () => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                fail('sollte nicht aufgerufen werden');
            });
            expect( dialogService.init()).toBe( 0 );
            const option: DialogServiceOptionInterface = {
                dialogName: 'TestDialog',
                errorOutputFlag: true
            };
            expect( dialogService.reset( option )).toBe( 0 );
            expect( dialogService.dialog ).toEqual( 'TestDialog' );
            expect( dialogService.errorOutput ).toBe( true );
            errorEvent.unsubscribe();
        });

    });

    // _addAllEvent

    describe('Funktion _addAllEvent', () => {

        it('should return -1, if no init', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'DialogService._addAllEvent: keine Komponente vorhanden' );
                done();
            });
            expect( dialogService.addAllEvent()).toBe( -1 );
        });

        it('should return 0, if init', () => {
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.addAllEvent()).toBe( 0 );
        });

    });

    // xxxEvent

    describe('Eigenschaft xxxEvent', () => {

        it('sollte alle Eventfunktionen zurueckgeben', () => {
            expect( dialogService.setDialogEvent ).toBeTruthy();
            expect( dialogService.parseEvent ).toBeTruthy();
            expect( dialogService.startEvent ).toBeTruthy();
            expect( dialogService.stopEvent ).toBeTruthy();
            expect( dialogService.setStateEvent ).toBeTruthy();
            expect( dialogService.actionEvent ).toBeTruthy();
            expect( dialogService.actionStopEvent ).toBeTruthy();
            expect( dialogService.speakEvent ).toBeTruthy();
            expect( dialogService.speakStopEvent ).toBeTruthy();
            expect( dialogService.errorEvent ).toBeTruthy();
        });

    });

    // setPath

    describe('Funktion setPath', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.setPath: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.setPath( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.setPath( 'TestPath' )).toBe( 0 );
            expect( dialogService.getPath()).toEqual( 'TestPath' );
        });

    });

    // getPath

    describe('Funktion getPath', () => {

        it('sollte leeren pfad zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.getPath: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.getPath()).toBe( '' );
        });

        it('sollte default pfad zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.getPath()).toBe( 'assets/' );
        });

    });

    // path

    describe('Eigenschaft path', () => {

        it('sollte leeren Pfad zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toBe( 'DialogService.getPath: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.path ).toEqual( '' );
        });

        it('sollte Pfad nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.setPath: keine Dialog-Komponente vorhanden' );
                done();
            });
            dialogService.path = 'TestPath';
        });

        it('sollte Pfad setzen, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            dialogService.path = 'TestPath';
            expect( dialogService.path ).toEqual( 'TestPath' );
        });

    });

    // setFile

    describe('Funktion setFile', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.setFile: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.setFile( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.setFile( 'TestPath' )).toBe( 0 );
            expect( dialogService.getFile()).toEqual( 'TestPath' );
        });

    });

    // getFile

    describe('Funktion getFile', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.getFile: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.getFile()).toBe( '' );
        });

        it('sollte default namen zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.getFile()).toEqual( 'speech.def' );
        });

    });

    // file

    describe('Eigenschaft file', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.getFile: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.file ).toEqual( '' );
        });

        it('sollte Namen nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'DialogService.setFile: keine Dialog-Komponente vorhanden' );
                done();
            });
            dialogService.file = 'TestFile';
        });

        it('sollte Namen setzen, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            dialogService.file = 'TestFile';
            expect( dialogService.file ).toEqual( 'TestFile' );
        });

    });

    // clearDialog

    describe('Funktion clearDialog', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.clearDialog: keine Dialog-Komponente vorhanden' );
                done();
            });
            expect( dialogService.clearDialog()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.clearDialog()).toBe( 0 );
        });

    });

    // setDialog

    describe('Funktion setDialog', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.setDialog: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.setDialog( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', (done) => {
            const setDialogEvent = dialogService.setDialogEvent.subscribe((aDialogName: string) => {
                setDialogEvent.unsubscribe();
                expect( aDialogName ).toEqual( 'TestDialog' );
                done();
                return 0;
            });
            expect( dialogService.init()).toBe(0);
            expect( dialogService.setDialog( 'TestDialog' )).toBe( 0 );
            expect( dialogService.getDialog()).toBe( 'TestDialog' );
        });

    });

    // getDialog

    describe('Funktion getDialog', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.getDialog: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.getDialog()).toEqual( '' );
        });

        it('sollte default namen zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.getDialog()).toEqual( 'main' );
        });

    });

    // dialog

    describe('Eigenschaft dialog', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.getDialog: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( dialogService.dialog ).toEqual( '' );
        });

        it('sollte Dialog nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.setDialog: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            dialogService.dialog = '';
        });

        it('sollte Dialog setzen, wenn init aufgerufen wurde', (done) => {
            const setDialogEvent = dialogService.setDialogEvent.subscribe((aDialogName: string) => {
                setDialogEvent.unsubscribe();
                expect( aDialogName ).toEqual( 'TestDialog' );
                done();
                return 0;
            });
            expect( dialogService.init()).toBe(0);
            dialogService.dialog = 'TestDialog';
            expect( dialogService.dialog ).toEqual( 'TestDialog' );
        });

    });

    // parse

    describe('Funktion parse', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.parse: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( dialogService.parse( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und gueltige dialog daten', (done) => {
            const parseEvent = dialogService.parseEvent.subscribe(() => {
                parseEvent.unsubscribe();
                done();
                return 0;
            });
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.parse( dialogData )).toBe( 0 );
        });

    });

    // parseFile

    describe('Funktion parseFile', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.parseFile: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( dialogService.parseFile( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und gueltige dialogdatei', (done) => {
            const parseEvent = dialogService.parseEvent.subscribe(() => {
                parseEvent.unsubscribe();
                done();
                return 0;
            });
            expect( dialogService.init()).toBe( 0 );
            dialogService.path = 'assets/speech/';
            expect( dialogService.parseFile()).toBe( 0 );
        });

    });

    // start

    describe('Funktion start', () => {

        it('sollte -1 zurueckgeben, wenn init aufgerufen wurden und kein dialog', (done) => {
            const startEvent = dialogService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                done.fail('start should not emit');
                return 0;
            });
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                // console.log('===> botServiceSpec: errorEvent ', aError);
                expect( aError.message ).toEqual('InterpreterPlugin.startDialog: kein DialogState vorhanden');
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                done();
                return 0;
            });
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.clearDialog()).toBe( 0 );
            expect( dialogService.start()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und ein gueltiger dialog', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> BotServiceSpec.startEvent: errorEvent', aError.message);
                done.fail('error should not emit');
                return 0;
            });
            const startEvent = dialogService.startEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: startEvent');
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                expect( dialogService.stop()).toBe(0);
                done();
                return 0;
            });
            const parseEvent = dialogService.parseEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: parseEvent');
                parseEvent.unsubscribe();
                expect( dialogService.start()).toBe( 0 );
                return 0;
            });
            expect( dialogService.init({ dialogRootState: 'home' })).toBe( 0 );
            expect( dialogService.clearDialog()).toBe( 0 );
            expect( dialogService.parse(dialogData)).toBe( 0 );
        });

    });

    // stop

    describe('Funktion stop', () => {

        it('should return 0, if init', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> BotServiceSpec.stopEvent: Error=', aError);
                done.fail('should not call');
                return 0;
            });
            const startEvent = dialogService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                expect(dialogService.stop()).toBe(0);
                return 0;
            });
            const stopEvent = dialogService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            const parseEvent = dialogService.parseEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: parseEvent');
                parseEvent.unsubscribe();
                expect( dialogService.start()).toBe( 0 );
                return 0;
            });
            expect( dialogService.init({ dialogRootState: 'home' })).toBe( 0 );
            expect( dialogService.parse(dialogData)).toBe( 0 );
        });

    });

    // toggle

    describe('Funktion toggle', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.toggle: keine Dialog-Komponente vorhanden' );
                errorEvent.unsubscribe();
                done();
                return 0;
            });
            expect( dialogService.toggle()).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn init aufgerufen wurden und kein dialog', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                // console.log('===> botServiceSpec: errorEvent ', aError);
                expect( aError.message ).toEqual('InterpreterPlugin.startDialog: kein DialogState vorhanden');
                errorEvent.unsubscribe();
                done();
                return 0;
            });
            const startEvent = dialogService.startEvent.subscribe(() => {
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                done.fail('start should not emit');
                return 0;
            });
            expect( dialogService.init()).toBe( 0 );
            expect( dialogService.clearDialog()).toBe( 0 );
            expect( dialogService.toggle()).toBe( -1 );
            startEvent.unsubscribe();
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und ein gueltiger dialog', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> BotServiceSpec.startEvent: errorEvent', aError.message);
                done.fail('error should not emit');
                return 0;
            });
            const startEvent = dialogService.startEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: startEvent');
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                expect( dialogService.toggle()).toBe(0);
                done();
                return 0;
            });
            const parseEvent = dialogService.parseEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: parseEvent');
                parseEvent.unsubscribe();
                expect( dialogService.toggle()).toBe( 0 );
                return 0;
            });
            expect( dialogService.init({ dialogRootState: 'home' })).toBe( 0 );
            expect( dialogService.clearDialog()).toBe( 0 );
            expect( dialogService.parse(dialogData)).toBe( 0 );
        });

    });

    // setState

    describe('Funktion setState', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.setState: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.setState( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', (done) => {
            const setStateEvent = dialogService.setStateEvent.subscribe((aStateName: string) => {
                setStateEvent.unsubscribe();
                expect( aStateName ).toEqual( 'TestState' );
                done();
                return 0;
            });
            expect( dialogService.init()).toBe(0);
            expect( dialogService.setState( 'TestState' )).toBe( 0 );
            expect( dialogService.getState()).toBe( 'TestState' );
        });

    });

    // getState

    describe('Funktion getState', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.getState: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.getState()).toEqual( '' );
        });

        it('sollte default namen zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.getState()).toEqual( 'root' );
        });

    });

    // state

    describe('Eigenschaft state', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.getState: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( dialogService.state ).toEqual( '' );
        });

        it('sollte State nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.setState: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            dialogService.state = '';
        });

        it('sollte State setzen, wenn init aufgerufen wurde', (done) => {
            const setStateEvent = dialogService.setStateEvent.subscribe((aStateName: string) => {
                setStateEvent.unsubscribe();
                expect( aStateName ).toEqual( 'TestState' );
                done();
                return 0;
            });
            expect( dialogService.init()).toBe(0);
            dialogService.state = 'TestState';
            expect( dialogService.state ).toEqual( 'TestState' );
        });

    });

    // setStateContext

    describe('Funktion setStateContext', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.setStateContext: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.setStateContext( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.setStateContext({ property: {}})).toBe( 0 );
        });

    });

    // context

    describe('Eigenschaft context', () => {

        it('sollte Kontext nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.setStateContext: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            dialogService.context = '';
        });

        it('sollte Kontext setzen, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            dialogService.context = { property: {}};
        });

    });

    // clearContext

    describe('Funktion clearContext', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.clearContext: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.clearContext()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.clearContext()).toBe( 0 );
        });

    });

    // addContextElement

    describe('Funktion addContextElement', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.addContextElement: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.addContextElement( '', '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.addContextElement( 'TestElement', 'TestContext' )).toBe( 0 );
        });

    });

    // removeContextElement

    describe('Funktion removeContextElement', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = dialogService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'DialogService.removeContextElement: keine Dialog-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(dialogService.removeContextElement( '', '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( dialogService.init()).toBe(0);
            expect( dialogService.removeContextElement( 'TestElement', 'TestContext' )).toBe( 0 );
        });

    });

});


