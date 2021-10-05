/** @packageDocumentation
 * Unit-Test von GoogleService
 *
 * Letzter Aenderung: 20.06.2020
 * Status: gelb
 *
 * getestet unter:  Chrome(Mac)
 *
 * @module speech/google
 * @author SB
 */


// google

import { GoogleModuleOptionInterface } from './google-module-option.interface';
import { GoogleModule } from './google-module';
import { GoogleService } from './google-service';


// Konstanten


// GoogleMock ein/ausschalten, um Tests auch mit GooglePort durchfuehren zu koennen.
// ist GoogleMock false, muss das Netzwerk eingeschaltet sein, damit GooglePort richtig funktioniert

const GOOGLE_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('GoogleService', () => {

    let googleService: GoogleService = null;

    beforeAll(() => {
        console.log('GoogleService Unit-Tests gestartet...');
    });

    beforeEach((done) => {
        const googleOption: GoogleModuleOptionInterface = {
            googleDynamicCredentialsFlag: true,
            googleMockFlag: GOOGLE_MOCK_FLAG
        };
        GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
            expect( aGoogleFlag ).toBe( true );
            googleService = new GoogleService();
            done();
        }, ERROR_OUTPUT_FLAG );

    });

    afterEach(() => {
        GoogleModule.done();
    });

    // setCredentials

    describe('Funktion setCredentials', () => {

        it('sollte Credentials eintragen', () => {
            // tslint:disable-next-line: max-line-length
            expect( googleService.setCredentials( 'TestAppKey', 'TestServerUrl', 'TestTokenServerUrl', 'TestProjectId', 'TestEnvironmentName' )).toBe( 0 );
            const credentials = GoogleModule.getConfig();
            expect( credentials.googleAppKey ).toBe( 'TestAppKey' );
            expect( credentials.googleServerUrl ).toBe( 'TestServerUrl' );
            expect( credentials.dialogflowTokenServerUrl ).toBe( 'TestTokenServerUrl' );
            expect( credentials.dialogflowProjectId ).toBe( 'TestProjectId' );
            expect( credentials.dialogflowEnvironmentName ).toBe( 'TestEnvironmentName' );
            expect( credentials.dialogflowSessionId ).toBe( '' );
        });

    });

});
