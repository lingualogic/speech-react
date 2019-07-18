/**
 * Unit-Test von RasaService
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

import { RasaModuleOptionInterface } from './rasa-module-option.interface';
import { RasaModule } from './rasa-module';
import { RasaService } from './rasa-service';


// Konstanten


// RasaMock ein/ausschalten, um Tests auch mit RasaPort durchfuehren zu koennen.
// ist RasaMock false, muss das Netzwerk eingeschaltet sein, damit RasaPort richtig funktioniert

const RASA_MOCK_FLAG = true;

// ErrorOutput ein/ausschalten fuer erweiterte Fehlerausgabe

const ERROR_OUTPUT_FLAG = false;


// Tests

describe('RasaService', () => {

    let rasaService: RasaService = null;

    beforeAll(() => {
        console.log('RasaService Unit-Tests gestartet...');
    });

    beforeEach((done) => {
        const rasaOption: RasaModuleOptionInterface = {
            rasaDynamicCredentialsFlag: true,
            rasaMockFlag: RASA_MOCK_FLAG
        };
        RasaModule.init( rasaOption, (aRasaFlag: boolean) => {
            expect( aRasaFlag ).toBe( true );
            rasaService = new RasaService();
            done();
        }, ERROR_OUTPUT_FLAG );

    });

    afterEach(() => {
        RasaModule.done();
    });

    // setCredentials

    describe('Funktion setCredentials', () => {

        it('sollte Credentials eintragen', () => {
            expect( rasaService.setCredentials( 'TestAppKey' )).toBe( 0 );
            const credentials = RasaModule.getConfig();
            expect( credentials.rasaAppKey ).toBe( 'TestAppKey' );
        });

    });

});
