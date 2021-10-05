/** @packageDocumentation
 * Unit-Test von BotService
 *
 * Letzte Aenderung: 23.01.2019
 *
 * getestet unter:  Chrome(Mac), Firefox(Mac), Opera(Mac), Safari(Mac)
 *
 * @module speech/bot
 * @author SB
 */


// speech-framework

import {
    BotFactory,
    SpeechMain
} from 'speech-framework';


// bot

import { BotServiceConfig } from './bot-service-config';
import { BotServiceOptionInterface } from './bot-service-option.interface';
import { BotService } from './bot-service';


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

class TestBotService extends BotService {

    constructor() {
        BotService.setConstructorInitOff();
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

describe('BotService', () => {

    const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    let botService: TestBotService = null;

    beforeAll(() => {
        console.log('BotService Unit-Tests gestartet...');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineTimeout;
    });

    beforeEach(() => {
        BotServiceConfig.errorOutputFlag = false;
        botService = new TestBotService();
        botService.setErrorOutputOff();
    });

    afterEach(() => {
        botService.setErrorOutputOff();
        botService.reset();
        botService = null;
        SpeechMain.done();
    });

    // setConstructorInitOn/Off

    describe('Funktion setConstructorInitOn/Off', () => {

        it('sollte constructorInitFlag ein/ausschalten', () => {
            BotService.setConstructorInitOn();
            expect( BotService.isConstructorInit()).toBe( true );
            BotService.setConstructorInitOff();
            expect( BotService.isConstructorInit()).toBe( false );
            BotService.setConstructorInitOn();
            expect( BotService.isConstructorInit()).toBe( true );
        });

    });

    // getConfig

    describe('Function getConfig', () => {

        it('sollte botServiceConfig zurueckgeben', () => {
            const config = BotService.getConfig();
            expect( config ).toBe( BotServiceConfig );
        });

    });

    // constructor

    describe('Funktion constructor', () => {

        it('sollte erzeugt sein, ohne init auszufuehren', () => {
            expect( botService ).toBeTruthy();
            expect( botService.isInit()).toBe( false );
        });

        it('sollte bot vorhanden sein, wenn mit init erzeugt', () => {
            BotService.setConstructorInitOn();
            const service = new BotService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( BotServiceConfig.activeFlag );
            expect( service.speak ).toBe( BotServiceConfig.speakFlag );
            expect( service.action ).toBe( BotServiceConfig.actionFlag );
            expect( service.dialog ).toEqual( BotServiceConfig.dialogName );
            expect( service.state ).toEqual( BotServiceConfig.dialogRootState );
            expect( service.path ).toEqual( BotServiceConfig.dialogFilePath );
            expect( service.file ).toEqual( BotServiceConfig.dialogFileName );
            expect( service.errorOutput ).toEqual( BotServiceConfig.errorOutputFlag );
            service.reset();
            service.setErrorOutputOff();
        });

        it('sollte bot vorhanden sein, wenn mit init erzeugt und config angepasst', () => {
            const config = BotService.getConfig();
            config.speakFlag = false;
            config.actionFlag = false;
            config.dialogName = 'TestDialog';
            config.dialogRootState = 'TestState';
            config.dialogLoadFlag = false;
            config.dialogFilePath = 'TestPath';
            config.dialogFileName = 'TestFile';
            config.errorOutputFlag = true;
            BotService.setConstructorInitOn();
            const service = new BotService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( true );
            expect( service.speak ).toBe( false );
            expect( service.action ).toBe( false );
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
            expect( botService.init()).toBe(0);
            expect( botService.active ).toBe( true );
            botService.setOption({ activeFlag: false });
            expect( botService.active ).toBe( false );
            botService.setOption({ activeFlag: true });
            expect( botService.active ).toBe( true );
        });

        it('sollte speakFlag setzen, wenn option speakFlag', () => {
            expect( botService.init()).toBe(0);
            expect( botService.speak ).toBe( true );
            botService.setOption({ speakFlag: false });
            expect( botService.speak ).toBe( false );
            botService.setOption({ speakFlag: true });
            expect( botService.speak ).toBe( true );
        });

        it('sollte actionFlag setzen, wenn option actionFlag', () => {
            expect( botService.init()).toBe(0);
            expect( botService.action ).toBe( true );
            botService.setOption({ actionFlag: false });
            expect( botService.action ).toBe( false );
            botService.setOption({ actionFlag: true });
            expect( botService.action ).toBe( true );
        });

        it('sollte dialogName setzen, wenn option dialogName', () => {
            expect( botService.init()).toBe(0);
            botService.setOption({ dialogName: 'TestDialog' });
            expect( botService.dialog ).toEqual( 'TestDialog' );
        });

        it('sollte dialogState setzen, wenn option dialogRootState', () => {
            expect( botService.init()).toBe(0);
            botService.setOption({ dialogRootState: 'TestDialogState' });
            expect( botService.state ).toEqual( 'TestDialogState' );
        });

        it('sollte dialogFilePath setzen, wenn option dialogFilePath', () => {
            expect( botService.init()).toBe(0);
            botService.setOption({ dialogFilePath: 'TestDialogPath' });
            expect( botService.path ).toEqual( 'TestDialogPath' );
        });

        it('sollte dialogFileName setzen, wenn option dialogFileName', () => {
            expect( botService.init()).toBe(0);
            botService.setOption({ dialogFileName: 'TestDialogFile' });
            expect( botService.file ).toEqual( 'TestDialogFile' );
        });

        it('sollte errorOutput auf true setzen, wenn option errorOutput true', () => {
            expect( botService.init()).toBe(0);
            botService.setOption({ errorOutputFlag: true });
            expect( botService.errorOutputFlag).toBe( true );
            expect( botService.errorOutput ).toBe( true );
        });

        it('sollte errorOutput auf false setzen, wenn option errorOutput false', () => {
            expect( botService.init()).toBe(0);
            botService.setOption({ errorOutputFlag: false });
            expect( botService.errorOutputFlag).toBe( false );
            expect( botService.errorOutput ).toBe( false );
        });

    });

    // _mapOption

    describe('Funktion _mapOption', () => {

        it('sollte dialogName zurueckgeben, wenn option dialogName', () => {
            const option = botService.mapOption({ dialogName: 'TestDialog' });
            expect( option ).toEqual({ dialogName: 'TestDialog', errorOutputFlag: botService.errorOutputFlag });
        });

        it('sollte dialogRootState zurueckgeben, wenn option dialogRootState', () => {
            const option = botService.mapOption({ dialogRootState: 'TestDialogState' });
            expect( option ).toEqual({ dialogRootState: 'TestDialogState', errorOutputFlag: botService.errorOutputFlag });
        });

        it('sollte dialogLoadFlag zurueckgeben, wenn option dialogLoadFlag', () => {
            const option = botService.mapOption({ dialogLoadFlag: true });
            expect( option ).toEqual({ dialogLoadFlag: true, errorOutputFlag: botService.errorOutputFlag });
        });

        it('sollte dialogFilePath zurueckgeben, wenn option dialogFilePath', () => {
            const option = botService.mapOption({ dialogFilePath: 'TestFilePath' });
            expect( option ).toEqual({ dialogFilePath: 'TestFilePath', errorOutputFlag: botService.errorOutputFlag });
        });

        it('sollte dialogFileName zurueckgeben, wenn option dialogFileName', () => {
            const option = botService.mapOption({ dialogFileName: 'TestFileName' });
            expect( option ).toEqual({ dialogFileName: 'TestFileName', errorOutputFlag: botService.errorOutputFlag });
        });

        it('sollte errorOutput true zurueckgeben, wenn option errorOutput true', () => {
            const option = botService.mapOption({ errorOutputFlag: true });
            expect( option ).toEqual({ errorOutputFlag: true });
            expect( botService.errorOutputFlag).toBe( true );
        });

        it('sollte errorOutput false zurueckgeben, wenn option errorOutput false', () => {
            const option = botService.mapOption({ errorOutputFlag: false });
            expect( option ).toEqual({ errorOutputFlag: false });
            expect( botService.errorOutputFlag ).toBe( false );
        });

    });

    // init

    describe('Funktion init', () => {

        it('sollte -1 zurueckgeben, wenn bot nicht erzeugt', () => {
            const botCreateFunc = BotFactory.create;
            BotFactory.create = () => null;
            let errorText = '';
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                errorText = aError.message;
            });
            expect( botService.init()).toBe( -1 );
            expect( botService.isInit()).toBe( false );
            expect( botService.active ).toBe( false );
            expect( botService.speak ).toBe( false );
            expect( botService.action ).toBe( false );
            expect( botService.path ).toEqual( '' );
            expect( botService.file ).toEqual( '' );
            expect( botService.dialog ).toEqual( '' );
            expect( botService.state ).toEqual( '' );
            expect(errorText).toEqual( '' );
            BotFactory.create = botCreateFunc;
        });

        it('sollte 0 zurueckgeben, wenn init erfolgreich', () => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                console.log('BotServiceSpec.init:', aError.message);
                fail('sollte nicht aufgerufen werden');
            });
            expect( botService.isInit()).toBe( false );
            expect( botService.init()).toBe( 0 );
            expect( botService.isInit()).toBe( true );
            expect( botService.active ).toBe( true );
            expect( botService.speak ).toBe( true );
            expect( botService.action ).toBe( true );
            expect( botService.path ).toEqual( 'assets/' );
            expect( botService.file ).toEqual( 'speech.def' );
            expect( botService.dialog ).toEqual( 'main' );
            expect( botService.state ).toEqual( 'root' );
            errorEvent.unsubscribe();
        });

        it('sollte 0 zurueckgeben, wenn init zweimal aufgerufen wird', () => {
            expect( botService.init()).toBe( 0 );
            const option: BotServiceOptionInterface = {
                speakFlag: false,
                actionFlag: false,
                dialogFilePath: 'TestPath',
                dialogFileName: 'TestFile',
                dialogName: 'TestDialog',
                dialogRootState: 'TestState',

            };
            expect( botService.init( option )).toBe( 0 );
            expect( botService.speak ).toBe( false );
            expect( botService.action ).toBe( false );
            expect( botService.path ).toEqual( 'TestPath' );
            expect( botService.file ).toEqual( 'TestFile' );
            expect( botService.dialog ).toEqual( 'TestDialog' );
            expect( botService.state ).toEqual( 'TestState' );
        });

        it('sollte 0 zurueckgeben, wenn init zweimal aufgerufen wird, mit active false', () => {
            let callCount = 0;
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                callCount += 1;
                // console.log('BotServiceSpec.init:', callCount, aError.message);
                if ( callCount === 1 ) {
                    expect( aError.message ).toEqual( 'BotComponent.setDialog: Komponente ist nicht aktiviert' );
                }
                if ( callCount === 2 ) {
                    expect( aError.message ).toEqual( 'BotComponent.setDialogState: Komponente ist nicht aktiviert' );
                }
                if ( callCount === 3 ) {
                    expect( aError.message ).toEqual( 'BotComponent.setDialogFilePath: Komponente ist nicht aktiviert' );
                }
                if ( callCount === 4 ) {
                    expect( aError.message ).toEqual( 'BotComponent.setDialogFileName: Komponente ist nicht aktiviert' );
                    errorEvent.unsubscribe();
                }
            });
            expect( botService.init()).toBe( 0 );
            const option: BotServiceOptionInterface = {
                activeFlag: false,
                speakFlag: false,
                actionFlag: false,
                dialogFilePath: 'TestPath',
                dialogFileName: 'TestFile',
                dialogName: 'TestDialog',
                dialogRootState: 'TestState',

            };
            expect( botService.init( option )).toBe( 0 );
            expect( botService.active ).toBe( false );
            expect( botService.speak ).toBe( false );
            expect( botService.action ).toBe( false );
            // Werte sind nicht gesetzt, weil bot deaktiviert ist !
            expect( botService.path ).toEqual( 'assets/' );
            expect( botService.file ).toEqual( 'speech.def' );
            expect( botService.dialog ).toEqual( 'main' );
            expect( botService.state ).toEqual( 'root' );
        });

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte -1 zurueckgeben, wenn ohne init aufgerufen', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual('BotService.reset: keine Komponente vorhanden');
                done();
            });
            expect( botService.reset()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                fail('sollte nicht aufgerufen werden');
            });
            expect( botService.init()).toBe( 0 );
            expect( botService.reset()).toBe( 0 );
            errorEvent.unsubscribe();
        });

        it('sollte neue optionen eintragen, wenn optionen uebergeben wurden', () => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                fail('sollte nicht aufgerufen werden');
            });
            expect( botService.init()).toBe( 0 );
            const option: BotServiceOptionInterface = {
                speakFlag: false,
                actionFlag: false,
                dialogName: 'TestDialog',
                errorOutputFlag: true
            };
            expect( botService.reset( option )).toBe( 0 );
            expect( botService.speak ).toBe( false );
            expect( botService.action ).toBe( false );
            expect( botService.dialog ).toEqual( 'TestDialog' );
            expect( botService.errorOutput ).toBe( true );
            errorEvent.unsubscribe();
        });

    });

    // _addAllEvent

    describe('Funktion _addAllEvent', () => {

        it('should return -1, if no init', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService._addAllEvent: keine Komponente vorhanden' );
                done();
            });
            expect( botService.addAllEvent()).toBe( -1 );
        });

        it('should return 0, if init', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.addAllEvent()).toBe( 0 );
        });

    });

    // xxxEvent

    describe('Eigenschaft xxxEvent', () => {

        it('sollte alle Eventfunktionen zurueckgeben', () => {
            expect( botService.setDialogEvent ).toBeTruthy();
            expect( botService.parseEvent ).toBeTruthy();
            expect( botService.startEvent ).toBeTruthy();
            expect( botService.stopEvent ).toBeTruthy();
            expect( botService.setStateEvent ).toBeTruthy();
            expect( botService.actionEvent ).toBeTruthy();
            expect( botService.actionStopEvent ).toBeTruthy();
            expect( botService.speakEvent ).toBeTruthy();
            expect( botService.speakStopEvent ).toBeTruthy();
            expect( botService.errorEvent ).toBeTruthy();
        });

    });

    // isSpeak

    describe('Funktion isSpeak', () => {

        it('sollte false zurueckgeben, wenn nicht init aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService.isSpeak: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.isSpeak()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde und speak ein', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setSpeakOn()).toBe( 0 );
            expect( botService.isSpeak()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde und speak aus', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setSpeakOff()).toBe( 0 );
            expect( botService.isSpeak()).toBe( false );
        });

    });

    // setSpeakOn

    describe('Funktion setSpeakOn', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService.setSpeakOn: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.setSpeakOn()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setSpeakOn()).toBe( 0 );
            expect( botService.isSpeak()).toBe( true );
        });

    });

    // setSpeakOff

    describe('Funktion setSpeakOff', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService.setSpeakOff: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.setSpeakOff()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setSpeakOff()).toBe( 0 );
            expect( botService.isSpeak()).toBe( false );
        });

    });

    // speak

    describe('Eigenschaft speak', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen und auf true gesetzt wurde', () => {
            botService.speak = true;
            expect( botService.speak ).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen und auf true gesetzt wurde', () => {
            expect( botService.init()).toBe( 0 );
            botService.speak = true;
            expect( botService.speak ).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen und auf false gesetzt wurde', () => {
            expect( botService.init()).toBe( 0 );
            botService.speak = false;
            expect( botService.speak ).toBe( false );
        });

    });

    // isAction

    describe('Funktion isAction', () => {

        it('sollte false zurueckgeben, wenn nicht init aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService.isAction: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.isAction()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde und speak ein', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setActionOn()).toBe( 0 );
            expect( botService.isAction()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde und speak aus', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setActionOff()).toBe( 0 );
            expect( botService.isAction()).toBe( false );
        });

    });

    // setActionOn

    describe('Funktion setActionOn', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService.setActionOn: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.setActionOn()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setActionOn()).toBe( 0 );
            expect( botService.isAction()).toBe( true );
        });

    });

    // setActionOff

    describe('Funktion setActionOff', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toEqual( 'BotService.setActionOff: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.setActionOff()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setActionOff()).toBe( 0 );
            expect( botService.isAction()).toBe( false );
        });

    });

    // action

    describe('Eigenschaft action', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen und auf true gesetzt wurde', () => {
            botService.action = true;
            expect( botService.action ).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen und auf true gesetzt wurde', () => {
            expect( botService.init()).toBe( 0 );
            botService.action = true;
            expect( botService.action ).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen und auf false gesetzt wurde', () => {
            expect( botService.init()).toBe( 0 );
            botService.action = false;
            expect( botService.action ).toBe( false );
        });

    });

    // setDialogFilePath

    describe('Funktion setDialogFilePath', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.setDialogFilePath: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.setDialogFilePath( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setDialogFilePath( 'TestPath' )).toBe( 0 );
            expect( botService.getDialogFilePath()).toEqual( 'TestPath' );
        });

    });

    // getDialogFilePath

    describe('Funktion getDialogFilePath', () => {

        it('sollte leeren pfad zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.getDialogFilePath: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.getDialogFilePath()).toBe( '' );
        });

        it('sollte default pfad zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.getDialogFilePath()).toEqual( 'assets/' );
        });

    });

    // path

    describe('Eigenschaft path', () => {

        it('sollte leeren Pfad zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.getDialogFilePath: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.path ).toEqual( '' );
        });

        it('sollte Pfad nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.setDialogFilePath: keine Bot-Komponente vorhanden' );
                done();
            });
            botService.path = 'TestPath';
        });

        it('sollte Pfad setzen, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            botService.path = 'TestPath';
            expect( botService.path ).toEqual( 'TestPath' );
        });

    });

    // setDialogFileName

    describe('Funktion setDialogFileName', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.setDialogFileName: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.setDialogFileName( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.setDialogFileName( 'TestPath' )).toBe( 0 );
            expect( botService.getDialogFileName()).toEqual( 'TestPath' );
        });

    });

    // getDialogFileName

    describe('Funktion getDialogFileName', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.getDialogFileName: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.getDialogFileName()).toBe( '' );
        });

        it('sollte default namen zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.getDialogFileName()).toEqual( 'speech.def' );
        });

    });

    // file

    describe('Eigenschaft file', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.getDialogFileName: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.file ).toEqual( '' );
        });

        it('sollte Namen nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual( 'BotService.setDialogFileName: keine Bot-Komponente vorhanden' );
                done();
            });
            botService.file = 'TestFile';
        });

        it('sollte Namen setzen, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            botService.file = 'TestFile';
            expect( botService.file ).toEqual( 'TestFile' );
        });

    });

    // clearDialog

    describe('Funktion clearDialog', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.clearDialog: keine Bot-Komponente vorhanden' );
                done();
            });
            expect( botService.clearDialog()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe( 0 );
            expect( botService.clearDialog()).toBe( 0 );
        });

    });

    // setDialog

    describe('Funktion setDialog', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.setDialog: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.setDialog( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', (done) => {
            const setDialogEvent = botService.setDialogEvent.subscribe((aDialogName: string) => {
                setDialogEvent.unsubscribe();
                expect( aDialogName ).toEqual( 'TestDialog' );
                done();
                return 0;
            });
            expect( botService.init()).toBe(0);
            expect( botService.setDialog( 'TestDialog' )).toBe( 0 );
            expect( botService.getDialog()).toBe( 'TestDialog' );
        });

    });

    // getDialog

    describe('Funktion getDialog', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.getDialog: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.getDialog()).toEqual( '' );
        });

        it('sollte default namen zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            expect( botService.getDialog()).toEqual( 'main' );
        });

    });

    // dialog

    describe('Eigenschaft dialog', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.getDialog: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( botService.dialog ).toEqual( '' );
        });

        it('sollte Dialog nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.setDialog: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            botService.dialog = '';
        });

        it('sollte Dialog setzen, wenn init aufgerufen wurde', (done) => {
            const setDialogEvent = botService.setDialogEvent.subscribe((aDialogName: string) => {
                setDialogEvent.unsubscribe();
                expect( aDialogName ).toEqual( 'TestDialog' );
                done();
                return 0;
            });
            expect( botService.init()).toBe(0);
            botService.dialog = 'TestDialog';
            expect( botService.dialog ).toEqual( 'TestDialog' );
        });

    });

    // parse

    describe('Funktion parse', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.parse: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( botService.parse( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und gueltige dialog daten', (done) => {
            const parseEvent = botService.parseEvent.subscribe(() => {
                parseEvent.unsubscribe();
                done();
                return 0;
            });
            expect( botService.init()).toBe( 0 );
            expect( botService.parse( dialogData )).toBe( 0 );
        });

    });

    // parseFile

    describe('Funktion parseFile', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.parseFile: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( botService.parseFile( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und gueltige dialogdatei', (done) => {
            const parseEvent = botService.parseEvent.subscribe(() => {
                parseEvent.unsubscribe();
                done();
                return 0;
            });
            expect( botService.init()).toBe( 0 );
            botService.path = 'assets/speech/';
            expect( botService.parseFile()).toBe( 0 );
        });

    });

    // start

    describe('Funktion start', () => {

        it('sollte -1 zurueckgeben, wenn init aufgerufen wurden und kein dialog', (done) => {
            const startEvent = botService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                done.fail('start should not emit');
                return 0;
            });
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                // console.log('===> botServiceSpec: errorEvent ', aError);
                expect( aError.message ).toEqual('InterpreterPlugin.startDialog: kein DialogState vorhanden');
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                done();
                return 0;
            });
            expect( botService.init()).toBe( 0 );
            expect( botService.clearDialog()).toBe( 0 );
            expect( botService.start()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und ein gueltiger dialog', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> BotServiceSpec.startEvent: errorEvent', aError.message);
                done.fail('error should not emit');
                return 0;
            });
            const startEvent = botService.startEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: startEvent');
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                expect( botService.stop()).toBe(0);
                done();
                return 0;
            });
            const parseEvent = botService.parseEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: parseEvent');
                parseEvent.unsubscribe();
                expect( botService.start()).toBe( 0 );
                return 0;
            });
            expect( botService.init({ dialogRootState: 'home' })).toBe( 0 );
            expect( botService.clearDialog()).toBe( 0 );
            expect( botService.parse(dialogData)).toBe( 0 );
        });

    });

    // stop

    describe('Funktion stop', () => {

        it('should return 0, if init', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> BotServiceSpec.stopEvent: Error=', aError);
                done.fail('should not call');
                return 0;
            });
            const startEvent = botService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                expect(botService.stop()).toBe(0);
                return 0;
            });
            const stopEvent = botService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            const parseEvent = botService.parseEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: parseEvent');
                parseEvent.unsubscribe();
                expect( botService.start()).toBe( 0 );
                return 0;
            });
            expect( botService.init({ dialogRootState: 'home' })).toBe( 0 );
            expect( botService.parse(dialogData)).toBe( 0 );
        });

    });

    // toggle

    describe('Funktion toggle', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.toggle: keine Bot-Komponente vorhanden' );
                errorEvent.unsubscribe();
                done();
                return 0;
            });
            expect( botService.toggle()).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn init aufgerufen wurden und kein dialog', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                // console.log('===> botServiceSpec: errorEvent ', aError);
                expect( aError.message ).toEqual('InterpreterPlugin.startDialog: kein DialogState vorhanden');
                errorEvent.unsubscribe();
                done();
                return 0;
            });
            const startEvent = botService.startEvent.subscribe(() => {
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                done.fail('start should not emit');
                return 0;
            });
            expect( botService.init()).toBe( 0 );
            expect( botService.clearDialog()).toBe( 0 );
            expect( botService.toggle()).toBe( -1 );
            startEvent.unsubscribe();
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und ein gueltiger dialog', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> BotServiceSpec.startEvent: errorEvent', aError.message);
                done.fail('error should not emit');
                return 0;
            });
            const startEvent = botService.startEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: startEvent');
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                expect( botService.toggle()).toBe(0);
                done();
                return 0;
            });
            const parseEvent = botService.parseEvent.subscribe(() => {
                // console.log('===> BotServiceSpec: parseEvent');
                parseEvent.unsubscribe();
                expect( botService.toggle()).toBe( 0 );
                return 0;
            });
            expect( botService.init({ dialogRootState: 'home' })).toBe( 0 );
            expect( botService.clearDialog()).toBe( 0 );
            expect( botService.parse(dialogData)).toBe( 0 );
        });

    });

    // setState

    describe('Funktion setState', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.setState: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.setState( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', (done) => {
            const setStateEvent = botService.setStateEvent.subscribe((aStateName: string) => {
                setStateEvent.unsubscribe();
                expect( aStateName ).toEqual( 'TestState' );
                done();
                return 0;
            });
            expect( botService.init()).toBe(0);
            expect( botService.setState( 'TestState' )).toBe( 0 );
            expect( botService.getState()).toBe( 'TestState' );
        });

    });

    // getState

    describe('Funktion getState', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.getState: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.getState()).toEqual( '' );
        });

        it('sollte default namen zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            expect( botService.getState()).toEqual( 'root' );
        });

    });

    // state

    describe('Eigenschaft state', () => {

        it('sollte leeren namen zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.getState: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( botService.state ).toEqual( '' );
        });

        it('sollte State nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.setState: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            botService.state = '';
        });

        it('sollte State setzen, wenn init aufgerufen wurde', (done) => {
            const setStateEvent = botService.setStateEvent.subscribe((aStateName: string) => {
                setStateEvent.unsubscribe();
                expect( aStateName ).toEqual( 'TestState' );
                done();
                return 0;
            });
            expect( botService.init()).toBe(0);
            botService.state = 'TestState';
            expect( botService.state ).toEqual( 'TestState' );
        });

    });

    // setStateContext

    describe('Funktion setStateContext', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.setStateContext: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.setStateContext( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            expect( botService.setStateContext({ property: {}})).toBe( 0 );
        });

    });

    // context

    describe('Eigenschaft context', () => {

        it('sollte Kontext nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.setStateContext: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            botService.context = '';
        });

        it('sollte Kontext setzen, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            botService.context = { property: {}};
        });

    });

    // clearContext

    describe('Funktion clearContext', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.clearContext: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.clearContext()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            expect( botService.clearContext()).toBe( 0 );
        });

    });

    // addContextElement

    describe('Funktion addContextElement', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.addContextElement: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.addContextElement( '', '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            expect( botService.addContextElement( 'TestElement', 'TestContext' )).toBe( 0 );
        });

    });

    // removeContextElement

    describe('Funktion removeContextElement', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = botService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BotService.removeContextElement: keine Bot-Komponente vorhanden' );
                done();
                return 0;
            });
            expect(botService.removeContextElement( '', '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( botService.init()).toBe(0);
            expect( botService.removeContextElement( 'TestElement', 'TestContext' )).toBe( 0 );
        });

    });

});


