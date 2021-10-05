/** @packageDocumentation
 * Unit-Test von MicrosoftService
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

import { MicrosoftModuleOptionInterface } from './microsoft-module-option.interface';
import { MicrosoftModule } from './microsoft-module';
import { MicrosoftService } from './microsoft-service';


// Konstanten


// MicrosoftMock ein/ausschalten, um Tests auch mit MicrosoftPort durchfuehren zu koennen.
// ist MicrosoftMock false, muss das Netzwerk eingeschaltet sein, damit MicrosoftPort richtig funktioniert

const AMAZON_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('MicrosoftService', () => {

    let microsoftService: MicrosoftService = null;

    beforeAll(() => {
        console.log('MicrosoftService Unit-Tests gestartet...');
    });

    beforeEach((done) => {
        const microsoftOption: MicrosoftModuleOptionInterface = {
            microsoftDynamicCredentialsFlag: true,
            microsoftMockFlag: AMAZON_MOCK_FLAG
        };
        MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
            expect( aMicrosoftFlag ).toBe( true );
            microsoftService = new MicrosoftService();
            done();
        }, ERROR_OUTPUT_FLAG );

    });

    afterEach(() => {
        MicrosoftModule.done();
    });

    // setCredentials

    describe('Funktion setCredentials', () => {

        it('sollte Credentials eintragen', () => {
            expect( microsoftService.setCredentials( 'TestRegion', 'TestSubscriptionKey', 'TestLuisEndpoint' )).toBe( 0 );
            const credentials = MicrosoftModule.getConfig();
            expect( credentials.microsoftRegion ).toBe( 'TestRegion' );
            expect( credentials.microsoftSubscriptionKey ).toBe( 'TestSubscriptionKey' );
            expect( credentials.microsoftLuisEndpoint ).toBe( 'TestLuisEndpoint' );
        });

    });

});
