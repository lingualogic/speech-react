/**
 * Automatisch erzeugte globale index.ts Datei fuer Speech-React
 */


// const

export { SPEECH_ACTION_SERVICE, SPEECH_AMAZON_SERVICE, SPEECH_BOT_SERVICE, SPEECH_DIALOG_SERVICE, SPEECH_GOOGLE_SERVICE, SPEECH_INTENT_SERVICE, SPEECH_LISTEN_SERVICE, SPEECH_SPEAK_SERVICE } from './const/speech-service-const';
export { SPEECHSERVICE_API_VERSION } from './const/speech-service-version';


// common

export { EventEmitter } from './common/event_emitter';


// amazon-modul

export * from './amazon/amazon-module-config.interface';
export * from './amazon/amazon-module-option.interface';
export * from './amazon/amazon-module';
export * from './amazon/amazon-service';


// google-modul

export * from './google/google-module-config.interface';
export * from './google/google-module-option.interface';
export * from './google/google-module';
export * from './google/google-service';


// microsoft-modul

export * from './microsoft/microsoft-module-config.interface';
export * from './microsoft/microsoft-module-option.interface';
export * from './microsoft/microsoft-module';
export * from './microsoft/microsoft-service';


// rasa-modul

export * from './rasa/rasa-module-config.interface';
export * from './rasa/rasa-module-option.interface';
export * from './rasa/rasa-module';
export * from './rasa/rasa-service';


// base-service

export * from './base/base-service-option.interface';
export * from './base/base-service';


// speak-service

export { SPEAK_HTML5_TTS, SPEAK_AMAZON_TTS, SPEAK_MICROSOFT_TTS, SPEAK_DE_LANGUAGE, SPEAK_EN_LANGUAGE } from './speak/speak-service-const';
export * from './speak/speak-service-option.interface';
export * from './speak/speak-service';


// listen-service

export { LISTEN_HTML5_ASR, LISTEN_MICROSOFT_ASR, LISTEN_DE_LANGUAGE, LISTEN_EN_LANGUAGE } from './listen/listen-service-const';
export * from './listen/listen-service-option.interface';
export * from './listen/listen-service';


// intent-service

export { INTENT_GOOGLE_NLU, INTENT_MICROSOFT_NLU, INTENT_RASA_NLU, INTENT_DE_LANGUAGE, INTENT_EN_LANGUAGE } from './intent/intent-service-const';
export * from './intent/intent-service-data.interface';
export * from './intent/intent-service-option.interface';
export * from './intent/intent-service';


// action-service

export * from './action/action-service-data.interface';
export * from './action/action-service-option.interface';
export * from './action/action-service';


// dialog-service

export * from './dialog/dialog-service-action.interface';
export * from './dialog/dialog-service-speak.interface';
export * from './dialog/dialog-service-option.interface';
export * from './dialog/dialog-service';


// bot-service

export * from './bot/bot-service-action.interface';
export * from './bot/bot-service-option.interface';
export * from './bot/bot-service';


// service

export * from './service/service-manager';


