/**
 * Automatisch erzeugte globale service-manager.ts Datei fuer Speech-React
 * 
 * Initialisiert und verwaltet alle verfuegbaren Speech-Services.
 *
 * Konfiguration: stable
 * Version: 0.5.12.0003 (Alpha) vom 08.07.2019
 *
 * Speech-Services:
 *
 *              Action      - Aktionsausfuehrung
 *              Speak       - Sprachausgabe
 *              Listen      - Spracheingabe
 *              intent      - Sprachanalyse
 *              Dialog      - Dialogproxy
 *              Bot         - Sprachassistent
 *              Amazon      - Amazon Cloud-Dienst (TTS)
 *              Google      - Google Cloud-Dienst (NLU)
 *              Microsoft   - Microsoft Cloud-Dienst (ASR)
 *
 * @module speech/service
 * @author SB
 */


// speech 

import {
    SPEECH_ACTION_SERVICE,
    SPEECH_AMAZON_SERVICE,
    SPEECH_BOT_SERVICE,
    SPEECH_DIALOG_SERVICE,
    SPEECH_GOOGLE_SERVICE,
    SPEECH_INTENT_SERVICE,
    SPEECH_LISTEN_SERVICE,
    SPEECH_MICROSOFT_SERVICE,
    SPEECH_SPEAK_SERVICE
} from './../const/speech-service-const';

import { ActionService } from './../action/action-service'
import { SpeakService } from './../speak/speak-service'
import { ListenService } from './../listen/listen-service'
import { IntentService } from './../intent/intent-service'
import { DialogService } from './../dialog/dialog-service'
import { BotService } from './../bot/bot-service'
import { AmazonService } from './../amazon/amazon-service'
import { GoogleService } from './../google/google-service'
import { MicrosoftService } from './../microsoft/microsoft-service'


// service 

import { ServiceList } from './service-list';


/**
 * statische ServiceManager Klasse zur Erzeugung aller Services in Speech-React
 *
 * @export
 * @class ServiceManager
 */

export class ServiceManager {


    private static mServiceList = new ServiceList();


    // statische Klasse

    private constructor() {}


    /**
     * ServiceManager initialisieren
     */

    static init( aOption?: any ): number {
        // alle Services erzeugen
        let result = 0;
        if ( ServiceManager._add( SPEECH_ACTION_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_SPEAK_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_LISTEN_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_INTENT_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_DIALOG_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_BOT_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_AMAZON_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_GOOGLE_SERVICE, aOption ) !== 0 ) { result = -1; }
        if ( ServiceManager._add( SPEECH_MICROSOFT_SERVICE, aOption ) !== 0 ) { result = -1; }

        return result;
    }


    /**
     * ServiceManager freigeben
     */

    static done(): number {
        return ServiceManager.mServiceList.clear();
    }



    /**
     * Service intern erzeugen, initialisieren und in Serviceliste eintragen
     * 
     * @param aServiceName - Name des Speech-Service
     * @param aServiceOption - Optionen fuer Speech-Service
     */

    private static _add( aServiceName: string, aServiceOption: any ): number {
        try {
            let result = 0;
            let service = null;
            // Service zum Namen erzeugen
            switch ( aServiceName ) {
                case SPEECH_ACTION_SERVICE:
                    service = new ActionService();
                    break;
                case SPEECH_SPEAK_SERVICE:
                    service = new SpeakService();
                    break;
                case SPEECH_LISTEN_SERVICE:
                    service = new ListenService();
                    break;
                case SPEECH_INTENT_SERVICE:
                    service = new IntentService();
                    break;
                case SPEECH_DIALOG_SERVICE:
                    service = new DialogService();
                    break;
                case SPEECH_BOT_SERVICE:
                    service = new BotService();
                    break;
                case SPEECH_AMAZON_SERVICE:
                    service = new AmazonService();
                    break;
                case SPEECH_GOOGLE_SERVICE:
                    service = new GoogleService();
                    break;
                case SPEECH_MICROSOFT_SERVICE:
                    service = new MicrosoftService();
                    break;

                default:
                    console.log('ServiceManager.add: kein gueltiger Service-Name uebergeben: ', aServiceName );
                    return -1;
            }
            // service in Liste eintragen
            if ( service != null ) {
                result = ServiceManager.mServiceList.insert( aServiceName, service );
            } else {
                console.log('ServiceManager.add: kein Service erzeugt: ', aServiceName );
                result = -1;
            }
            return result;
        } catch ( aException ) {
            console.log( 'ServiceManager.add: Exception ', aException );
            return -1;
        }
    }


    /**
     * Service zurueckgeben 
     *
     * @param aServiceName - Name des zurueckzugebenden Service
     * @return gefundener Service oder undefined
     */

    static get( aServiceName: string ): any {
        return ServiceManager.mServiceList.find( aServiceName );
    }
}
