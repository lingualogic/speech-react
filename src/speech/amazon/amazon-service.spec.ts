/**
 * Unit-Test von AmazonService
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

import { AmazonModuleOptionInterface } from './amazon-module-option.interface';
import { AmazonModule } from './amazon-module';
import { AmazonService } from './amazon-service';


// Konstanten


// AmazonMock ein/ausschalten, um Tests auch mit AmazonPort durchfuehren zu koennen.
// ist AmazonMock false, muss das Netzwerk eingeschaltet sein, damit AmazonPort richtig funktioniert

const AMAZON_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('AmazonService', () => {

    let amazonService: AmazonService = null;

    beforeAll(() => {
        console.log('AmazonService Unit-Tests gestartet...');
    });

    beforeEach((done) => {
        const amazonOption: AmazonModuleOptionInterface = {
            amazonDynamicCredentialsFlag: true,
            amazonMockFlag: AMAZON_MOCK_FLAG
        };
        AmazonModule.init( amazonOption, (aAmazonFlag: boolean) => {
            expect( aAmazonFlag ).toBe( true );
            amazonService = new AmazonService();
            done();
        }, ERROR_OUTPUT_FLAG );

    });

    afterEach(() => {
        AmazonModule.done();
    });

    // setCredentials

    describe('Funktion setCredentials', () => {

        it('sollte Credentials eintragen', () => {
            expect( amazonService.setCredentials( 'TestRegion', 'TestIdentityPoolId' )).toBe( 0 );
            const credentials = AmazonModule.getConfig();
            expect( credentials.amazonRegion ).toBe( 'TestRegion' );
            expect( credentials.amazonIdentityPoolId ).toBe( 'TestIdentityPoolId' );
        });

    });

});
