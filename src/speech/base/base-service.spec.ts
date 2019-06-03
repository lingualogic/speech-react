/**
 * Unit-Test von BaseService
 *
 * Letzter Aenderung: 23.01.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac), Firefox(Mac), Opera(Mac), Safari(Mac)
 *
 * @module speech/base
 * @author SB
 */


// speech-framework

import { BASE_COMPONENT_NAME, BaseInterface } from 'speech-framework';

// base

import { BASE_SERVICE_NAME } from './base-service-const';
import { BASESERVICE_API_VERSION } from './base-service-version';
import { BaseServiceConfig } from './base-service-config';
import { BaseService } from './base-service';


// Testklassen

class TestBase implements BaseInterface {
    activeFlag = true;
    errorOutput = false;
    runningFlag = false;
    reset(aOption?: any): number { return 0; }
    getType(): string { return 'Base'; }
    getName(): string { return 'TestBase'; }
    getVersion(): string { return '0.0'; }
    getServerVersion(): string { return ''; }
    isActive(): boolean { return this.activeFlag; }
    setActiveOn(): number { this.activeFlag = true; return 0; }
    setActiveOff(): number { this.activeFlag = false; return 0; }
    isErrorOutput(): boolean { return this.errorOutput; }
    setErrorOutputOn(): void { this.errorOutput = true; }
    setErrorOutputOff(): void { this.errorOutput = false; }
    addInitEvent(aPluginName: string, aEventFunc: (aName: string) => number): number { return 0; }
    addStartEvent(aPluginName: string, aEventFunc: () => number): number { return 0; }
    addStopEvent(aPluginName: string, aEventFunc: () => number): number { return 0; }
    addErrorEvent(aPluginName: string, aEventFunc: (aError: any) => number): number { return 0; }
    removeInitEvent(aPluginName: string): number { return 0; }
    removeStartEvent(aPluginName: string): number { return 0; }
    removeStopEvent(aPluginName: string): number { return 0; }
    removeErrorEvent(aPluginName: string): number { return 0; }
    removeAllEvent(aPluginName: string): number { return 0; }
    isRunning(): boolean { return this.runningFlag; }
    start(): number { this.runningFlag = true; return 0; }
    stop(): number { this.runningFlag = false; return 0; }
    test(aTestCommand: string, aTestData?: any): any { return ''; }
}

class TestBaseService extends BaseService {

    constructor() {
        super( BASE_COMPONENT_NAME, BASE_SERVICE_NAME, BASESERVICE_API_VERSION );
    }

    setOption( aOption: any): void {
        this._setOption( aOption );
    }

    mapOption( aOption: any): any {
        return this._mapOption( aOption );
    }

    _createComponent( aComponentName: string, aOption: any): BaseInterface {
        // console.log('TestBaseService._createComponent');
        return new TestBase();
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

describe('BaseService', () => {

    let baseService: TestBaseService;

    beforeAll(() => {
        console.log('BaseService Unit-Tests gestartet...');
    });

    beforeEach(() => {
        baseService = new TestBaseService();
        baseService.setErrorOutputOff();
    });

    afterEach(() => {
        baseService.setErrorOutputOff();
        baseService.reset();
        baseService = null;
    });

    // constructor

    describe('Funktion constructor', () => {

        it('sollte erzeugt sein, inklusive init auszufuehren', () => {
            expect( baseService ).toBeTruthy();
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isInit()).toBe( true );
            expect( baseService.getComponentName()).toBe( BASE_COMPONENT_NAME );
            expect( baseService.getName()).toBe( BASE_SERVICE_NAME );
            expect( baseService.getVersion()).toBe( BASESERVICE_API_VERSION );
        });

    });

    // _setOption

    describe('Funktion _setOption', () => {

        it('sollte aktiv auf true setzen, wenn option active true', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setOption({ activeFlag: true });
            expect( baseService.active ).toBe( true );
            expect( baseService.isActive()).toBe( true );
        });

        it('sollte aktiv auf false setzen, wenn option active false', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setOption({ activeFlag: false });
            expect( baseService.active ).toBe( false );
            expect( baseService.isActive()).toBe( false );
        });

        it('sollte error output auf true setzen, wenn option error output true', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setOption({ errorOutputFlag: true });
            expect( baseService.errorOutput ).toBe( true );
            expect( baseService.isErrorOutput()).toBe( true );
        });

        it('sollte error output auf false setzen, wenn option error output false', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setOption({ errorOutputFlag: false });
            expect( baseService.errorOutput ).toBe( false );
            expect( baseService.isErrorOutput()).toBe( false );
        });

    });

    // _mapOption

    describe('Funktion _mapOption', () => {

        it('sollte error output auf zurueckgeben, wenn keine option uebergeben wird', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.errorOutput = false;
            const option = baseService.mapOption( null );
            expect( option ).toEqual({ errorOutputFlag: false });
        });

        it('sollte error output auf true setzen, wenn option error output true', () => {
            expect( baseService.init()).toBe( 0 );
            const option = baseService.mapOption({ errorOutputFlag: true });
            expect( option ).toEqual({ errorOutputFlag: true });
            expect( baseService.errorOutputFlag ).toBe( true );
        });

        it('sollte error output auf false setzen, wenn option error output false', () => {
            expect( baseService.init()).toBe( 0 );
            const option = baseService.mapOption({ errorOutputFlag: false });
            expect( option ).toEqual({ errorOutputFlag: false });
            expect( baseService.errorOutputFlag ).toBe( false );
        });

    });

    // init

    describe('Funktion init', () => {

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isActive()).toBe( true );
        });

        it('sollte 0 zurueckgeben, wenn init zweimal aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.init()).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn keine Komponente erzeugt wurde', (done) => {
            let componentName = '';
            let option = null;
            baseService._createComponent = ( aComponentName: string, aOption: any) => {
                componentName = aComponentName;
                option = aOption;
                return null;
            };
            const errorEvent = baseService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BaseService.init: Komponente nicht erzeugt' );
                done();
            });
            expect( baseService.init({ errorOutputFlag: true })).toBe( -1 );
            expect( componentName ).toBe( BASE_COMPONENT_NAME );
            expect( option ).toEqual({ errorOutputFlag: true });
        });

        it('sollte 0 zurueckgeben, wenn Komponente erzeugt wurde', () => {
            expect( baseService.init({ errorOutputFlag: true })).toBe( 0 );
        });

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = baseService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('BaseService.reset: keine Komponente vorhanden');
                done();
            });
            expect(baseService.reset()).toBe( -1 );
            expect(baseService.isActive()).toBe( false );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect(baseService.reset()).toBe(0);
            expect(baseService.isActive()).toBe( true );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            const option = {
                activeFlag: false
            };
            expect(baseService.reset( option )).toBe( 0 );
            expect(baseService.isActive()).toBe( false );
        });

    });

    // isInit

    describe('Funktion isInit', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            expect( baseService.isInit()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isInit()).toBe( true );
        });

        it('sollte true zurueckgeben, wenn init und reset aufgerufen wurden', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isInit()).toBe( true );
            expect( baseService.reset()).toBe( 0 );
            expect( baseService.isInit()).toBe( true );
        });

    });

    // isActive

    describe('Funktion istActive', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            expect( baseService.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde und active aus ist', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.setActiveOff()).toBe( 0 );
            expect( baseService.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde und active an ist', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.setActiveOff()).toBe( 0 );
            expect( baseService.setActiveOn()).toBe( 0 );
            expect( baseService.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            expect( baseService.setActiveOn()).toBe( -1 );
            expect( baseService.isActive()).toBe( false );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.setActiveOn()).toBe( 0 );
            expect( baseService.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            expect( baseService.setActiveOff()).toBe( -1 );
            expect( baseService.isActive()).toBe( false );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.setActiveOff()).toBe( 0 );
            expect( baseService.isActive()).toBe( false );
        });

    });

    // active

    describe('Eigenschaft active', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen und auf true gesetzt wurde', () => {
            baseService.active = true;
            expect( baseService.active ).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen und auf true gesetzt wurde', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.active = true;
            expect( baseService.active ).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen und auf false gesetzt wurde', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.active = false;
            expect( baseService.active ).toBe( false );
        });

    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            expect( baseService.isErrorOutput()).toBe( baseService.errorOutputFlag );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgrufen wurde und error output an ist', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setErrorOutputOn();
            expect( baseService.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde und error output aus ist', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setErrorOutputOn();
            baseService.setErrorOutputOff();
            expect( baseService.isErrorOutput()).toBe( false );
        });

    });

    // setErrorOutputOn

    describe('Funktion setErrorOutputOn', () => {

        it('sollte true zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            baseService.setErrorOutputOn();
            expect( baseService.isErrorOutput()).toBe( true );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setErrorOutputOn();
            expect( baseService.isErrorOutput()).toBe( true );
        });

    });

    // setErrorOutputOff

    describe('Funktion setErrorOutputOff', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            baseService.setErrorOutputOff();
            expect( baseService.isErrorOutput()).toBe( false );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.setErrorOutputOff();
            expect( baseService.isErrorOutput()).toBe( false );
        });

    });

    // errorOutput

    describe('Eigenschaft errorOutput', () => {

        it('sollte true zurueckgeben, wenn init nicht aufgerufen und auf true gesetzt wurde', () => {
            baseService.errorOutput = true;
            expect( baseService.errorOutput ).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init nicht aufgerufen und auf false gesetzt wurde', () => {
            baseService.errorOutput = false;
            expect( baseService.errorOutput ).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init aufgerufen und auf true gesetzt wurde', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.errorOutput = true;
            expect( baseService.errorOutput ).toBe( true );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen und auf false gesetzt wurde', () => {
            expect( baseService.init()).toBe( 0 );
            baseService.errorOutput = false;
            expect( baseService.errorOutput ).toBe( false );
        });

    });

    // _error

    // _exception

    // _addAllEvent

    describe('Funktion _addAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = baseService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect(aError.message).toEqual('BaseService._addAllEvent: keine Komponente vorhanden');
                done();
            });
            expect(baseService.addAllEvent()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect(baseService.addAllEvent()).toBe( 0 );
        });

    });

    // xxxEvent

    describe('Eigenschaft xEvent', () => {

        it('sollte alle Eventfunktionen zurueckgeben', () => {
            expect( baseService.startEvent ).toBeTruthy();
            expect( baseService.stopEvent ).toBeTruthy();
            expect( baseService.errorEvent ).toBeTruthy();
        });

    });

    // isRunning

    describe('Funktion isRunning', () => {

        it('sollte false zurueckgeben, wenn init nicht aufgerufen wurde', () => {
            expect( baseService.isRunning()).toBe( false );
        });

        it('sollte false zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn init und start aufgerufen wurden', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
            expect( baseService.start()).toBe( 0 );
            expect( baseService.isRunning()).toBe( true );
            expect( baseService.stop()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
        });

    });

    // start

    describe('Funktion start', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = baseService.errorEvent.subscribe((aError) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BaseService.start: keine Komponente vorhanden' );
                done();
            });
            expect( baseService.start()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
            expect( baseService.start()).toBe( 0 );
            expect( baseService.isRunning()).toBe( true );
            expect( baseService.stop()).toBe( 0 );
        });

    });

    // stop

    describe('Funktion stop', () => {

        it('sollte -1 zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = baseService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BaseService.stop: keine Komponente vorhanden' );
                done();
            });
            expect( baseService.stop()).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn init aufgerufen wurde und kein start', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
            expect( baseService.stop()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
        });

        it('sollte 0 zurueckgeben, wenn init und start aufgerufen wurden', () => {
            expect( baseService.init()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
            expect( baseService.start()).toBe( 0 );
            expect( baseService.isRunning()).toBe( true );
            expect( baseService.stop()).toBe( 0 );
            expect( baseService.isRunning()).toBe( false );
        });

    });

    // test

    describe('Funktion test', () => {

        it('sollte { result: -1 } zurueckgeben, wenn init nicht aufgerufen wurde', (done) => {
            const errorEvent = baseService.errorEvent.subscribe((aError: any) => {
                errorEvent.unsubscribe();
                expect( aError.message ).toBe( 'BaseService.test: keine Komponente vorhanden' );
                done();
            });
            expect( baseService.test( '' )).toEqual( { result: -1 });
        });

    });

});
