/** @packageDocumentation
 * Unit-Test von AmazonModule
 *
 * Letzter Aenderung: 03.04.2019
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/amazon
 * @author SB
 */


// amazon

import { AmazonModuleConfigInterface } from './amazon-module-config.interface';
import { AmazonModuleOptionInterface } from './amazon-module-option.interface';
import { AmazonModule } from './amazon-module';


// Konstanten


// AmazonMock ein/ausschalten, um Tests auch mit AmazonPort durchfuehren zu koennen.
// ist AmazonMoch false, muss das Netzwerk eingeschaltet sein, damit AmazonPort richtig funktioniert

const AMAZON_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('AmazonModule', () => {

    beforeAll(() => {
        console.log('AmazonModule Unit-Tests gestartet...');
    });

    afterEach(() => {
        AmazonModule.done();
    });

    // init

    describe('Funktion init', () => {

        it('sollte AmazonFlag true zurueckgeben, wenn amazonDynamicCredentialsFlag true ist', (done) => {
            const amazonOption: AmazonModuleOptionInterface = {
                amazonDynamicCredentialsFlag: true,
                amazonMockFlag: AMAZON_MOCK_FLAG
            };
            AmazonModule.init( amazonOption, (aAmazonFlag: boolean) => {
                expect( aAmazonFlag ).toBe( true );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte AmazonFlag false zurueckgeben, wenn amazonParameter empty ist', (done) => {
            const amazonOption: AmazonModuleOptionInterface = {
                amazonMockFlag: AMAZON_MOCK_FLAG
            };
            AmazonModule.init( amazonOption, (aAmazonFlag: boolean) => {
                expect( aAmazonFlag ).toBe( false );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

    // setConfig

    describe('Funktion setConfig', () => {

        it('sollte Credentials nicht eintragen, wenn amazonDynamicCredentialsFlag false ist', (done) => {
            const amazonConfigData: AmazonModuleConfigInterface = {
                amazonRegion: 'testRegion',
                amazonIdentityPoolId: 'testIdentityPollId'
            };
            const amazonOption: AmazonModuleOptionInterface = {
                amazonDynamicCredentialsFlag: false,
                amazonRegion: 'testRegion',
                amazonIdentityPoolId: 'testIdentityPoolId',
                amazonMockFlag: AMAZON_MOCK_FLAG
            };
            AmazonModule.init( amazonOption, (aAmazonFlag: boolean) => {
                expect( aAmazonFlag ).toBe( true );
                expect( AmazonModule.setConfig( amazonConfigData )).toBe( -1 );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

        it('sollte Credentials eintragen, wenn amazonDynamicCredentialsFlag true ist', (done) => {
            const amazonConfigData: AmazonModuleConfigInterface = {
                amazonRegion: 'testRegion',
                amazonIdentityPoolId: 'testIdentityPoolId'
            };
            const amazonOption: AmazonModuleOptionInterface = {
                amazonDynamicCredentialsFlag: true,
                amazonMockFlag: AMAZON_MOCK_FLAG
            };
            AmazonModule.init( amazonOption, (aAmazonFlag: boolean) => {
                expect( aAmazonFlag ).toBe( true );
                expect( AmazonModule.setConfig( amazonConfigData )).toBe( 0 );
                const configData = AmazonModule.getConfig();
                expect( configData ).toEqual( amazonConfigData );
                done();
            }, ERROR_OUTPUT_FLAG );
        });

    });

});
