/**
 * Automatisierung des Buildprozesses fuer Speech-React NPM-Package
 * wird im dist/ Ordner erzeugt
 */

'use strict';


// Module definieren

const shell = require('gulp-shell');
const del = require('del');
const replace = require('gulp-replace');
const runSequence = require('gulp4-run-sequence');


module.exports = ({ gulp, docsDir, bundleDir, srcSpeechDir, buildDir, buildSpeechDir, distDir }) => {


    // Hilfe-Funktionen

    gulp.task('dist-help', () => {
        console.log('Build-Kommandos');
        console.log('   dist-build  - Distribution erzeugen');
        console.log();
    });


    // Kopier-Funktionen fuer src nach dist


    /**
     * Kopiert die Indexdatei aus build/ nach dist/
     */

    gulp.task('dist-copy-index', function() {
        return gulp.src([
            `${buildSpeechDir}/index.js`,
            `${buildSpeechDir}/index.d.ts`,
            `${buildDir}/speech-react.js`,
            // `${srcSpeechDir}/speech-service-version.json`
        ])
            .pipe( gulp.dest( distDir ));
    });


    /**
     * Austausch aller Verweise auf speech.bundle
     */

    gulp.task('dist-replace-index', function() {
        return gulp.src( `${distDir}/index.js` )
            .pipe( replace( '"./const/speech-service-const"', '"./speech-react"'))
            .pipe( replace( '"./const/speech-service-version"', '"./speech-react"'))
            .pipe( replace( '"./common/event_emitter"', '"./speech-react"'))
            .pipe( replace( '"./nuance/nuance-module"', '"./speech-react"'))
            .pipe( replace( '"./nuance/nuance-service"', '"./speech-react"'))
            .pipe( replace( '"./amazon/amazon-module"', '"./speech-react"'))
            .pipe( replace( '"./amazon/amazon-service"', '"./speech-react"'))
            .pipe( replace( '"./google/google-module"', '"./speech-react"'))
            .pipe( replace( '"./google/google-service"', '"./speech-react"'))
            .pipe( replace( '"./microsoft/microsoft-module"', '"./speech-react"'))
            .pipe( replace( '"./microsoft/microsoft-service"', '"./speech-react"'))
            .pipe( replace( '"./rasa/rasa-module"', '"./speech-react"'))
            .pipe( replace( '"./rasa/rasa-service"', '"./speech-react"'))
            .pipe( replace( '"./base/base-service"', '"./speech-react"'))
            .pipe( replace( '"./speak/speak-service-const"', '"./speech-react"'))
            .pipe( replace( '"./speak/speak-service"', '"./speech-react"'))
            .pipe( replace( '"./listen/listen-service-const"', '"./speech-react"'))
            .pipe( replace( '"./listen/listen-service"', '"./speech-react"'))
            .pipe( replace( '"./intent/intent-service-const"', '"./speech-react"'))
            .pipe( replace( '"./intent/intent-service"', '"./speech-react"'))
            .pipe( replace( '"./action/action-service"', '"./speech-react"'))
            .pipe( replace( '"./dialog/dialog-service"', '"./speech-react"'))
            .pipe( replace( '"./bot/bot-service"', '"./speech-react"'))
            .pipe( replace( '"./service/service-manager"', '"./speech-react"'))
            .pipe( gulp.dest( distDir ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src/common nach dist/src/common
     */

    gulp.task('dist-copy-common', function() {
        return gulp.src([
            `${buildSpeechDir}/common/event_emitter.d.ts`
        ])
            .pipe( gulp.dest(`${distDir}/common`));
    });


    /**
     * Kopiert die Sourcedateien aus build/src/const nach dist/src/const
     */

    gulp.task('dist-copy-const', function() {
        return gulp.src([
            `${buildSpeechDir}/const/speech-service-const.d.ts`,
            `${buildSpeechDir}/const/speech-service-version.d.ts`,
        ])
            .pipe( gulp.dest(`${distDir}/const`));
    });


    /**
     * Kopiert die Sourcedateien aus build/src/service nach dist/src/service
     */

    gulp.task('dist-copy-service', function() {
        return gulp.src([
            `${buildSpeechDir}/service/service-manager.d.ts`
        ])
            .pipe( gulp.dest(`${distDir}/service`));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von AmazonModule
     */

    gulp.task('dist-copy-amazon-module', function() {
        return gulp.src([
            `${buildSpeechDir}/amazon/amazon-module-config.interface.d.ts`,
            `${buildSpeechDir}/amazon/amazon-module-option.interface.d.ts`,
            `${buildSpeechDir}/amazon/amazon-module.d.ts`,
            `${buildSpeechDir}/amazon/amazon-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/amazon` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von GoogleModule
     */

    gulp.task('dist-copy-google-module', function() {
        return gulp.src([
            `${buildSpeechDir}/google/google-module-config.interface.d.ts`,
            `${buildSpeechDir}/google/google-module-option.interface.d.ts`,
            `${buildSpeechDir}/google/google-module.d.ts`,
            `${buildSpeechDir}/google/google-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/google` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von MicrosoftModule
     */

    gulp.task('dist-copy-microsoft-module', function() {
        return gulp.src([
            `${buildSpeechDir}/microsoft/microsoft-module-config.interface.d.ts`,
            `${buildSpeechDir}/microsoft/microsoft-module-option.interface.d.ts`,
            `${buildSpeechDir}/microsoft/microsoft-module.d.ts`,
            `${buildSpeechDir}/microsoft/microsoft-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/microsoft` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von RasaModule
     */

    gulp.task('dist-copy-rasa-module', function() {
        return gulp.src([
            `${buildSpeechDir}/rasa/rasa-module-config.interface.d.ts`,
            `${buildSpeechDir}/rasa/rasa-module-option.interface.d.ts`,
            `${buildSpeechDir}/rasa/rasa-module.d.ts`,
            `${buildSpeechDir}/rasa/rasa-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/rasa` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von BaseService
     */

    gulp.task('dist-copy-base-service', function() {
        return gulp.src([
            `${buildSpeechDir}/base/base-service-const.d.ts`,
            `${buildSpeechDir}/base/base-service-option.interface.d.ts`,
            `${buildSpeechDir}/base/base-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/base` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von SpeakService
     */

    gulp.task('dist-copy-speak-service', function() {
        return gulp.src([
            `${buildSpeechDir}/speak/speak-service-const.d.ts`,
            `${buildSpeechDir}/speak/speak-service-option.interface.d.ts`,
            `${buildSpeechDir}/speak/speak-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/speak` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von ListenService
     */

    gulp.task('dist-copy-listen-service', function() {
        return gulp.src([
            `${buildSpeechDir}/listen/listen-service-const.d.ts`,
            `${buildSpeechDir}/listen/listen-service-option.interface.d.ts`,
            `${buildSpeechDir}/listen/listen-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/listen` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von IntentService
     */

    gulp.task('dist-copy-intent-service', function() {
        return gulp.src([
            `${buildSpeechDir}/intent/intent-service-const.d.ts`,
            `${buildSpeechDir}/intent/intent-service-data.interface.d.ts`,
            `${buildSpeechDir}/intent/intent-service-option.interface.d.ts`,
            `${buildSpeechDir}/intent/intent-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/intent` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von ActionService
     */

    gulp.task('dist-copy-action-service', function() {
        return gulp.src([
            `${buildSpeechDir}/action/action-service-const.d.ts`,
            `${buildSpeechDir}/action/action-service-data.interface.d.ts`,
            `${buildSpeechDir}/action/action-service-option.interface.d.ts`,
            `${buildSpeechDir}/action/action-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/action` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von DialogService
     */

    gulp.task('dist-copy-dialog-service', function() {
        return gulp.src([
            `${buildSpeechDir}/dialog/dialog-service-const.d.ts`,
            `${buildSpeechDir}/dialog/dialog-service-action.interface.d.ts`,
            `${buildSpeechDir}/dialog/dialog-service-option.interface.d.ts`,
            `${buildSpeechDir}/dialog/dialog-service-speak.interface.d.ts`,
            `${buildSpeechDir}/dialog/dialog-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/dialog` ));
    });


    /**
     * Kopiert die Sourcedateien aus build/src nach dist/src/ von BotService
     */

    gulp.task('dist-copy-bot-service', function() {
        return gulp.src([
            `${buildSpeechDir}/bot/bot-service-const.d.ts`,
            `${buildSpeechDir}/bot/bot-service-action.interface.d.ts`,
            `${buildSpeechDir}/bot/bot-service-option.interface.d.ts`,
            `${buildSpeechDir}/bot/bot-service.d.ts`,
        ])
        .pipe( gulp.dest( `${distDir}/bot` ));
    });


    /**
     * Kopiert die Bundledateien aus bundle/ nach dist/
     */

    gulp.task('dist-copy-bundle', function() {
        return gulp.src([
            // `${bundleDir}/index.js`,
            `${bundleDir}/package.json`,
        ])
            .pipe( gulp.dest( distDir ));
    });


    /**
     * Kopiert die Originaldateien aus / nach dist/
     */

    gulp.task('dist-copy-original', function() {
        return gulp.src([
            'LICENSE',
            'CHANGELOG.md',
            'README.md'
        ])
        .pipe( gulp.dest( distDir ));
    });


    /**
     * Kopiert alle benoetigten Dateien aus docs/ nach dist/
     */

    gulp.task('dist-copy-src', (callback) => {
        runSequence(
            'dist-copy-index',
            'dist-replace-index',
            'dist-copy-common',
            'dist-copy-const',
            'dist-copy-service',
            'dist-copy-amazon-module',
            'dist-copy-google-module',
            'dist-copy-microsoft-module',
            'dist-copy-rasa-module',
            'dist-copy-base-service',
            'dist-copy-speak-service',
            'dist-copy-listen-service',
            'dist-copy-intent-service',
            'dist-copy-action-service',
            'dist-copy-dialog-service',
            'dist-copy-bot-service',
            'dist-copy-bundle',
            'dist-copy-original',
            callback
        );
    });


    // kopiert docs nach dist


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-readme', function() {
        return gulp.src([
            `${docsDir}/*.md`,
            `${docsDir}/*.gif`
        ])
        .pipe( gulp.dest( `${distDir}/${docsDir}` ));
    });


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-blog', function() {
        return gulp.src([
            `${docsDir}/blog/*.md`,
            `${docsDir}/blog/*.gif`
        ])
            .pipe( gulp.dest( `${distDir}/${docsDir}/blog` ));
    });


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-design', function() {
        return gulp.src([
            `${docsDir}/design/*.md`,
            `${docsDir}/design/*.gif`
        ])
            .pipe( gulp.dest( `${distDir}/${docsDir}/design` ));
    });


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-platform', function() {
        return gulp.src([
            `${docsDir}/platform/*.md`,
            `${docsDir}/platform/*.gif`
        ])
            .pipe( gulp.dest( `${distDir}/${docsDir}/platform` ));
    });


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-roadmap', function() {
        return gulp.src([
            `${docsDir}/roadmap/*.md`,
            `${docsDir}/roadmap/*.gif`
        ])
            .pipe( gulp.dest( `${distDir}/${docsDir}/roadmap` ));
    });


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-service', function() {
        return gulp.src([
            `${docsDir}/service/**/*.md`,
            `${docsDir}/service/**/*.gif`
        ])
            .pipe( gulp.dest( `${distDir}/${docsDir}/service` ));
    });


    /**
     * Kopiert die Docsdateien aus docs/ nach dist/docs
     */

    gulp.task('dist-copy-docs-tutorial', function() {
        return gulp.src([
            `${docsDir}/tutorial/*.md`,
            `${docsDir}/tutorial/*.gif`
        ])
            .pipe( gulp.dest( `${distDir}/${docsDir}/tutorial` ));
    });


    /**
     * Kopiert alle benoetigten Dateien aus docs/ nach dist/
     */

    gulp.task('dist-copy-docs', (callback) => {
        runSequence(
            'dist-copy-docs-readme',
            'dist-copy-docs-blog',
            'dist-copy-docs-design',
            'dist-copy-docs-platform',
            'dist-copy-docs-roadmap',
            'dist-copy-docs-service',
            'dist-copy-docs-tutorial',
            callback
        );
    });


    /**
     * Kopiert Seech-Framework
     */

    gulp.task('dist-copy-speech-framework', function() {
        return gulp.src([
            `speech-framework-*.tgz`
        ])
        .pipe( gulp.dest( distDir ));
    });


    /**
     * Loeschen der temporaeren Build-Verzeichnisse
     */

    gulp.task('dist-clean', function () {
        return del([
            `${buildSpeechDir}/**/*`,
            `${distDir}/**/*`,
            distDir,
            buildSpeechDir
        ]);
    });


    /**
     * Erzeugen von src-Ordner im Dist-Verzeichnis
     */

    gulp.task('dist-dir', shell.task('mkdir dist'));


    /**
     * Typescript transpilieren in build-Ordner
     */

    gulp.task('dist-transpile', shell.task('cd src/speech && tsc'));


    /**
     * Erzeugt die auszuliefernde Client-Bibliothek mit rollup
     */

    gulp.task('dist-rollup', shell.task('rollup -c ./rollup.config.js'));


    /**
     * Verpackt die auszuliefernde Client-Bibliothek
     */

    gulp.task('dist-pack', shell.task('cd dist && npm pack'));


    /**
     * Verpackt die auszuliefernde Client-Bibliothek
     */

    gulp.task('dist-publish', shell.task('cd dist && npm publish'));

    
    /**
     * Erzeugt die lauffaehige Speech-Bibliothek speech.js aus dem API-Quellcode
     */

    gulp.task('dist-build', function(callback) {
        runSequence(
            'dist-clean',
            'dist-dir',
            'dist-transpile',
            'dist-rollup',
            'dist-copy-src',
            // 'dist-copy-docs',
            // 'dist-copy-speech-framework',
            callback
        );
    });

};
