/**
 * Automatisierung der Tests fuer Speech-Angular
 */

'use strict';


// Module definieren

const shell = require('gulp-shell');
const runSequence = require('run-sequence');


module.exports = ({ gulp }) => {


    // Hilfe-Funktionen

    gulp.task('test-help', () => {
        console.log('Gulp-Hilfe');
        console.log();

        console.log('Test-Kommandos');
        console.log('   test-unit         - alle Unit-Tests ausfuehren');
        console.log('   test-e2e          - alle E2E-Tests ausfuehren');
        console.log('   test              - alle Unit-Tests und E2E-Tests ausfuehren');
        console.log();

    });


    // Test Funktionen


    /**
     * Start aller Jest Unit-Tests
     */

    gulp.task('test-unit', shell.task('ng test'));


    /**
     * Stable E2E-Tests mit Chrome auf dem Mac starten
     */

    gulp.task('test-e2e', shell.task('ng e2e'));


    /**
     * Alle Tests ablaufen lassen
     */

    gulp.task('test', function(callback) {
        runSequence('test-unit', 'test-e2e', callback);
    });


    /** 
     * Beispiel Unit-Tests ausfuehren
     */

    gulp.task('test-action-unit', shell.task('cd ./examples/my-speech-action && npm install && npm test'));
    gulp.task('test-bot-unit', shell.task('cd ./examples/my-speech-bot && npm install && npm test'));
    gulp.task('test-bot-offline-unit', shell.task('cd ./examples/my-speech-bot-offline && npm install && npm test'));
    gulp.task('test-intent-unit', shell.task('cd ./examples/my-speech-intent && npm install && npm test'));
    gulp.task('test-listen-unit', shell.task('cd ./examples/my-speech-listen && npm install && npm test'));
    gulp.task('test-speak-unit', shell.task('cd ./examples/my-speech-speak && npm install && npm test'));
    gulp.task('test-speak-offline-unit', shell.task('cd ./examples/my-speech-speak-offline && npm install && npm test'));


    /**
     * Alle Beispiel Unit-Tests ablaufen lassen
     */

    gulp.task('test-examples-unit', function(callback) {
        runSequence(
            'test-action-unit', 
            'test-bot-unit', 
            'test-bot-offline-unit', 
            'test-intent-unit', 
            'test-listen-unit', 
            'test-speak-unit', 
            'test-speak-offline-unit', 
            callback
        );
    });


    /** 
     * Beispiel e2e-Tests ausfuehren
     */

    gulp.task('test-action-e2e', shell.task('cd ./examples/my-speech-action && npm run e2e'));
    gulp.task('test-bot-e2e', shell.task('cd ./examples/my-speech-bot && npm run e2e'));
    gulp.task('test-bot-offline-e2e', shell.task('cd ./examples/my-speech-bot-offline && npm run e2e'));
    gulp.task('test-intent-e2e', shell.task('cd ./examples/my-speech-intent && npm run e2e'));
    gulp.task('test-listen-e2e', shell.task('cd ./examples/my-speech-listen && npm run e2e'));
    gulp.task('test-speak-e2e', shell.task('cd ./examples/my-speech-speak && npm run e2e'));
    gulp.task('test-speak-offline-e2e', shell.task('cd ./examples/my-speech-speak-offline && npm run e2e'));


    /**
     * Alle Beispiel e2e-Tests ablaufen lassen
     */

    gulp.task('test-examples-e2e', function(callback) {
        runSequence(
            'test-action-e2e', 
            'test-bot-e2e', 
            'test-bot-offline-e2e', 
            'test-intent-e2e', 
            'test-listen-e2e', 
            'test-speak-e2e', 
            'test-speak-offline-e2e', 
            callback
        );
    });


    /** 
     * Beispiel lint-Tests ausfuehren
     */

    gulp.task('test-action-lint', shell.task('cd ./examples/my-speech-action && npm run lint'));
    gulp.task('test-bot-lint', shell.task('cd ./examples/my-speech-bot && npm run lint'));
    gulp.task('test-bot-offline-lint', shell.task('cd ./examples/my-speech-bot-offline && npm run lint'));
    gulp.task('test-intent-lint', shell.task('cd ./examples/my-speech-intent && npm run lint'));
    gulp.task('test-listen-lint', shell.task('cd ./examples/my-speech-listen && npm run lint'));
    gulp.task('test-speak-lint', shell.task('cd ./examples/my-speech-speak && npm run lint'));
    gulp.task('test-speak-offline-lint', shell.task('cd ./examples/my-speech-speak-offline && npm run lint'));


    /**
     * Alle Beispiel lint-Tests ablaufen lassen
     */

    gulp.task('test-examples-lint', function(callback) {
        runSequence(
            'test-action-lint', 
            'test-bot-lint', 
            'test-bot-offline-lint', 
            'test-intent-lint', 
            'test-listen-lint', 
            'test-speak-lint', 
            'test-speak-offline-lint', 
            callback
        );
    });


};
