/** @packageDocumentation
 * Unit-Test von ListenService
 *
 * Letzter Aenderung: 01.04.2020
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/listen
 * @author SB
 */


// TODO: Umfangreiches Mock zum Nuance-WebSocketServer schreiben, um keine echten Nuance-Credentials
//       einsetzen zu muessen. Die Tests muessen immer lauffaehig sein.


// TODO: NuanceASR ist nicht vorhanden!


// Definiert die Mock-Bibliothek fuer SpeechRecognition

declare var Corti;


// speech-framework

import {
    SpeechMain
} from 'speech-framework';


// listen

import { LISTEN_HTML5_ASR, LISTEN_NUANCE_ASR, LISTEN_DE_LANGUAGE, LISTEN_EN_LANGUAGE } from './listen-service-const';
import { ListenServiceConfig } from './listen-service-config';
import { ListenService } from './listen-service';


// legt fest, ob SpeechRecognition gemockt wird oder nicht.
// wenn der Test nicht gemockt wird, muss der Rechner entsprechend paepariert werden,
// um AudioOutput und AudioInput zu verbinden

// TODO: LISTEN_MOCK_TEST = false Tests sind noch nicht implementiert
const LISTEN_MOCK_TEST = true;
if ( LISTEN_MOCK_TEST ) {
    Corti.patch();
}


// Testklasse

class TestListenService extends ListenService {

    constructor() {
        ListenService.setConstructorInitOff();
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

describe('ListenService', () => {

    let listenService: TestListenService;

    beforeAll(() => {
        console.log('ListenService Unit-Tests gestartet...');
    });

    beforeEach(() => {
        listenService = new TestListenService();
        listenService.setErrorOutputOff();
    });

    afterEach(() => {
        listenService.setErrorOutputOff();
        listenService.reset();
        listenService = null;
        SpeechMain.done();
    });

    // setConstructorInitOn/Off

    describe('Funktion setConstructorInitOn/Off', () => {

        it('sollte constructorInitFlag ein/ausschalten', () => {
            ListenService.setConstructorInitOn();
            expect( ListenService.isConstructorInit()).toBe( true );
            ListenService.setConstructorInitOff();
            expect( ListenService.isConstructorInit()).toBe( false );
            ListenService.setConstructorInitOn();
            expect( ListenService.isConstructorInit()).toBe( true );
        });

    });

    // getConfig

    describe('Function getConfig', () => {

        it('sollte ServiceConfig zurueckgeben', () => {
            const config = ListenService.getConfig();
            expect( config ).toBe( ListenServiceConfig );
        });

    });

    // constructior

    describe('call constructor', () => {

        it('sollte erzeugt sein, ohne init auszufuehren', () => {
            expect( listenService ).toBeTruthy();
            expect( listenService.isInit()).toBe( false );
        });

        it('sollte service vorhanden sein, wenn mit init erzeugt', () => {
            ListenService.setConstructorInitOn();
            const service = new ListenService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( ListenServiceConfig.activeFlag );
            expect( service.language ).toBe( ListenServiceConfig.listenLanguage );
            expect( service.errorOutput ).toEqual( ListenServiceConfig.errorOutputFlag );
            service.reset();
            service.setErrorOutputOff();
        });

        it('sollte service vorhanden sein, wenn mit init erzeugt und config angepasst', () => {
            const config = ListenService.getConfig();
            config.listenLanguage = LISTEN_EN_LANGUAGE;
            config.errorOutputFlag = true;
            ListenService.setConstructorInitOn();
            const service = new ListenService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( true );
            expect( service.language ).toBe( LISTEN_EN_LANGUAGE );
            expect( service.errorOutput ).toEqual( true );
            service.reset();
            service.setErrorOutputOff();
        });

    });

    // _setOption

    describe('Funktion _setOption', () => {

        it('sollte activeFlag setzen, wenn option activeFlag', () => {
            expect( listenService.init()).toBe( 0 );
            listenService.setOption({ activeFlag: false });
            expect( listenService.active ).toBe( false );
            listenService.setOption({ activeFlag: true });
            expect( listenService.active ).toBe( true );
        });

        it('sollte language setzen, wenn option language gesetzt', () => {
            expect( listenService.init()).toBe( 0 );
            listenService.setOption({ listenLanguage: LISTEN_EN_LANGUAGE });
            expect( listenService.language ).toBe( LISTEN_EN_LANGUAGE );
            listenService.setOption({ listenLanguage: LISTEN_DE_LANGUAGE });
            expect( listenService.language ).toBe( LISTEN_DE_LANGUAGE );
        });

        it('sollte errorOutput auf true setzen, wenn option errorOutput true', () => {
            expect( listenService.init()).toBe( 0 );
            listenService.setOption({ errorOutputFlag: true });
            expect( listenService.errorOutputFlag).toBe( true );
            expect( listenService.errorOutput ).toBe( true );
        });

        it('sollte errorOutput auf false setzen, wenn option errorOutput false', () => {
            expect( listenService.init()).toBe( 0 );
            listenService.setOption({ errorOutputFlag: false });
            expect( listenService.errorOutputFlag ).toBe( false );
            expect( listenService.errorOutput ).toBe( false );
        });

    });

    // _mapOption

    describe('Funktion _mapOption', () => {

        it('sollte language zurueckgeben, wenn option language gesetzt ist', () => {
            const option = listenService.mapOption({ listenLanguage: LISTEN_EN_LANGUAGE });
            expect( option ).toEqual({ listenLanguage: LISTEN_EN_LANGUAGE, errorOutputFlag: listenService.errorOutputFlag });
        });

        it('sollte errorOutput true zurueckgeben, wenn option errorOutput true', () => {
            const option = listenService.mapOption({ errorOutputFlag: true });
            expect( option ).toEqual({ errorOutputFlag: true });
            expect( listenService.errorOutputFlag).toBe( true );
        });

        it('sollte errorOutput false zurueckgeben, wenn option errorOutput false', () => {
            const option = listenService.mapOption({ errorOutputFlag: false });
            expect( option ).toEqual({ errorOutputFlag: false });
            expect( listenService.errorOutputFlag ).toBe( false );
        });

    });

    // init

    describe('Funktion init', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.isErrorOutput()).toBe( false );
            expect( listenService.isActive()).toBe( true );
            expect( listenService.getLanguage()).toBe( LISTEN_DE_LANGUAGE );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option speakLanguage gesetzt ist', () => {
            expect( listenService.init({ listenLanguage: LISTEN_EN_LANGUAGE })).toBe( 0 );
            expect( listenService.getLanguage()).toEqual( LISTEN_EN_LANGUAGE );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option errorOutputFlag gesetzt ist', () => {
            expect( listenService.init({ errorOutputFlag: true })).toBe( 0 );
            expect( listenService.isErrorOutput()).toBe( true );
        });

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.reset()).toBe( 0 );
            expect( listenService.isErrorOutput()).toBe( false );
            expect( listenService.isActive()).toBe( true );
            expect( listenService.getLanguage()).toBe( LISTEN_DE_LANGUAGE );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option speakLanguage gesetzt ist', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.reset({ listenLanguage: LISTEN_EN_LANGUAGE })).toBe( 0 );
            expect( listenService.getLanguage()).toEqual( LISTEN_EN_LANGUAGE );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option errorOutputFlag gesetzt ist', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.reset({ errorOutputFlag: true })).toBe( 0 );
            expect( listenService.isErrorOutput()).toBe( true );
        });

    });

    // _addAllEvent

    describe('Funktion _addAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService._addAllEvent: keine Komponente vorhanden' );
                done();
            });
            expect( listenService.addAllEvent()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.addAllEvent()).toBe( 0 );
        });

    });

    // xxxEvent

    describe('Funktion xxxEvent', () => {

        it('sollte event zurueckgeben', () => {
            expect( listenService.startEvent ).toBeTruthy();
            expect( listenService.stopEvent ).toBeTruthy();
            expect( listenService.errorEvent ).toBeTruthy();
            expect( listenService.resultEvent ).toBeTruthy();
            expect( listenService.interimResultEvent ).toBeTruthy();
            expect( listenService.noMatchEvent ).toBeTruthy();
            expect( listenService.recognitionStartEvent ).toBeTruthy();
            expect( listenService.recognitionStopEvent ).toBeTruthy();
            expect( listenService.audioStartEvent ).toBeTruthy();
            expect( listenService.audioStopEvent ).toBeTruthy();
            expect( listenService.soundStartEvent ).toBeTruthy();
            expect( listenService.soundStopEvent ).toBeTruthy();
            expect( listenService.speechStartEvent ).toBeTruthy();
            expect( listenService.speechStopEvent ).toBeTruthy();
        });

    });

    // startEvent

    describe('call startEvent', () => {

        it('should return 0, if init', (done) => {
            let startEvent = null;
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                console.log('===> ListenServiceSpec.startEvent: Error=', aError.message);
                done();
                return 0;
            });
            startEvent = listenService.startEvent.subscribe(() => {
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                expect(listenService.stop()).toBe( 0 );
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
        });

    });

    // stopEvent

    describe('call stopEvent', () => {

        it('should return 0, if init', (done) => {
            let stopEvent = null;
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                console.log('===> ListenServiceSpec.stopEvent: Error=', aError.message);
                done();
                return 0;
            });
            stopEvent = listenService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            expect(listenService.stop()).toBe( 0 );
        });

    });

    // resultEvent

    describe('Funktion resultEvent', () => {

        it('sollte gueltigen Text als Ergebnis der Spracherkennung zurueckgeben', (done) => {
            let resultEvent = null;
            let stopEvent = null;
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                resultEvent.unsubscribe();
                stopEvent.unsubscribe();
                console.log('===> ListenServiceSpec.resultEvent: Error=', aError.message);
                done();
                return 0;
            });
            let resultText = '';
            resultEvent = listenService.resultEvent.subscribe((aResultText: string) => {
                resultEvent.unsubscribe();
                resultText = aResultText;
                return 0;
            });
            stopEvent = listenService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                resultEvent.unsubscribe();
                stopEvent.unsubscribe();
                expect( resultText ).toBe( 'Dies ist ein Testtext' );
                done();
                return 0;
            });
            expect(listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            if ( LISTEN_MOCK_TEST ) {
                const testResult = listenService.test( 'say', { sayText: 'Dies ist ein Testtext', isFinal: true });
                if ( testResult.result !== 0 ) {
                    console.log('===> Testausgabe.resultEvent', testResult.errorText);
                }
            } else {
                // TODO: Hier muss eine Audiodatei abgespielt werden, wenn Audio als Service vorhande ist
                done.fail('Der Test ist nicht implementiert');
            }
        });

    });

    // interimResultEvent

    // TODO: Ausbau von Coti, um nicht finale Nachrichten zu verarbeiten
    xdescribe('Funktion interimResultEvent', () => {

        it('sollte gueltigen Text als Ergebnis der Spracherkennung zurueckgeben', (done) => {
            let interimResultEvent = null;
            let stopEvent = null;
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                interimResultEvent.unsubscribe();
                stopEvent.unsubscribe();
                console.log('===> ListenServiceSpec.resultEvent: Error=', aError.message);
                done();
                return 0;
            });
            let resultText = '';
            interimResultEvent = listenService.interimResultEvent.subscribe((aResultText: string) => {
                interimResultEvent.unsubscribe();
                resultText = aResultText;
                return 0;
            });
            stopEvent = listenService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                interimResultEvent.unsubscribe();
                stopEvent.unsubscribe();
                expect( resultText ).toBe( 'Dies ist ein Testtext' );
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            if ( LISTEN_MOCK_TEST ) {
                const testResult = listenService.test( 'say', { sayText: 'Dies ist ein Testtext', isFinal: false });
                if ( testResult.result !== 0 ) {
                    console.log('===> Testausgabe.resultEvent', testResult.errorText);
                }
            } else {
                // TODO: Hier muss eine Audiodatei abgespielt werden, wenn Audio als Service vorhande ist
                done.fail('Der Test ist nicht implementiert');
            }
        });

    });

    // errorEvent

    describe('call errorEvent', () => {

        it('should return error, if init', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                // console.log('===> ListenServiceSpec.errorEvent: Error=', aError.message);
                expect(aError.message).toBe( 'ASRHtml5.startListen: Spracheingabe laeuft bereits' );
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            expect( listenService.start()).toBe( -1 );
        });

    });

    // setASR

    describe('Funktion setASR', () => {

        it('sollte ASR nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.setASR: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( listenService.setASR('')).toBe( -1 );
        });

        it('sollte ASR setzen, wenn init aufgerufen wurde', () => {
            expect( listenService.init( ListenService.getConfig())).toBe( 0 );
            expect( listenService.setASR( LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listenService.getASR()).toBe( LISTEN_HTML5_ASR );
        });

        it('sollte ASR nicht setzen, wenn init ohne NuanceOptionen aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.setASR( LISTEN_NUANCE_ASR )).toBe( -1 );
            expect( listenService.getASR()).toBe( LISTEN_HTML5_ASR );
        });

    });

    // getASR

    describe('Funktion getASR', () => {

        it('sollte ein leeren String zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.getASR: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( listenService.getASR()).toBe( '' );
        });

        it('sollte Html5-ASR zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.getASR()).toBe( LISTEN_HTML5_ASR );
        });

    });

    // asr

    describe('Eigenschaft asr', () => {

        it('sollte asr nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.setASR: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            listenService.asr = '';
        });

        it('sollte leere asr zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.getASR: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( listenService.asr ).toBe( '' );
        });

        it('sollte asr setzen, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            listenService.asr = LISTEN_HTML5_ASR;
            expect( listenService.asr ).toBe( LISTEN_HTML5_ASR );
        });

    });

    // getASRList

    describe('Funktion getASRList', () => {

        it('sollte leere ASR liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.getASRList: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            const asrList = listenService.getASRList();
            expect( asrList.length ).toBe( 0 );
        });

        it('sollte ASR liste zurueckgeben, wenn init mit NuanceOptionen aufgerufen wurde', () => {
            expect( listenService.init( ListenService.getConfig())).toBe( 0 );
            const asrList = listenService.getASRList();
            /* NuanceASR ist nicht vorhanden
            expect( asrList.length ).toBe( 2 );
            expect( asrList[ 0 ]).toEqual( LISTEN_HTML5_ASR );
            expect( asrList[ 1 ]).toEqual( LISTEN_NUANCE_ASR );
            */
           expect( asrList.length ).toBe( 1 );
           expect( asrList[ 0 ]).toEqual( LISTEN_HTML5_ASR );
       });

    });

    // asrs

    describe('Eigenschaft asrs', () => {

        it('sollte leere asr liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('ListenService.getASRList: keine Listen-Komponente vorhanden');
                done();
                return 0;
            });
            expect( listenService.asrs.length ).toBe( 0 );
        });

        it('sollte asr liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init( ListenService.getConfig())).toBe( 0 );
            const asrs = listenService.asrs;
            /* NuanceASR ist nicht vorhanden
            expect( asrs.length ).toBe( 2 );
            expect( asrs[ 0 ]).toBe( LISTEN_HTML5_ASR );
            expect( asrs[ 1 ]).toBe( LISTEN_NUANCE_ASR );
            */
           expect( asrs.length ).toBe( 1 );
           expect( asrs[ 0 ]).toBe( LISTEN_HTML5_ASR );
       });

    });

    // setLanguage

    describe('Funktion setLanguage', () => {

        it('sollte language nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.setLanguage: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( listenService.setLanguage('')).toBe( -1 );
        });

        it('sollte language setzen, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe(0);
            expect( listenService.setLanguage( LISTEN_EN_LANGUAGE )).toBe( 0 );
            expect( listenService.getLanguage()).toBe( LISTEN_EN_LANGUAGE );
        });

    });

    // getLanguage

    describe('Funktion getLanguage', () => {

        it('sollte leere language zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.getLanguage: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( listenService.getLanguage()).toBe( '' );
        });

        it('sollte language de zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.getLanguage()).toBe( LISTEN_DE_LANGUAGE );
        });

    });

    // language

    describe('Eigenschaft language', () => {

        it('sollte language nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.setLanguage: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            listenService.language = '';
        });

        it('sollte leere language zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.getLanguage: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( listenService.language ).toBe( '' );
        });

        it('sollte language setzen, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            listenService.language = LISTEN_EN_LANGUAGE;
            expect( listenService.language ).toBe( LISTEN_EN_LANGUAGE );
        });

    });

    // getLanguageList

    describe('Funktion getLanguageList', () => {

        it('sollte leere language liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.getLanguageList: keine Listen-Komponente vorhanden' );
                done();
                return 0;
            });
            const languageList = listenService.getLanguageList();
            expect( languageList.length ).toBe( 0 );
        });

        it('sollte language liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            const languageList = listenService.getLanguageList();
            expect( languageList.length ).toBe( 2 );
            expect( languageList[ 0 ]).toEqual( LISTEN_DE_LANGUAGE );
            expect( languageList[ 1 ]).toEqual( LISTEN_EN_LANGUAGE );
        });

    });

    // languages

    describe('Eigenschaft languages', () => {

        it('sollte leere language liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('ListenService.getLanguageList: keine Listen-Komponente vorhanden');
                done();
                return 0;
            });
            expect( listenService.languages.length ).toBe( 0 );
        });

        it('sollte language liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( listenService.init()).toBe( 0 );
            const languages = listenService.languages;
            expect( languages.length ).toBe( 2 );
            expect( languages[ 0 ]).toBe( LISTEN_DE_LANGUAGE );
            expect( languages[ 1 ]).toBe( LISTEN_EN_LANGUAGE );
        });

    });

    // start

    describe('Funktion start', () => {

        it('sollte gueltigen Text als Ergebnis der Spracherkennung zurueckgeben', (done) => {
            let errorText = '';
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> Test-Error:', aError);
                errorText = aError.message;
                return 0;
            });
            let resultText = '';
            const resultEvent = listenService.resultEvent.subscribe((aResultText: string) => {
                resultEvent.unsubscribe();
                resultText = aResultText;
                return 0;
            });
            const stopEvent = listenService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                resultEvent.unsubscribe();
                stopEvent.unsubscribe();
                expect( errorText ).toBe( '' );
                expect( resultText ).toBe( 'Dies ist ein Testtext' );
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            expect( listenService.isRunning()).toBe( true );
            if ( LISTEN_MOCK_TEST ) {
                const testResult = listenService.test( 'say', { sayText: 'Dies ist ein Testtext' });
                if ( testResult.result !== 0 ) {
                    console.log('===> Testausgabe', testResult.errorText);
                }
            } else {
                // TODO: Hier muss eine Audiodatei abgespielt werden, wenn Audio als Service vorhande ist
                done.fail('Der Test ist nicht implementiert');
            }

            expect( listenService.isRunning()).toBe( false );
        });

    });

    // stop

    describe('Funktion stop', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und nicht start', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.stop()).toBe( 0 );
        });

        it('sollte 0 zurueckgeben wenn init und start aufgerufen wurden', (done) => {
            const stopEvent = listenService.stopEvent.subscribe(() => {
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            expect( listenService.isRunning()).toBe( true );
            expect( listenService.stop()).toBe( 0 );
            expect( listenService.isRunning()).toBe( false );
        });

    });

    // abort

    describe('Funktion abort', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = listenService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'ListenService.abort: keine Listen-Komponente vorhanden' );
                done();
            });
            expect( listenService.abort()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und nicht start', () => {
            expect( listenService.init()).toBe( 0 );
            expect( listenService.abort()).toBe( 0 );
        });

        it('sollte 0 zurueckgeben wenn init und start aufgerufen wurden', (done) => {
            const stopEvent = listenService.stopEvent.subscribe(() => {
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            expect( listenService.init()).toBe( 0 );
            expect( listenService.start()).toBe( 0 );
            expect( listenService.isRunning()).toBe( true );
            expect( listenService.abort()).toBe( 0 );
            expect( listenService.isRunning()).toBe( false );
        });

    });

});


