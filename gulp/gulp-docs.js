/**
 * Erzeugung der Docs von Speech-React
 */

'use strict';


// Module definieren

const typedoc = require('gulp-typedoc');
const runSequence = require('gulp4-run-sequence');


module.exports = ({ gulp, srcDir, docsDir, distDir }) => {

    /**
     * Hilfe-Anzeige
     */

    gulp.task('docs-help', () => {
        console.log('Gulp-Hilfe');
        console.log();

        console.log('Doc-Kommandos:');
        console.log('   docs-build  - Dokumentation erzeugen');
        console.log();
    });


    // Dokumentations-Funktionen


    /**
     * Erzeugt eine TypeDoc Nutzer Ausgabe fuer SpeechFramework (stable)
     */

    gulp.task('docs-dist-typedoc', (cb) => {
        return gulp
            .src([
                `${srcDir}/speech/action/*.ts`,
                `${srcDir}/speech/amazon/*.ts`,
                `${srcDir}/speech/base/*.ts`,
                `${srcDir}/speech/bot/*.ts`,
                `${srcDir}/speech/const/*.ts`,
                `${srcDir}/speech/dialog/*.ts`,
                `${srcDir}/speech/google/*.ts`,
                `${srcDir}/speech/intent/*.ts`,
                `${srcDir}/speech/listen/*.ts`,
                `${srcDir}/speech/speak/*.ts`
            ])
            .pipe(typedoc({
                // TypeScript options (see typescript docs)
                module: 'commonjs',
                target: 'es6',
                experimentalDecorators: true,
                includeDeclarations: false,
                // Output options (see typedoc docs)
                out: `${distDir}/${docsDir}/api`,
                // json: './typedoc.json',
                // TypeDoc options (see typedoc docs)
                name: 'Speech-Angular',
                mode: 'modules',
                types: [],
                exclude: [
                    '**/index*.ts',
                    '**/*mock.ts',
                    '**/*.spec.ts'
                ],
                externalPattern: './node_modules/**',
                excludeExternals: true,
                ignoreCompilerErrors: true,
                plugins: ['typedoc-plugin-external-module-name'],
                version: true,
                verbose: true,
                hideGenerator: true,
                logger: typedoc.Logger
            }), cb);
    });


    /**
     * Erzeugt eine TypeDoc Entwickler Ausgabe fuer alle SpeechFramework Klassen
     */

    gulp.task('docs-typedoc', (cb) => {
        return gulp
            .src([`${srcDir}/**/*.ts`])
            .pipe(typedoc({
                // TypeScript options (see typescript docs)
                module: 'commonjs',
                target: 'es6',
                experimentalDecorators: true,
                includeDeclarations: false,
                // Output options (see typedoc docs)
                out: `${docsDir}/api/`,
                // json: './typedoc.json',
                // TypeDoc options (see typedoc docs)
                name: 'Speech-Angular',
                mode: 'modules',
                types: [],
                exclude: [
                    '**/index*.ts',
                    '**/*.spec.ts',
                    '**/*mock.ts'
                ],
                externalPattern: './node_modules/**',
                excludeExternals: true,
                ignoreCompilerErrors: true,
                plugins: ['typedoc-plugin-external-module-name'],
                version: true,
                verbose: true,
                hideGenerator: true,
                logger: typedoc.Logger
            }), cb);
    });


    /**
     * Erzeugt die Ausgaben aller vorhandenen Doc-Generatoren
     */

    gulp.task('docs-build', (callback) => {
        runSequence(
            'docs-typedoc',
            callback
        );
    });

};
