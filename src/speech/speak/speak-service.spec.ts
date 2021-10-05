/** @packageDocumentation
 * Unit-Test von SpeakService
 *
 * Letzte Aenderung: 21.02.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac), Firefox(Mac), Opera(Mac), Safari(Mac)
 *
 * @module speech/speak
 * @author SB
 */


// TODO: Umfangreiches Mock zum Nuance-WebSocketServer schreiben, um keine echten Nuance-Credentials
//       einsetzen zu muessen. Die Tests muessen immer lauffaehig sein.


// speech-framework

import {
    SpeechMain
} from 'speech-framework';


// Nuance-Credentials

// TODO: Hier muessen die echten Zugangsdaten eingetragen werden
import { APP_ID, APP_KEY, NLU_TAG } from './../../../credentials/nuance-credentials';
const nuanceOption = {
    nuanceAppId: APP_ID,
    nuanceAppKey: APP_KEY,
    nuanceNluTag: NLU_TAG,
    errorOutputFlag: false
};


// nuance

import { NuanceModule } from './../nuance/nuance-module';


// speak

import {
    SPEAK_HTML5_TTS,
    SPEAK_NUANCE_TTS,
    SPEAK_DE_LANGUAGE,
    SPEAK_EN_LANGUAGE,
    SPEAK_MP3_AUDIOFORMAT,
    SPEAK_WAV_AUDIOFORMAT
} from './speak-service-const';
import { SpeakServiceConfig } from './speak-service-config';
import { SpeakService } from './speak-service';


// Testklasse

class TestSpeakService extends SpeakService {

    constructor() {
        SpeakService.setConstructorInitOff();
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

describe('SpeakService', () => {

    const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    let speakService: TestSpeakService;
    let nuanceFlag = false;
    let nuanceMockFlag = false;

    // Hilfsfunktion zum Entsperren von AudioContext

    const _unlockAudio = function (done) {
        if ( speakService.isUnlockAudio()) {
            done( true );
        } else {
            const audioUnlockEvent = speakService.audioUnlockEvent.subscribe((aUnlockFlag: boolean) => {
                // console.log('===> SpeakServiceSpec AudioContext.unlockFlag:', aUnlockFlag);
                audioUnlockEvent.unsubscribe();
                done( aUnlockFlag );
            });
            speakService.unlockAudio();
        }
    };

    beforeAll((done) => {
        console.log('SpeakService Unit-Tests gestartet...');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        // pruefen, ob NUance-Parameter vorhanden sind
        if ( !nuanceOption.nuanceAppId || !nuanceOption.nuanceAppKey ) {
            nuanceOption['nuanceMockFlag'] = true;
            nuanceMockFlag = true;
        }
        // starten von Nuance
        NuanceModule.init( nuanceOption, (aNuanceFlag: boolean) => {
            // console.log('===> SpeakServiceSpec.beforeAll: Nuance.init');
            nuanceFlag = aNuanceFlag;
            done();
        });
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineTimeout;
        NuanceModule.done();
    });

    beforeEach(() => {
        SpeakServiceConfig.errorOutputFlag = false;
        speakService = new TestSpeakService();
        speakService.setErrorOutputOff();
    });

    afterEach(() => {
        speakService.setErrorOutputOff();
        speakService.reset();
        speakService = null;
        SpeechMain.done();
    });

    // setConstructorInitOn/Off

    describe('Funktion setConstructorInitOn/Off', () => {

        it('sollte constructorInitFlag ein/ausschalten', () => {
            SpeakService.setConstructorInitOn();
            expect( SpeakService.isConstructorInit()).toBe( true );
            SpeakService.setConstructorInitOff();
            expect( SpeakService.isConstructorInit()).toBe( false );
            SpeakService.setConstructorInitOn();
            expect( SpeakService.isConstructorInit()).toBe( true );
        });

    });

    // getConfig

    describe('Function getConfig', () => {

        it('sollte ServiceConfig zurueckgeben', () => {
            const config = SpeakService.getConfig();
            expect( config ).toBe( SpeakServiceConfig );
        });

    });

    // constructior

    describe('call constructor', () => {

        it('sollte erzeugt sein, ohne init auszufuehren', () => {
            expect( speakService ).toBeTruthy();
            expect( speakService.isInit()).toBe( false );
        });

        it('sollte speak vorhanden sein, wenn mit init erzeugt', () => {
            SpeakService.setConstructorInitOn();
            const service = new SpeakService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( SpeakServiceConfig.activeFlag );
            expect( service.language ).toBe( SpeakServiceConfig.speakLanguage );
            expect( service.format ).toBe( SpeakServiceConfig.audioFormat );
            expect( service.path ).toEqual( SpeakServiceConfig.audioFilePath );
            expect( service.audio ).toEqual( SpeakServiceConfig.audioFlag );
            expect( service.errorOutput ).toEqual( SpeakServiceConfig.errorOutputFlag );
            service.reset();
            service.setErrorOutputOff();
        });

        it('sollte speak vorhanden sein, wenn mit init erzeugt und config angepasst', () => {
            const config = SpeakService.getConfig();
            config.speakLanguage = SPEAK_EN_LANGUAGE;
            config.audioFormat = SPEAK_WAV_AUDIOFORMAT;
            config.audioFilePath = 'TestPath';
            config.audioFlag = true;
            config.errorOutputFlag = true;
            SpeakService.setConstructorInitOn();
            const service = new SpeakService();
            expect( service ).toBeTruthy();
            expect( service.isInit()).toBeTruthy();
            expect( service.active ).toBe( true );
            expect( service.language ).toBe( SPEAK_EN_LANGUAGE );
            expect( service.format ).toBe( SPEAK_WAV_AUDIOFORMAT );
            expect( service.path ).toEqual( 'TestPath' );
            expect( service.audio ).toEqual( true );
            expect( service.errorOutput ).toEqual( true );
            service.reset();
            service.setErrorOutputOff();
        });

    });

    // _setOption

    describe('Funktion _setOption', () => {

        it('sollte activeFlag setzen, wenn option activeFlag', () => {
            expect( speakService.init()).toBe(0);
            expect( speakService.active ).toBe( true );
            speakService.setOption({ activeFlag: false });
            expect( speakService.active ).toBe( false );
            speakService.setOption({ activeFlag: true });
            expect( speakService.active ).toBe( true );
        });

        it('sollte speakLanguage setzen, wenn option speakFlag', () => {
            expect( speakService.init()).toBe(0);
            expect( speakService.language ).toBe( SPEAK_DE_LANGUAGE );
            speakService.setOption({ speakLanguage: SPEAK_EN_LANGUAGE });
            expect( speakService.language ).toBe( SPEAK_EN_LANGUAGE );
            speakService.setOption({ speakLanguage: SPEAK_DE_LANGUAGE });
            expect( speakService.language ).toBe( SPEAK_DE_LANGUAGE );
        });

        it('sollte audioFormat setzen, wenn option audioFormat', () => {
            expect( speakService.init()).toBe(0);
            speakService.setOption({ audioFormat: SPEAK_WAV_AUDIOFORMAT });
            expect( speakService.format ).toEqual( SPEAK_WAV_AUDIOFORMAT );
            speakService.setOption({ audioFormat: SPEAK_MP3_AUDIOFORMAT });
            expect( speakService.format ).toEqual( SPEAK_MP3_AUDIOFORMAT );
        });

        it('sollte audioFilePath setzen, wenn option audioFilePath', () => {
            expect( speakService.init()).toBe(0);
            speakService.setOption({ audioFilePath: 'TestPath' });
            expect( speakService.path ).toEqual( 'TestPath' );
        });

        it('sollte audioFlag setzen, wenn option audioFlag', () => {
            expect( speakService.init()).toBe(0);
            expect( speakService.audio ).toBe( false );
            speakService.setOption({ audioFlag: true });
            expect( speakService.audio ).toBe( true );
            speakService.setOption({ audioFlag: false });
            expect( speakService.audio ).toBe( false );
        });

        it('sollte errorOutput auf true setzen, wenn option errorOutput true', () => {
            expect( speakService.init()).toBe(0);
            speakService.setOption({ errorOutputFlag: true });
            expect( speakService.errorOutputFlag).toBe( true );
            expect( speakService.errorOutput ).toBe( true );
        });

        it('sollte errorOutput auf false setzen, wenn option errorOutput false', () => {
            expect( speakService.init()).toBe(0);
            speakService.setOption({ errorOutputFlag: false });
            expect( speakService.errorOutputFlag).toBe( false );
            expect( speakService.errorOutput ).toBe( false );
        });

    });

    // _mapOption

    describe('Funktion _mapOption', () => {

        it('sollte speakLanguage zurueckgeben, wenn option speakLanguage', () => {
            const option = speakService.mapOption({ speakLanguage: SPEAK_EN_LANGUAGE });
            expect( option ).toEqual({ speakLanguage: SPEAK_EN_LANGUAGE, errorOutputFlag: speakService.errorOutputFlag });
        });

        it('sollte audioFormat zurueckgeben, wenn option audioFormat', () => {
            const option = speakService.mapOption({ audioFormat: SPEAK_WAV_AUDIOFORMAT });
            expect( option ).toEqual({ audioFormat: SPEAK_WAV_AUDIOFORMAT, errorOutputFlag: speakService.errorOutputFlag });
        });

        it('sollte audioFilePath zurueckgeben, wenn option audioFilePath', () => {
            const option = speakService.mapOption({ audioFilePath: 'TestPath' });
            expect( option ).toEqual({ audioFilePath: 'TestPath', errorOutputFlag: speakService.errorOutputFlag });
        });

        it('sollte audioFlag zurueckgeben, wenn option audioFlag', () => {
            const option = speakService.mapOption({ audioFlag: true });
            expect( option ).toEqual({ audioFlag: true, errorOutputFlag: speakService.errorOutputFlag });
        });

        it('sollte errorOutput true zurueckgeben, wenn option errorOutput true', () => {
            const option = speakService.mapOption({ errorOutputFlag: true });
            expect( option ).toEqual({ errorOutputFlag: true });
            expect( speakService.errorOutputFlag).toBe( true );
        });

        it('sollte errorOutput false zurueckgeben, wenn option errorOutput false', () => {
            const option = speakService.mapOption({ errorOutputFlag: false });
            expect( option ).toEqual({ errorOutputFlag: false });
            expect( speakService.errorOutputFlag ).toBe( false );
        });

    });

    // init

    describe('Funktion init', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.isErrorOutput()).toBe( false );
            expect(speakService.isActive()).toBe( true );
            expect(speakService.isAudio()).toBe( false );
            expect(speakService.getAudioFormat()).toEqual( SPEAK_MP3_AUDIOFORMAT );
            expect(speakService.getAudioFilePath()).toEqual('assets/');
            expect(speakService.getAudioFileName()).toEqual('');
            expect(speakService.getLanguage()).toBe( SPEAK_DE_LANGUAGE );
            expect(speakService.getText()).toBe('');
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option speakLanguage gesetzt ist', () => {
            expect(speakService.init({ speakLanguage: SPEAK_EN_LANGUAGE })).toBe(0);
            expect(speakService.getLanguage()).toEqual( SPEAK_EN_LANGUAGE );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option audioFormat gesetzt ist', () => {
            expect(speakService.init({ audioFormat: SPEAK_WAV_AUDIOFORMAT })).toBe(0);
            expect(speakService.getAudioFormat()).toEqual( SPEAK_WAV_AUDIOFORMAT );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option audioFilePath gesetzt ist', () => {
            expect(speakService.init({ audioFilePath: 'assets/speech/' })).toBe(0);
            expect(speakService.getAudioFilePath()).toEqual( 'assets/speech/' );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option audioFlag gesetzt ist', () => {
            expect(speakService.init({ audioFlag: true })).toBe(0);
            expect(speakService.isAudio()).toBe( true );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option errorOutputFlag gesetzt ist', () => {
            expect(speakService.init({ errorOutputFlag: true })).toBe(0);
            expect(speakService.isErrorOutput()).toBe( true );
        });

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.reset()).toBe(0);
            expect(speakService.isErrorOutput()).toBe( false );
            expect(speakService.isActive()).toBe( true );
            expect(speakService.isAudio()).toBe( false );
            expect(speakService.getAudioFormat()).toEqual( SPEAK_MP3_AUDIOFORMAT );
            expect(speakService.getAudioFilePath()).toEqual('assets/');
            expect(speakService.getAudioFileName()).toEqual('');
            expect(speakService.getLanguage()).toBe( SPEAK_DE_LANGUAGE );
            expect(speakService.getText()).toBe('');
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option speakLanguage gesetzt ist', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.reset({ speakLanguage: SPEAK_EN_LANGUAGE })).toBe(0);
            expect(speakService.getLanguage()).toEqual( SPEAK_EN_LANGUAGE );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option audioFormat gesetzt ist', () => {
            pending('AudioFormat wird an AudioPlayer nicht weitergereicht');
            expect(speakService.init()).toBe(0);
            expect(speakService.reset({ audioFormat: SPEAK_WAV_AUDIOFORMAT })).toBe(0);
            expect(speakService.getAudioFormat()).toEqual( SPEAK_WAV_AUDIOFORMAT );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option audioFilePath gesetzt ist', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.reset({ audioFilePath: 'assets/speech/' })).toBe(0);
            expect(speakService.getAudioFilePath()).toEqual( 'assets/speech/' );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option audioFlag gesetzt ist', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.reset({ audioFlag: true })).toBe(0);
            expect(speakService.isAudio()).toBe( true );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und option errorOutputFlag gesetzt ist', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.reset({ errorOutputFlag: true })).toBe(0);
            expect(speakService.isErrorOutput()).toBe( true );
        });

    });

    // _addAllEvent

    describe('Funktion _addAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService._addAllEvent: keine Komponente vorhanden');
                done();
            });
            expect(speakService.addAllEvent()).toBe(-1);
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.addAllEvent()).toBe(0);
        });

    });

    // xxxEvent

    describe('Funktion xxxEvent', () => {

        it('sollte event zurueckgeben', () => {
            expect(speakService.startEvent).toBeTruthy();
            expect(speakService.stopEvent).toBeTruthy();
            expect(speakService.errorEvent).toBeTruthy();
        });

    });

    // isAudio

    describe('Funktion isAudio', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.isAudio: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.isAudio()).toBe( false );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde', () => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                fail('Test Error: ' + aError.message);
                return 0;
            });
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOff()).toBe(0);
            expect(speakService.isAudio()).toBe(false);
            errorEvent.unsubscribe();
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde und audio ein gesetzt ist', () => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                fail('Test Error: ' + aError.message);
                return 0;
            });
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOn()).toBe(0);
            expect(speakService.isAudio()).toBe(true);
            errorEvent.unsubscribe();
        });

    });

    // setAudioOn

    describe('Funktion setAudioOn', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioOn: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setAudioOn()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOn()).toBe(0);
        });

    });

    // setAudioOff

    describe('Funktion setAudioOff', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioOff: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setAudioOff()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOff()).toBe(0);
        });

    });

    // audio

    describe('Eigenschaft audio', () => {

        it('sollte audio nicht setzen, wenn init nicht aufgerufen und auf true gesetzt wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioOn: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.audio = true;
        });

        it('sollte audio false zurueckgeben, wenn init nicht aufgerufen und auf true gesetzt wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.isAudio: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.audio ).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen und auf true gesetzt wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.audio = true;
            expect( speakService.audio ).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen und auf false gesetzt wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.audio = false;
            expect( speakService.audio ).toBe( false );
        });

    });

    // setAudioFormat

    describe('Funktion setAudioFormat', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioFormat: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setAudioFormat('')).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioFormat( SPEAK_WAV_AUDIOFORMAT )).toBe(0);
            expect(speakService.getAudioFormat()).toEqual( SPEAK_WAV_AUDIOFORMAT );
        });

    });

    // getAudioFormat

    describe('Funktion getAudioFormat', () => {

        it('sollte leeren String zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getAudioFormat: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.getAudioFormat()).toBe( '' );
        });

        it('sollte mp3 String zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.getAudioFormat()).toEqual( SPEAK_MP3_AUDIOFORMAT );
        });

    });

    // format

    describe('Eigenschaft format', () => {

        it('sollte format nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioFormat: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.format = '';
        });

        it('sollte leeres audio zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getAudioFormat: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.format ).toBe( '' );
        });

        it('sollte format setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.format = SPEAK_WAV_AUDIOFORMAT;
            expect( speakService.format ).toBe( SPEAK_WAV_AUDIOFORMAT );
        });

    });

    // setAudioFilePath

    describe('Funktion setAudioFilePath', () => {

        it('sollte Audiopfad nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioFilePath: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setAudioFilePath('')).toBe( -1 );
        });

        it('sollte Audiopfad setzen, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioFilePath( 'TestPath' )).toBe(0);
            expect(speakService.getAudioFilePath()).toEqual( 'TestPath' );
        });

    });

    // getAudioFilePath

    describe('Funktion getAudioFilePath', () => {

        it('sollte leeren path zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getAudioFilePath: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.getAudioFilePath()).toBe( '' );
        });

        it('sollte assets Defaultpfad zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.getAudioFilePath()).toEqual( 'assets/' );
        });

    });

    // path

    describe('Eigenschaft path', () => {

        it('sollte path nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioFilePath: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.path = '';
        });

        it('sollte leeren path zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getAudioFilePath: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.path ).toBe( '' );
        });

        it('sollte path setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.path = 'TestPath';
            expect( speakService.path ).toBe( 'TestPath' );
        });

    });

    // setAudioFileName

    describe('Funktion setAudioFileName', () => {

        it('sollte file nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioFileName: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setAudioFileName('')).toBe( -1 );
        });

        it('sollte FileName setzen, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioFileName( 'TestFile' )).toBe(0);
            expect(speakService.getAudioFileName()).toEqual( 'TestFile' );
        });

    });

    // getAudioFileName

    describe('Funktion getAudioFileName', () => {

        it('sollte leeres file zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getAudioFileName: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.getAudioFileName()).toBe( '' );
        });

        it('sollte leeres file zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.getAudioFileName()).toEqual( '' );
        });

    });

    // file

    describe('Eigenschaft file', () => {

        it('sollte file nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setAudioFileName: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.file = '';
        });

        it('sollte leeres file zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getAudioFileName: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.file ).toBe( '' );
        });

        it('sollte file setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.file = 'TestFile';
            expect( speakService.file ).toBe( 'TestFile' );
        });

    });

    // setTTS

    describe('Funktion setTTS', () => {

        it('sollte TTS nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.setTTS: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( speakService.setTTS('')).toBe( -1 );
        });

        it('sollte Html5-TTS setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            expect( speakService.setTTS( SPEAK_HTML5_TTS )).toBe( 0 );
            expect( speakService.getTTS()).toBe( SPEAK_HTML5_TTS );
        });

        it('sollte Nuance-TTS setzen, wenn Nuance vorhanden ist', () => {
            expect( speakService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                expect( speakService.setTTS( SPEAK_NUANCE_TTS )).toBe( 0 );
                expect( speakService.getTTS()).toBe( SPEAK_NUANCE_TTS );
            } else {
                const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                    errorEvent.unsubscribe();
                    expect( aError.message ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
                    return 0;
                });
                expect( speakService.setTTS( SPEAK_NUANCE_TTS )).toBe( -1 );
                expect( speakService.getTTS()).toBe( SPEAK_HTML5_TTS );
            }
        });

    });

    // getTTS

    describe('Funktion getTTS', () => {

        it('sollte ein leeren String zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.getTTS: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( speakService.getTTS()).toBe( '' );
        });

        it('sollte Html5-TTS zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            expect( speakService.getTTS()).toBe( SPEAK_HTML5_TTS );
        });

    });

    // tts

    describe('Eigenschaft tts', () => {

        it('sollte tts nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.setTTS: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            speakService.tts = '';
        });

        it('sollte leere tts zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.getTTS: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            expect( speakService.tts ).toBe( '' );
        });

        it('sollte tts setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.tts = SPEAK_HTML5_TTS;
            expect( speakService.tts ).toBe( SPEAK_HTML5_TTS );
        });

    });

    // getTTSList

    describe('Funktion getTTSList', () => {

        it('sollte leere TTS liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.getTTSList: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            const ttsList = speakService.getTTSList();
            expect( ttsList.length ).toBe( 0 );
        });

        it('sollte komplette TTS liste zurueckgeben, wenn Nuance vorhanden ist', () => {
            expect( speakService.init()).toBe( 0 );
            const ttsList = speakService.getTTSList();
            if ( nuanceFlag ) {
                expect( ttsList.length ).toBe( 2 );
                expect( ttsList[ 0 ]).toEqual( SPEAK_HTML5_TTS );
                expect( ttsList[ 1 ]).toEqual( SPEAK_NUANCE_TTS );
            } else {
                expect( ttsList.length ).toBe( 1 );
                expect( ttsList[ 0 ]).toEqual( SPEAK_HTML5_TTS );
            }
        });

    });

    // ttses

    describe('Eigenschaft ttses', () => {

        it('sollte leere TTS liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getTTSList: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.ttses.length ).toBe( 0 );
        });

        it('sollte TTS liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            const ttses = speakService.ttses;
            if ( nuanceFlag ) {
                expect( ttses.length ).toBe( 2 );
                expect( ttses[ 0 ]).toBe( SPEAK_HTML5_TTS );
                expect( ttses[ 1 ]).toBe( SPEAK_NUANCE_TTS );
            } else {
                expect( ttses.length ).toBe( 1 );
                expect( ttses[ 0 ]).toBe( SPEAK_HTML5_TTS );
            }
        });

    });

    // setLanguage

    describe('Funktion setLanguage', () => {

        it('sollte language nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setLanguage: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setLanguage('')).toBe( -1 );
        });

        it('sollte language setzen, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.setLanguage( SPEAK_EN_LANGUAGE )).toBe(0);
            expect(speakService.getLanguage()).toEqual( SPEAK_EN_LANGUAGE );
        });

    });

    // getLanguage

    describe('Funktion getLanguage', () => {

        it('sollte leere language zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getLanguage: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.getLanguage()).toBe( '' );
        });

        it('sollte language de zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.getLanguage()).toEqual( SPEAK_DE_LANGUAGE );
        });

    });

    // language

    describe('Eigenschaft language', () => {

        it('sollte language nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setLanguage: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.language = '';
        });

        it('sollte leere language zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getLanguage: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.language ).toBe( '' );
        });

        it('sollte language setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.language = SPEAK_EN_LANGUAGE;
            expect( speakService.language ).toBe( SPEAK_EN_LANGUAGE );
        });

    });

    // getLanguageList

    describe('Funktion getLanguageList', () => {

        it('sollte leere language liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.getLanguageList: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            const languageList = speakService.getLanguageList();
            expect( languageList.length ).toBe( 0 );
        });

        it('sollte language liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            const languageList = speakService.getLanguageList();
            expect( languageList.length ).toBe( 2 );
            expect( languageList[ 0 ]).toEqual( SPEAK_DE_LANGUAGE );
            expect( languageList[ 1 ]).toEqual( SPEAK_EN_LANGUAGE );
        });

    });

    // languages

    describe('Eigenschaft languages', () => {

        it('sollte leere language liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getLanguageList: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.languages.length ).toBe( 0 );
        });

        it('sollte language liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            const languages = speakService.languages;
            expect( languages.length ).toBe( 2 );
            expect( languages[ 0 ]).toBe( SPEAK_DE_LANGUAGE );
            expect( languages[ 1 ]).toBe( SPEAK_EN_LANGUAGE );
        });

    });

    // setVoice

    describe('Funktion setVoice', () => {

        it('sollte voice nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setVoice: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setVoice('')).toBe( -1 );
        });

        it('sollte voice setzen, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe( 0 );
            expect(speakService.setVoice( 'Anna' )).toBe( 0 );
            expect(speakService.getVoice()).toBe( 'Anna' );
        });

    });

    // getVoice

    describe('Funktion getVoice', () => {

        it('sollte leere voice zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getVoice: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.getVoice()).toBe( '' );
        });

        it('sollte voice zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe( 0 );
            expect(speakService.setVoice( 'Anna' )).toBe( 0 );
            expect(speakService.getVoice()).toBe( 'Anna' );
        });

    });

    // voice

    describe('Eigenschaft voice', () => {

        it('sollte voice nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setVoice: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.voice = '';
        });

        it('sollte leere voice zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getVoice: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.voice ).toBe( '' );
        });

        it('sollte voice setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.voice = 'Petra';
            expect( speakService.voice ).toBe( 'Petra' );
        });

    });

    // getVoiceList

    describe('Funktion getVoiceList', () => {

        it('sollte leere voice liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.getVoiceList: keine Speak-Komponente vorhanden' );
                done();
                return 0;
            });
            const voiceList = speakService.getVoiceList();
            expect( voiceList.length ).toBe( 0 );
        });

        it('sollte voice liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            const voiceList = speakService.getVoiceList();
            console.log('===> SpeakService Stimmenliste:', voiceList );
            // TODO: leider individuell fuer jeden Browser, Rechner und jede Plattform !
            // Mac OSX, Google Chrome
            // expect( voiceList.length > 0 ).toBe( true );
            // expect( voiceList[ 0 ]).toEqual( 'Anna' );
            // expect( voiceList[ 1 ]).toEqual( 'Markus' );
            // expect( voiceList[ 2 ]).toEqual( 'Petra' );
            // expect( voiceList[ 3 ]).toEqual( 'Yannick' );
            // expect( voiceList[ 4 ]).toEqual( 'Google Deutsch' );
        });

    });

    // voices

    describe('Eigenschaft voices', () => {

        it('sollte leere voice liste zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getVoiceList: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.voices.length ).toBe( 0 );
        });

        it('sollte voice liste zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            const voices = speakService.voices;
            // TODO: leider individuell fuer jeden Browser, Rechner und jede Plattform !
            // Mac OSX, Google Chrome
            // expect( voices.length > 0 ).toBe( true );
            // expect( voices[ 0 ]).toEqual( 'Anna' );
            // expect( voices[ 1 ]).toEqual( 'Markus' );
            // expect( voices[ 2 ]).toEqual( 'Petra' );
            // expect( voices[ 3 ]).toEqual( 'Yannick' );
            // expect( voices[ 4 ]).toEqual( 'Google Deutsch' );
        });

    });

    // setText

    describe('Funktion setText', () => {

        it('sollte text nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setText: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.setText('')).toBe( -1 );
        });

        it('sollte text setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            expect( speakService.setText( 'TestText' )).toBe( 0 );
            expect( speakService.getText()).toEqual( 'TestText' );
        });

    });

    // getText

    describe('Funktion getText', () => {

        it('sollte leeren text zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getText: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect(speakService.getText()).toBe( '' );
        });

        it('sollte leeren text zurueckgeben, wenn init aufgerufen wurde', () => {
            expect(speakService.init()).toBe(0);
            expect(speakService.getText()).toEqual( '' );
        });

    });

    // text

    describe('Eigenschaft text', () => {

        it('sollte text nicht setzen, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.setText: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            speakService.text = '';
        });

        it('sollte leeren text zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('SpeakService.getText: keine Speak-Komponente vorhanden');
                done();
                return 0;
            });
            expect( speakService.text ).toBe( '' );
        });

        it('sollte text setzen, wenn init aufgerufen wurde', () => {
            expect( speakService.init()).toBe( 0 );
            speakService.text = 'TestText';
            expect( speakService.text ).toBe( 'TestText' );
        });

    });

    // start TTS

    describe('Funktion start TTS', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'SpeakService.start: keine Komponente vorhanden' );
                done();
                return 0;
            });
            expect( speakService.start()).toBe( -1 );
        });

        // tslint:disable-next-line
        it('sollte 0 zurueckgeben und mit Googles deutscher Stimme sprechen, wenn init aufgerufen wurde und Netzwerkverbindung', (done) => {
            let stopEvent = null;
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                console.log('SpeakService.Test: start TTS ', aError.message);
                if ( aError.message !==  'not-allowed' && aError.message !== 'NuancePort._startTTS: AudioContext ist nicht entsperrt') {
                    done.fail('===> SpeakServiceSpec.start(TTS): ErrorEvent = ' + aError.message);
                }
                done();
                return 0;
            });
            stopEvent = speakService.stopEvent.subscribe(() => {
                console.log('===> SpeakServiceSpeak.start(TTS): StopEvent');
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            expect( speakService.init()).toBe( 0 );
            _unlockAudio((aUnlockFlag: boolean) => {
                console.log('===> Speak-E2E AudioContext.unlockFlag:', aUnlockFlag);
                expect( speakService.setTTS( SPEAK_HTML5_TTS )).toBe( 0 );
                expect( speakService.setVoice( 'Google Deutsch' )).toBe ( 0 );
                expect( speakService.setText( 'Dies ist ein Testtext mit Googles deutscher Stimme' )).toBe( 0 );
                expect( speakService.start()).toBe( 0 );
                /* // TODO: UnlockFlag bestimmt nicht den Zustand von SpeechSynthesis im Web-API,
                   // daher kommt es zu Fehlermeldungen und isRunning = false ! Muss untersucht werden.
                if ( aUnlockFlag ) {
                    expect( speakService.isRunning()).toBe( true );
                } else {
                    expect( speakService.isRunning()).toBe( false );
                }
                */
            });
            speakService.unlockAudio();
        });

        it('sollte 0 zurueckgeben und mit Nuance Stimme sprechen, wenn init aufgerufen wurde und Netzwerkverbindung', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                if ( !nuanceFlag ) {
                    expect( aError.message ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
                    done();
                } else {
                    if ( aError.message === 'NuancePort._startTTS: AudioContext ist nicht entsperrt' ) {
                        done();
                    } else {
                        done.fail( 'Test Error: ' + aError.message );
                    }
                }
                return 0;
            });
            let callStart = false;
            const startEvent = speakService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                callStart = true;
                return 0;
            });
            const stopEvent = speakService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            expect( speakService.init()).toBe( 0 );
            if ( nuanceFlag ) {
                console.log('===> NuanceFlag: true');
                expect( speakService.setTTS( SPEAK_NUANCE_TTS )).toBe( 0 );
                expect( speakService.setVoice( 'Yannick' )).toBe ( 0 );
                expect( speakService.setText( 'Dies ist ein Testtext mit Nuance deutscher Stimme' )).toBe( 0 );
                _unlockAudio((aUnlockFlag: boolean) => {
                    if ( aUnlockFlag ) {
                        console.log('===> UnlockFlag: true');
                        expect( speakService.start()).toBe( 0 );
                        expect( speakService.isRunning()).toBe( true );
                    } else {
                        console.log('===> UnlockFlag: false');
                        expect( speakService.start()).toBe( 0 );
                        done();
                    }
                });
            } else {
                console.log('===> NuanceFLag: false');
                expect( speakService.setTTS( SPEAK_NUANCE_TTS )).toBe( -1 );
                done();
            }
        });

    });

    // stop TTS

    describe('Funktion stop TTS', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                fail( 'Test Error: ' + aError.message );
                return 0;
            });
            expect(speakService.init()).toBe(0);
            expect(speakService.stop()).toBe(0);
            errorEvent.unsubscribe();
        });

        it('sollte 0 zurueckgeben, wenn init und start aufgerufen wurden', (done) => {
            pending('Aenderung der Audioplay Policy in Chrome 71');
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                console.log('SpeakService.Test: stop TTS ', aError);
                // done.fail( 'Test Error: ' + aError );
                return 0;
            });
            let callStart = false;
            const startEvent = speakService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                callStart = true;
                return 0;
            });
            const stopEvent = speakService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                expect( callStart ).toBe( true );
                done();
                return 0;
            });
            expect(speakService.init()).toBe( 0 );
            expect(speakService.setText( 'TestText' )).toBe( 0 );
            expect(speakService.start()).toBe( 0 );
            expect(speakService.isRunning()).toBe( true );
            expect(speakService.stop()).toBe( 0 );
            expect(speakService.isRunning()).toBe( false );
        });

    });

    // start Audio

    describe('Funktion start Audio', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', (done) => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                done.fail('Test Error: ' + aError.message);
                return 0;
            });
            let callStart = false;
            const startEvent = speakService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                callStart = true;
                return 0;
            });
            const stopEvent = speakService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                stopEvent.unsubscribe();
                expect(callStart).toBe(true);
                done();
                return 0;
            });
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOn()).toBe(0);
            expect(speakService.setAudioFilePath( './../../assets/speech/audio/' )).toBe(0);
            expect(speakService.setAudioFileName( 'yannick1' )).toBe(0);
            if ( speakService.isUnlockAudio()) {
                expect(speakService.start()).toBe(0);
                expect(speakService.isRunning()).toBe( true );
            } else {
                done();
            }
        });

    });

    // stop Audio

    describe('Funktion stop Audio', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                fail('Test Error: ' + aError.message);
                return 0;
            });
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOn()).toBe(0);
            expect(speakService.stop()).toBe(0);
            errorEvent.unsubscribe();
        });

        it('sollte 0 zurueckgeben, wenn init und start aufgerufen wurden', (done) => {
            let startEvent = null;
            let stopEvent = null;
            const errorEvent = speakService.errorEvent.subscribe((aError: any) => {
                startEvent.unsubscribe();
                stopEvent.unsubscribe();
                errorEvent.unsubscribe();
                done.fail('Test Error: ' + aError.message);
                return 0;
            });
            let callStart = false;
            startEvent = speakService.startEvent.subscribe(() => {
                startEvent.unsubscribe();
                callStart = true;
                return 0;
            });
            stopEvent = speakService.stopEvent.subscribe(() => {
                errorEvent.unsubscribe();
                startEvent.unsubscribe();
                stopEvent.unsubscribe();
                done();
                return 0;
            });
            expect(speakService.init()).toBe(0);
            expect(speakService.setAudioOn()).toBe(0);
            expect(speakService.setAudioFilePath('./../../assets/speech/audio/')).toBe(0);
            expect(speakService.setAudioFileName( 'yannick1' )).toBe(0);
            if ( speakService.isUnlockAudio()) {
                expect(speakService.start()).toBe(0);
            } else {
                done();
            }
        });

    });

});
