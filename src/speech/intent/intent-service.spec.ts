/**
 * Unit-Test von IntentService
 *
 * Letzter Aenderung: 21.02.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/intent
 * @author SB
 */


// TODO: Umfangreiches Mock zum Nuance-WebSocketServer schreiben, um keine echten Nuance-Credentials
//       einsetzen zu muessen. Die Tests muessen immer lauffaehig sein.

// Definiert die Mock-Bibliothek fuer SpeechRecognition

declare var Corti;


// speech-framework

import {
    SpeechMain
} from 'speech-framework';


// Nuance-Credentials

// TODO: Hier muessen die echten Zugangsdaten eingetragen werden
// import { APP_ID, APP_KEY, NLU_TAG } from './../../config/nuance-credentials';
import { APP_ID, APP_KEY, NLU_TAG } from './../../../credentials/nuance-credentials';
const nuanceOption = {
    nuanceAppId: APP_ID,
    nuanceAppKey: APP_KEY,
    nuanceNluTag: NLU_TAG,
    errorOutputFlag: false
};


// nuance

import { NuanceModule } from './../nuance/nuance-module';


// intent

import { INTENT_NUANCE_NLU, INTENT_HTML5_NLU, INTENT_DE_LANGUAGE, INTENT_EN_LANGUAGE } from './intent-service-const';
import { IntentServiceDataInterface } from './intent-service-data.interface';
import { IntentServiceConfig } from './intent-service-config';
import { IntentService } from './intent-service';


// legt fest, ob SpeechRecognition gemockt wird oder nicht.
// wenn der Test nicht gemockt wird, muss der Rechner entsprechend paepariert werden,
// um AudioOutput und AudioInput zu verbinden

// TODO: INTENT_MOCK_TEST = false Tests sind noch nicht implementiert
const INTENT_MOCK_TEST = true;
if ( INTENT_MOCK_TEST ) {
    Corti.patch();
}


// Testklasse

class TestIntentService extends IntentService {

    constructor() {
        IntentService.setConstructorInitOff();
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

describe('IntentService', () => {

    const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    let intentService: TestIntentService;
    let nuanceFlag = false;
    let nuanceMockFlag = false;

    beforeAll((done) => {
        console.log('IntentService Unit-Tests gestartet...');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
        // pruefen, ob NUance-Parameter vorhanden sind
        if ( !nuanceOption.nuanceAppId || !nuanceOption.nuanceAppKey ) {
            nuanceOption['nuanceMockFlag'] = true;
            nuanceMockFlag = true;
        }
        // starten von Nuance
        NuanceModule.init( nuanceOption, (aNuanceFlag: boolean) => {
            nuanceFlag = aNuanceFlag;
            done();
        });
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineTimeout;
        NuanceModule.done();
    });

    beforeEach(() => {
        IntentServiceConfig.errorOutputFlag = false;
        intentService = new TestIntentService();
        intentService.setErrorOutputOff();
    });

    afterEach(() => {
        intentService.setErrorOutputOff();
        intentService.reset();
        intentService = null;
        SpeechMain.done();
    });

    // setConstructorInitOn/Off

    describe('Funktion setConstructorInitOn/Off', () => {

        it('sollte constructorInitFlag ein/ausschalten', () => {
            IntentService.setConstructorInitOn();
            expect( IntentService.isConstructorInit()).toBe( true );
            IntentService.setConstructorInitOff();
            expect( IntentService.isConstructorInit()).toBe( false );
            IntentService.setConstructorInitOn();
            expect( IntentService.isConstructorInit()).toBe( true );
        });

    });

    // getConfig

    describe('Function getConfig', () => {

        it('sollte ServiceConfig zurueckgeben', () => {
            const config = IntentService.getConfig();
            expect( config ).toBe( IntentServiceConfig );
        });

    });

    // constructior

    describe('Funktion constructor', () => {

        it('sollte erzeugt sein, ohne init auszufuehren', () => {
            expect( intentService ).toBeTruthy();
            expect( intentService.isInit()).toBe( false );
        });

        it('sollte service vorhanden sein, wenn mit init erzeugt', () => {
            IntentService.setConstructorInitOn();
            const service = new IntentService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            if ( nuanceFlag ) {
                expect( service.active ).toBe( IntentServiceConfig.activeFlag );
                expect( service.language ).toBe( IntentServiceConfig.intentLanguage );
            } else {
                expect( service.active ).toBe( false );
                expect( service.language ).toBe( '' );
            }
            expect( service.errorOutput ).toEqual( IntentServiceConfig.errorOutputFlag );
            service.reset();
            service.setErrorOutputOff();
        });

        it('sollte service vorhanden sein, wenn mit init erzeugt und config angepasst', () => {
            const config = IntentService.getConfig();
            config.intentLanguage = INTENT_EN_LANGUAGE;
            config.errorOutputFlag = true;
            IntentService.setConstructorInitOn();
            const service = new IntentService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            if ( nuanceFlag ) {
                expect( service.active ).toBe( true );
                expect( service.language ).toBe( INTENT_EN_LANGUAGE );
            } else {
                expect( service.active ).toBe( false );
                expect( service.language ).toBe( '' );
            }
            expect( service.errorOutput ).toEqual( true );
            service.reset();
            service.setErrorOutputOff();
        });

    });

    // _setOption

    describe('Funktion _setOption', () => {

        it('sollte activeFlag setzen, wenn option activeFlag', () => {
            expect( intentService.init()).toBe( 0 );
            intentService.setOption({ activeFlag: false });
            expect( intentService.active ).toBe( false );
            if ( nuanceFlag ) {
                intentService.setOption({ activeFlag: true });
                expect( intentService.active ).toBe( true );
            } else {
                intentService.setOption({ activeFlag: true });
                expect( intentService.active ).toBe( false );
            }
        });

        it('sollte language setzen, wenn option language gesetzt', () => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                intentService.setOption({ intentLanguage: INTENT_EN_LANGUAGE });
                expect( intentService.language ).toBe( INTENT_EN_LANGUAGE );
                intentService.setOption({ intentLanguage: INTENT_DE_LANGUAGE });
                expect( intentService.language ).toBe( INTENT_DE_LANGUAGE );
            } else {
                intentService.setOption({ intentLanguage: INTENT_EN_LANGUAGE });
                expect( intentService.language ).toBe( '' );
                intentService.setOption({ intentLanguage: INTENT_DE_LANGUAGE });
                expect( intentService.language ).toBe( '' );
            }
        });

        it('sollte errorOutput auf true setzen, wenn option errorOutput true', () => {
            expect( intentService.init()).toBe( 0 );
            intentService.setOption({ errorOutputFlag: true });
            expect( intentService.errorOutputFlag).toBe( true );
            expect( intentService.errorOutput ).toBe( true );
        });

        it('sollte errorOutput auf false setzen, wenn option errorOutput false', () => {
            expect( intentService.init()).toBe( 0 );
            intentService.setOption({ errorOutputFlag: false });
            expect( intentService.errorOutputFlag ).toBe( false );
            expect( intentService.errorOutput ).toBe( false );
        });

    });

    // _mapOption

    describe('Funktion _mapOption', () => {

        it('sollte language zurueckgeben, wenn option language gesetzt ist', () => {
            const option = intentService.mapOption({ intentLanguage: INTENT_EN_LANGUAGE });
            expect( option ).toEqual({ intentLanguage: INTENT_EN_LANGUAGE, errorOutputFlag: intentService.errorOutputFlag });
        });

        it('sollte errorOutput true zurueckgeben, wenn option errorOutput true', () => {
            const option = intentService.mapOption({ errorOutputFlag: true });
            expect( option ).toEqual({ errorOutputFlag: true });
            expect( intentService.errorOutputFlag).toBe( true );
        });

        it('sollte errorOutput false zurueckgeben, wenn option errorOutput false', () => {
            const option = intentService.mapOption({ errorOutputFlag: false });
            expect( option ).toEqual({ errorOutputFlag: false });
            expect( intentService.errorOutputFlag ).toBe( false );
        });

    });

    // init

    describe('Funktion init', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.getLanguage()).toBe( INTENT_DE_LANGUAGE );
                expect( intentService.isActive()).toBe( true );
            } else {
                expect( intentService.getLanguage()).toBe( '' );
                expect( intentService.isActive()).toBe( false );
            }
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option speakLanguage gesetzt ist', () => {
            expect( intentService.init({ intentLanguage: INTENT_EN_LANGUAGE })).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.getLanguage()).toEqual( INTENT_EN_LANGUAGE );
            } else {
                expect( intentService.getLanguage()).toEqual( '' );
            }
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option errorOutputFlag gesetzt ist', () => {
            expect( intentService.init({ errorOutputFlag: true })).toBe( 0 );
            expect( intentService.isErrorOutput()).toBe( true );
        });

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init( IntentService.getConfig())).toBe( 0 );
            expect( intentService.reset()).toBe( 0 );
            // expect( intentService.isErrorOutput()).toBe( false );
            if ( nuanceFlag ) {
                expect( intentService.isActive()).toBe( true );
                expect( intentService.getLanguage()).toBe( INTENT_DE_LANGUAGE );
            } else {
                expect( intentService.isActive()).toBe( false );
                expect( intentService.getLanguage()).toBe( '' );
            }
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option speakLanguage gesetzt ist', () => {
            expect( intentService.init( IntentService.getConfig())).toBe( 0 );
            expect( intentService.reset({ intentLanguage: INTENT_EN_LANGUAGE })).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.getLanguage()).toBe( INTENT_EN_LANGUAGE );
            } else {
                expect( intentService.getLanguage()).toBe( '' );
            }
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option errorOutputFlag gesetzt ist', () => {
            expect( intentService.init( IntentService.getConfig())).toBe( 0 );
            expect( intentService.reset({ errorOutputFlag: true })).toBe( 0 );
            // expect( intentService.isErrorOutput()).toBe( true );
        });

    });

    // _addAllEvent

    describe('Funktion _addAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService._addAllEvent: keine Komponente vorhanden' );
                done();
            });
            expect( intentService.addAllEvent()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            expect( intentService.addAllEvent()).toBe( 0 );
        });

    });

    // xxxEvent

    describe('Funktion xxxEvent', () => {

        it('sollte event zurueckgeben', () => {
            expect( intentService.startEvent ).toBeTruthy();
            expect( intentService.stopEvent ).toBeTruthy();
            expect( intentService.errorEvent ).toBeTruthy();
        });

    });

    // resultEvent

    describe('Funktion resultEvent', () => {

        it('sollte gueltigen Text als Ergebnis der Spracherkennung zurueckgeben', (done) => {
            // pending('gibt keinen ResultEvent zurueck');
            let resultEvent = null;
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                resultEvent.unsubscribe();
                console.log('===> IntentServiceSpec.resultEvent: Error = ', aError.message);
                // TODO: Problem mit falschem Event, das noch geloest werden muss
                // done.fail( 'sollte nicht aufgerufen werden' );
                return 0;
            });
            resultEvent = intentService.resultEvent.subscribe((aIntentData: IntentServiceDataInterface) => {
                errorEvent.unsubscribe();
                resultEvent.unsubscribe();
                if ( nuanceMockFlag ) {
                    expect( aIntentData.intent ).toBe( 'TestIntent' );
                } else {
                    expect( aIntentData.intent ).toBe( 'NewMail' );
                }
                done();
                return 0;
            });
            expect( intentService.init()).toBe( 0 );
            intentService.language = INTENT_DE_LANGUAGE;
            intentService.text = 'Wie schreibe ich eine Nachricht';
            if ( nuanceFlag ) {
                expect( intentService.start()).toBe( 0 );
            } else {
                errorEvent.unsubscribe();
                resultEvent.unsubscribe();
                done();
            }
        });

    });

    // errorEvent

    describe('Funktion errorEvent', () => {

        it('sollte error zurueckgeben, wenn kein Text angegeben wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('===> IntentServiceSpec.errorEvent: Error=', aError.message);
                if ( nuanceFlag ) {
                    // tslint:disable-next-line
                    if ( aError.message === 'ASR-Error.query_error: Die Aufnahme wurde leider nicht erkannt. Bitte versuchen Sie es erneut.' || 
                         aError.message === 'ASR-Error: kein UserMedia erzeugt' ) {
                    } else {
                        done.fail('IntentServiceSpec.errorEvent: Error = ' + aError.message);
                    }
                } else {
                    expect(aError.message).toBe( 'IntentComponent.start: keine NLU vorhanden' );
                }
                done();
                return 0;
            });
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.start()).toBe( 0 );
                if ( nuanceMockFlag ) {
                    done();
                }
            } else {
                expect( intentService.start()).toBe( -1 );
            }
        });

    });

    // setNLU

    describe('Funktion setNLU', () => {

        it('sollte NLU nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.setNLU: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( intentService.setNLU('')).toBe( -1 );
        });

        // TODO: wenn Html5 eingebaut ist
        xit('sollte NLU auf Html5 setzen, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            expect( intentService.setNLU( INTENT_HTML5_NLU )).toBe( 0 );
            expect( intentService.getNLU()).toBe( INTENT_HTML5_NLU );
        });

        it('sollte NLU auf Nuance setzen, wenn init aufgerufen wurde', (done) => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.setNLU( INTENT_NUANCE_NLU )).toBe( 0 );
                expect( intentService.getNLU()).toBe( INTENT_NUANCE_NLU );
                done();
            } else {
                const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                    errorEvent.unsubscribe();
                    expect( aError.message ).toBe( 'NLUGroup.setNLU: Keine NLU vorhanden' );
                    done();
                    return 0;
                });
                expect( intentService.setNLU( INTENT_NUANCE_NLU )).toBe( -1 );
                // TODO: wenn Html5 eingebaut ist
                // expect( intentService.getNLU()).toBe( INTENT_HTML5_NLU );
                expect( intentService.getNLU()).toBe( '' );
            }
        });

    });

    // getNLU

    describe('Funktion getNLU', () => {

        it('sollte ein leeren String zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.getNLU: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( intentService.getNLU()).toBe( '' );
        });

        it('sollte Nuance-NLU zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.getNLU()).toBe( INTENT_NUANCE_NLU );
            } else {
                // TODO: wenn Html5 eingebaut ist
                // expect( intentService.getNLU()).toBe( INTENT_HTML5_NLU );
                expect( intentService.getNLU()).toBe( '' );
            }
        });

    });

    // nlu

    describe('Eigenschaft nlu', () => {

        it('sollte nlu nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.setNLU: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            intentService.nlu = '';
        });

        it('sollte leere NLU zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.getNLU: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( intentService.nlu ).toBe( '' );
        });

        it('sollte NLU zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.nlu ).toBe( INTENT_NUANCE_NLU );
            } else {
                // TODO: wenn Html5 eingebaut ist
                // expect( intentService.nlu ).toBe( INTENT_HTML5_NLU );
                expect( intentService.nlu ).toBe( '' );
            }
        });

        // TODO: wenn HTML5 eingebaut ist
        xit('sollte NLU setzen, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            intentService.nlu = INTENT_HTML5_NLU;
            expect( intentService.nlu ).toBe( INTENT_HTML5_NLU );
        });

    });

    // getNLUList

    describe('Funktion getNLUList', () => {

        it('sollte leere NLU liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.getNLUList: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            const nluList = intentService.getNLUList();
            expect( nluList.length ).toBe( 0 );
        });

        it('sollte NLU liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            const nluList = intentService.getNLUList();
            if ( nuanceFlag ) {
                // TODO: wenn Html5 eingebaut ist
                // expect( nluList.length ).toBe( 2 );
                expect( nluList.length ).toBe( 1 );
                expect( nluList[ 0 ]).toEqual( INTENT_NUANCE_NLU );
                // expect( nluList[ 1 ]).toEqual( INTENT_HTML5_NLU );
            } else {
                // TODO: wenn Html5 eingebaut ist
                // expect( nluList.length ).toBe( 1 );
                // expect( nluList[ 0 ]).toEqual( INTENT_HTML5_NLU );
                expect( nluList.length ).toBe( 0 );
            }
        });

    });

    // nlus

    describe('Eigenschaft nlus', () => {

        it('sollte leere NLU liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('IntentService.getNLUList: keine Intent-Komponente vorhanden');
                done();
                return 0;
            });
            expect( intentService.nlus.length ).toBe( 0 );
        });

        it('sollte NLU liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            const nlus = intentService.nlus;
            if ( nuanceFlag ) {
                // TODO: wenn Html5 eingebaut ist
                // expect( nlus.length ).toBe( 2 );
                expect( nlus.length ).toBe( 1 );
                expect( nlus[ 0 ]).toBe( INTENT_NUANCE_NLU );
                // expect( nlus[ 1 ]).toBe( INTENT_HTML5_NLU );
            } else {
                // TODO: wenn Html5 eingebaut ist
                // expect( nlus.length ).toBe( 1 );
                // expect( nlus[ 0 ]).toBe( INTENT_HTML5_NLU );
                expect( nlus.length ).toBe( 0 );
            }
        });

    });

    // setLanguage

    describe('Funktion setLanguage', () => {

        it('sollte language nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.setLanguage: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( intentService.setLanguage('')).toBe( -1 );
        });

        it('sollte language setzen, wenn init aufgerufen wurde', (done) => {
            expect( intentService.init()).toBe(0);
            if ( nuanceFlag ) {
                expect( intentService.setLanguage( INTENT_EN_LANGUAGE )).toBe( 0 );
                expect( intentService.getLanguage()).toBe( INTENT_EN_LANGUAGE );
                done();
            } else {
                const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                    errorEvent.unsubscribe();
                    expect( aError.message ).toBe( 'NLUGroup.setLanguage: Keine NLU vorhanden' );
                    done();
                    return 0;
                });
                expect( intentService.setLanguage( INTENT_EN_LANGUAGE )).toBe( -1 );
                expect( intentService.getLanguage()).toBe( '' );
            }
        });

    });

    // getLanguage

    describe('Funktion getLanguage', () => {

        it('sollte leere language zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.getLanguage: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( intentService.getLanguage()).toBe( '' );
        });

        it('sollte language de zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( intentService.getLanguage()).toBe( INTENT_DE_LANGUAGE );
            } else {
                expect( intentService.getLanguage()).toBe( '' );
            }
        });

    });

    // language

    describe('Eigenschaft language', () => {

        it('sollte language nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.setLanguage: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            intentService.language = '';
        });

        it('sollte leere language zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.getLanguage: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( intentService.language ).toBe( '' );
        });

        it('sollte language setzen, wenn init aufgerufen wurde', (done) => {
            expect( intentService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                intentService.language = INTENT_EN_LANGUAGE;
                expect( intentService.language ).toBe( INTENT_EN_LANGUAGE );
                done();
            } else {
                const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                    errorEvent.unsubscribe();
                    expect( aError.message ).toBe( 'NLUGroup.setLanguage: Keine NLU vorhanden' );
                    done();
                    return 0;
                });
                intentService.language = INTENT_EN_LANGUAGE;
                expect( intentService.language ).toBe( '' );
            }
        });

    });

    // getLanguageList

    describe('Funktion getLanguageList', () => {

        it('sollte leere language liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'IntentService.getLanguageList: keine Intent-Komponente vorhanden' );
                done();
                return 0;
            });
            const languageList = intentService.getLanguageList();
            expect( languageList.length ).toBe( 0 );
        });

        it('sollte language liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            const languageList = intentService.getLanguageList();
            if ( nuanceFlag ) {
                expect( languageList.length ).toBe( 2 );
                expect( languageList[ 0 ]).toEqual( INTENT_DE_LANGUAGE );
                expect( languageList[ 1 ]).toEqual( INTENT_EN_LANGUAGE );
            } else {
                expect( languageList.length ).toBe( 0 );
            }
        });

    });

    // languages

    describe('Eigenschaft languages', () => {

        it('sollte leere language liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('IntentService.getLanguageList: keine Intent-Komponente vorhanden');
                done();
                return 0;
            });
            expect( intentService.languages.length ).toBe( 0 );
        });

        it('sollte language liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            const languages = intentService.languages;
            if ( nuanceFlag ) {
                expect( languages.length ).toBe( 2 );
                expect( languages[ 0 ]).toBe( INTENT_DE_LANGUAGE );
                expect( languages[ 1 ]).toBe( INTENT_EN_LANGUAGE );
            } else {
                expect( languages.length ).toBe( 0 );
            }
        });

    });

    // setText

    describe('Funktion setText', () => {

        it('sollte text nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('IntentService.setText: keine Intent-Komponente vorhanden');
                done();
                return 0;
            });
            expect(intentService.setText('')).toBe( -1 );
        });

        it('sollte text setzen, wenn init aufgerufen wurde', () => {
            expect(intentService.init()).toBe(0);
            expect(intentService.setText( 'TestText' )).toBe(0);
            expect(intentService.getText()).toEqual( 'TestText' );
        });

    });

    // getText

    describe('Funktion getText', () => {

        it('sollte leeren text zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('IntentService.getText: keine Intent-Komponente vorhanden');
                done();
                return 0;
            });
            expect(intentService.getText()).toBe( '' );
        });

        it('sollte leeren text zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(intentService.init()).toBe(0);
            expect(intentService.getText()).toEqual( '' );
        });

    });

    // text

    describe('Eigenschaft text', () => {

        it('sollte text nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('IntentService.setText: keine Intent-Komponente vorhanden');
                done();
                return 0;
            });
            intentService.text = '';
        });

        it('sollte leeren text zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('IntentService.getText: keine Intent-Komponente vorhanden');
                done();
                return 0;
            });
            expect( intentService.text ).toBe( '' );
        });

        it('sollte text setzen, wenn init aufgerufen wurde', () => {
            expect( intentService.init()).toBe( 0 );
            intentService.text = 'TestText';
            expect( intentService.text ).toBe( 'TestText' );
        });

    });

    // start

    describe('Funktion start', () => {

        it('sollte gueltigen Intent als Ergebnis der Sprachanalyse zurueckgeben', (done) => {
            const resultEvent = intentService.resultEvent.subscribe((aIntentData: IntentServiceDataInterface) => {
                resultEvent.unsubscribe();
                if ( nuanceMockFlag ) {
                    expect( aIntentData.intent ).toBe( 'TestIntent' );
                } else {
                    expect( aIntentData.intent ).toBe( 'NewMail' );
                }
                done();
                return 0;
            });
            expect( intentService.init()).toBe( 0 );
            intentService.language = INTENT_DE_LANGUAGE;
            intentService.text = 'Wie schreibe ich eine Nachricht';
            if ( nuanceFlag ) {
                expect( intentService.start()).toBe( 0 );
            } else {
                resultEvent.unsubscribe();
                done();
            }
        });

    });

    // stop

    describe('Funktion stop', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und nicht start', () => {
            expect( intentService.init()).toBe( 0 );
            expect( intentService.stop()).toBe( 0 );
        });

        // TODO: Raice Condition, es wird kein Event erzeugt, wenn Nuance eingeschaltet ist, muss noch untersucht werden!
        xit('sollte 0 zurueckgeben wenn init und start aufgerufen wurden', (done) => {
            // pending('gibt keinen initEvent zurueck');
            const listenResultEvent = intentService.listenResultEvent.subscribe((aText) => {
                listenResultEvent.unsubscribe();
                console.log('===> StopTest Listen result:', aText);
                return 0;
            });
            const resultEvent = intentService.resultEvent.subscribe((aText) => {
                resultEvent.unsubscribe();
                console.log('===> StopTest Intent result:', aText);
                done();
                return 0;
            });
            const errorEvent = intentService.errorEvent.subscribe((aError: any) => {
                listenResultEvent.unsubscribe();
                resultEvent.unsubscribe();
                errorEvent.unsubscribe();
                console.log('===> StopTest intent errorEvent:', aError.message);
                expect(aError.message).toEqual('NuanceMock.start: andere Transaktion laeuft noch');
                done();
                return 0;
            });
            expect( intentService.init( IntentService.getConfig())).toBe( 0 );
            intentService.language = INTENT_DE_LANGUAGE;
            intentService.text = 'Wie schreibt man eine Nachricht';
            if ( nuanceFlag ) {
                expect( intentService.start()).toBe( 0 );
                expect( intentService.stop()).toBe( 0 );
            } else {
                listenResultEvent.unsubscribe();
                resultEvent.unsubscribe();
                done();
            }
        });

    });

});


