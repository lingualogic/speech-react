/**
 * Unit-Test von MicrosoftModule
 *
 * Letzter Aenderung: 20.06.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/microsoft
 * @author SB
 */


// microsoft

import { MicrosoftModuleConfigInterface } from './microsoft-module-config.interface';
import { MicrosoftModuleOptionInterface } from './microsoft-module-option.interface';
import { MicrosoftModule } from './microsoft-module';


// Konstanten


// MicrosoftMock ein/ausschalten, um Tests auch mit MicrosoftPort durchfuehren zu koennen.
// ist MicrosoftMoch false, muss das Netzwerk eingeschaltet sein, damit MicrosoftPort richtig funktioniert

const MICROSOFT_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('MicrosoftModule', () => {

    beforeAll(() => {
        console.log('MicrosoftModule Unit-Tests gestartet...');
    });

    afterEach(() => {
        MicrosoftModule.done();
    });

    // init

    describe('Funktion init', () => {

        it('sollte MicrosoftFlag true zurueckgeben, wenn microsoftDynamicCredentialsFlag true ist', (done) => {
            const microsoftOption: MicrosoftModuleOptionInterface = {
                microsoftDynamicCredentialsFlag: true,
                microsoftMockFlag: MICROSOFT_MOCK_FLAG
            };
            MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
                expect( aMicrosoftFlag ).toBe( true );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte MicrosoftFlag false zurueckgeben, wenn microsoftParameter empty ist', (done) => {
            const microsoftOption: MicrosoftModuleOptionInterface = {
                microsoftMockFlag: MICROSOFT_MOCK_FLAG
            };
            MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
                expect( aMicrosoftFlag ).toBe( false );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

    // setConfig

    describe('Funktion setConfig', () => {

        it('sollte Credentials nicht eintragen, wenn microsoftDynamicCredentialsFlag false ist', (done) => {
            const microsoftConfigData: MicrosoftModuleConfigInterface = {
                microsoftRegion: 'testRegion',
                microsoftSubscriptionKey: 'testSubscriptionKey'
            };
            const microsoftOption: MicrosoftModuleOptionInterface = {
                microsoftDynamicCredentialsFlag: false,
                microsoftRegion: 'testRegion',
                microsoftSubscriptionKey: 'testSubscriptionKey',
                microsoftMockFlag: MICROSOFT_MOCK_FLAG
            };
            MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
                expect( aMicrosoftFlag ).toBe( true );
                expect( MicrosoftModule.setConfig( microsoftConfigData )).toBe( -1 );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte Credentials eintragen, wenn microsoftDynamicCredentialsFlag true ist', (done) => {
            const microsoftConfigData: MicrosoftModuleConfigInterface = {
                microsoftRegion: 'testRegion',
                microsoftSubscriptionKey: 'testSubscriptionKey'
            };
            const microsoftOption: MicrosoftModuleOptionInterface = {
                microsoftDynamicCredentialsFlag: true,
                microsoftMockFlag: MICROSOFT_MOCK_FLAG
            };
            MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
                expect( aMicrosoftFlag ).toBe( true );
                expect( MicrosoftModule.setConfig( microsoftConfigData )).toBe( 0 );
                const configData = MicrosoftModule.getConfig();
                expect( configData ).toEqual( microsoftConfigData );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

});
