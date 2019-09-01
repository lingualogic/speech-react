/**
 * Automatisierung des Installprozesses fuer Speech-React
 * Hier werden folgende Dinge nach der Installation der NPM-Packete durchgefuehrt:
 * 
 *      - amazon.credentials.ts wird als leere Datei in credentials erzeugt
 *      - google.credentials.ts wird als leere Datei in credentials erzeugt
 */

'use strict';


// Module definieren

const fs = require('fs');
const file = require('gulp-file');
const shell = require('gulp-shell');
const inject = require('gulp-inject-string');
const runSequence = require('run-sequence');


module.exports = ({ gulp, credentialsDir }) => {

    // Hilfe-Funktionen

    gulp.task('install-help', () => {
        console.log('Install-Kommandos');
        console.log('   install                     - Erzeugt alle Dateien');
        console.log();
    });


    // Erzeuge-Funktionen


    /**
     * Erzeugt amazon.credentials.ts in credentials/
     */

    gulp.task('install-amazon-credentials', function() {
        try {
            // pruefen auf vorhandene Amazon-Credentials Datei
            fs.accessSync( `${credentialsDir}/amazon-credentials.ts` );
        } catch (e) {
            // Datei ist nicht vorhanden und kann erzeugt werden
            return gulp.src([ `${credentialsDir}/amazon-credentials.ts` ])
                .pipe( file( 'amazon-credentials.ts', ''))
                .pipe(inject.append( "/**\n" ))
                .pipe(inject.append( " * Amazon Credentials\n" ))
                .pipe(inject.append( " */\n" ))
                .pipe(inject.append( "\n" ))
                .pipe(inject.append( "\n" ))
                .pipe(inject.append( "export const REGION = '';\n" ))
                .pipe(inject.append( "export const IDENTITY_POOL_ID = '';\n" ))
                .pipe( gulp.dest(  credentialsDir ));
        }
        return gulp.src( '' ); // empty stream
    });


    /**
     * Erzeugt google-credentials.ts in credentials/
     */

    gulp.task('install-google-credentials', function() {
        try {
            // pruefen auf vorhandene Google-Credentials Datei
            fs.accessSync( `${credentialsDir}/google-credentials.ts` );
        } catch (e) {
            // Datei ist nicht vorhanden und kann erzeugt werden
            return gulp.src([ `${credentialsDir}/google-credentials.ts` ])
                .pipe( file( 'google-credentials.ts', ''))
                .pipe(inject.append( "/**\n" ))
                .pipe(inject.append( " * Google Credentials\n" ))
                .pipe(inject.append( " */\n" ))
                .pipe(inject.append( "\n" ))
                .pipe(inject.append( "\n" ))
                .pipe(inject.append( "export const GOOGLE_APP_KEY = '';\n" ))
                .pipe( gulp.dest(  credentialsDir ));
        }
        return gulp.src( '' ); // empty stream
    });


    /**
     * Erzeugt microsoft-credentials.ts in credentials/
     */

    gulp.task('install-microsoft-credentials', function() {
        try {
            // pruefen auf vorhandene Microsoft-Credentials Datei
            fs.accessSync( `${credentialsDir}/microsoft-credentials.ts` );
        } catch (e) {
            // Datei ist nicht vorhanden und kann erzeugt werden
            return gulp.src([ `${credentialsDir}/microsoft-credentials.ts` ])
                .pipe( file( 'microsoft-credentials.ts', ''))
                .pipe(inject.append( "/**\n" ))
                .pipe(inject.append( " * Microsoft Credentials\n" ))
                .pipe(inject.append( " */\n" ))
                .pipe(inject.append( "\n" ))
                .pipe(inject.append( "\n" ))
                .pipe(inject.append( "export const MICROSOFT_REGION = '';\n" ))
                .pipe(inject.append( "export const MICROSOFT_SUBSCRIPTION_KEY = '';\n" ))
                .pipe(inject.append( "export const MICROSOFT_LUIS_ENDPOINT = '';\n" ))
                .pipe( gulp.dest(  credentialsDir ));
        }
        return gulp.src( '' ); // empty stream
    });


    /**
     * Erzeugt rasa-credentials.ts in credentials/
     */

    gulp.task('install-rasa-credentials', function() {
        try {
            // pruefen auf vorhandene Rasa-Credentials Datei
            fs.accessSync( `${credentialsDir}/rasa-credentials.ts` );
        } catch (e) {
            // Datei ist nicht vorhanden und kann erzeugt werden
            return gulp.src([ `${credentialsDir}/rasa-credentials.ts` ])
                .pipe( file( 'rasa-credentials.ts', ''))
                .pipe( inject.append( "/**\n" ))
                .pipe( inject.append( " * Rasa Credentials\n" ))
                .pipe( inject.append( " */\n" ))
                .pipe( inject.append( "\n" ))
                .pipe( inject.append( "\n" ))
                .pipe( inject.append( "export const RASA_SERVER_URL = '';\n" ))
                .pipe( inject.append( "export const RASA_APP_KEY = '';\n" ))
                .pipe( gulp.dest(  credentialsDir ));
        }
        return gulp.src( '' ); // empty stream
    });


    /**
     * Installiert die WebDriver-Treiber fuer die  Protractor-Tests
     */

    gulp.task('install-webdriver', shell.task('node node_modules/protractor/bin/webdriver-manager update'));

    
    /**
     * Installiert alle benoetigten Dateien
     */

    gulp.task('install', (callback) => {
        runSequence(
            'install-amazon-credentials',
            'install-google-credentials',
            'install-microsoft-credentials',
            'install-rasa-credentials',
            // 'install-webdriver',
            callback
        );
    });

};
