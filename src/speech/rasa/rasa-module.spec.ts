/** @packageDocumentation
 * Unit-Test von RasaModule
 *
 * Letzter Aenderung: 11.07.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/rasa
 * @author SB
 */


// rasa

import { RasaModuleConfigInterface } from './rasa-module-config.interface';
import { RasaModuleOptionInterface } from './rasa-module-option.interface';
import { RasaModule } from './rasa-module';


// Konstanten


// RasaMock ein/ausschalten, um Tests auch mit RasaPort durchfuehren zu koennen.
// ist RasaMock false, muss das Netzwerk eingeschaltet sein und ein Rasa-Server laufen, damit RasaPort richtig funktioniert

const RASA_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('RasaModule', () => {

    beforeAll(() => {
        console.log('RasaModule Unit-Tests gestartet...');
    });

    afterEach(() => {
        RasaModule.done();
    });

    // init

    describe('Funktion init', () => {

        it('sollte RasaFlag true zurueckgeben, wenn rasaDynamicCredentialsFlag true ist', (done) => {
            const rasaOption: RasaModuleOptionInterface = {
                rasaDynamicCredentialsFlag: true,
                rasaMockFlag: RASA_MOCK_FLAG
            };
            RasaModule.init( rasaOption, (aRasaFlag: boolean) => {
                expect( aRasaFlag ).toBe( true );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte RasaFlag false zurueckgeben, wenn rasaParameter empty ist', (done) => {
            const rasaOption: RasaModuleOptionInterface = {
                rasaMockFlag: RASA_MOCK_FLAG
            };
            RasaModule.init( rasaOption, (aRasaFlag: boolean) => {
                expect( aRasaFlag ).toBe( false );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

    // setConfig

    describe('Funktion setConfig', () => {

        it('sollte Credentials nicht eintragen, wenn rasaDynamicCredentialsFlag false ist', (done) => {
            const rasaConfigData: RasaModuleConfigInterface = {
                rasaAppKey: 'testAppKeyn'
            };
            const rasaOption: RasaModuleOptionInterface = {
                rasaDynamicCredentialsFlag: false,
                rasaAppKey: 'testAppKey',
                rasaMockFlag: RASA_MOCK_FLAG
            };
            RasaModule.init( rasaOption, (aRasaFlag: boolean) => {
                expect( aRasaFlag ).toBe( true );
                expect( RasaModule.setConfig( rasaConfigData )).toBe( -1 );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte Credentials eintragen, wenn rasaDynamicCredentialsFlag true ist', (done) => {
            const rasaConfigData: RasaModuleConfigInterface = {
                rasaAppKey: 'testAppKey'
            };
            const rasaOption: RasaModuleOptionInterface = {
                rasaDynamicCredentialsFlag: true,
                rasaMockFlag: RASA_MOCK_FLAG
            };
            RasaModule.init( rasaOption, (aRasaFlag: boolean) => {
                expect( aRasaFlag ).toBe( true );
                expect( RasaModule.setConfig( rasaConfigData )).toBe( 0 );
                const configData = RasaModule.getConfig();
                expect( configData ).toEqual( rasaConfigData );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

});
