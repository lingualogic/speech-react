/**
 * Unit-Test von GoogleModule
 *
 * Letzter Aenderung: 09.05.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/google
 * @author SB
 */


// google

import { GoogleModuleConfigInterface } from './google-module-config.interface';
import { GoogleModuleOptionInterface } from './google-module-option.interface';
import { GoogleModule } from './google-module';


// Konstanten


// GoogleMock ein/ausschalten, um Tests auch mit GooglePort durchfuehren zu koennen.
// ist GoogleMock false, muss das Netzwerk eingeschaltet sein, damit GooglePort richtig funktioniert

const GOOGLE_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('GoogeModule', () => {

    beforeAll(() => {
        console.log('GoogleModule Unit-Tests gestartet...');
    });

    afterEach(() => {
        GoogleModule.done();
    });

    // init

    describe('Funktion init', () => {

        it('sollte GoogleFlag true zurueckgeben, wenn googleDynamicCredentialsFlag true ist', (done) => {
            const googleOption: GoogleModuleOptionInterface = {
                googleDynamicCredentialsFlag: true,
                googleMockFlag: GOOGLE_MOCK_FLAG
            };
            GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
                expect( aGoogleFlag ).toBe( true );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte GoogleFlag false zurueckgeben, wenn googleParameter empty ist', (done) => {
            const googleOption: GoogleModuleOptionInterface = {
                googleMockFlag: GOOGLE_MOCK_FLAG
            };
            GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
                expect( aGoogleFlag ).toBe( false );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

    // setConfig

    describe('Funktion setConfig', () => {

        it('sollte Credentials nicht eintragen, wenn googleDynamicCredentialsFlag false ist', (done) => {
            const googleConfigData: GoogleModuleConfigInterface = {
                googleAppKey: 'testAppKeyn'
            };
            const googleOption: GoogleModuleOptionInterface = {
                googleDynamicCredentialsFlag: false,
                googleAppKey: 'testAppKey',
                googleMockFlag: GOOGLE_MOCK_FLAG
            };
            GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
                expect( aGoogleFlag ).toBe( true );
                expect( GoogleModule.setConfig( googleConfigData )).toBe( -1 );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte Credentials eintragen, wenn googleDynamicCredentialsFlag true ist', (done) => {
            const googleConfigData: GoogleModuleConfigInterface = {
                googleAppKey: 'testAppKey'
            };
            const googleOption: GoogleModuleOptionInterface = {
                googleDynamicCredentialsFlag: true,
                googleMockFlag: GOOGLE_MOCK_FLAG
            };
            GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
                expect( aGoogleFlag ).toBe( true );
                expect( GoogleModule.setConfig( googleConfigData )).toBe( 0 );
                const configData = GoogleModule.getConfig();
                expect( configData ).toEqual( googleConfigData );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

});
