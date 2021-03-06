// Store modules
const gulp = require( 'gulp' ),
      glob = require( 'glob' ),
      es = require( 'event-stream' ),
      cond = require( 'gulp-cond' ),
      rename = require( 'gulp-rename' ),
      gutil = require( 'gulp-util' ),
      sass = require( 'gulp-sass' ),
      autoprefixer = require( 'gulp-autoprefixer' ),
      postcss = require( 'gulp-postcss' ),
      flexibility = require( 'postcss-flexibility' ),
      uglify = require( 'gulp-uglify' ),
      browserify = require( 'browserify' ),
      babelify = require( 'babelify' ),
      watchify = require( 'watchify' ),
      source = require( 'vinyl-source-stream' ),
      buffer = require( 'vinyl-buffer' ),
      del = require( 'del' ),
      sourcemaps = require( 'gulp-sourcemaps' ),
      combine = require( 'stream-combiner2' ),
      { argv } = require( 'yargs' );

// Store file paths
const cssEntry           = 'assets/sass/**/*.scss',
      cssOut             = './',
      jsMainEntry        = 'assets/js/src/common/index.js',
      jsMainOut          = 'assets/js',
      jsPageSpecificIn   = 'assets/js/src/page-specific-scripts/*.js',
      jsPageSpecificOut  = 'assets/js',
      jsReactScriptsIn   = 'assets/js/src/task-filter/index.js',
      jsReactScriptsOut  = 'assets/js';

// set evnironment based on whether --prod flag is present or not
if ( argv.prod ) {
  process.env.NODE_ENV = 'production';
}
const PROD = process.env.NODE_ENV === 'production';

/*######################
### HELPER FUNCTIONS ###
######################*/

/**
 * Main helper for perform bundling
 *
 * @param {Array|Boolean} files files that has been change if any
 * @return void
 */
function bundle( files ) {
    // if any file has been updated log it to console
    if( files ) {
        files.map(function ( file ) {
            gutil.log( gutil.colors.bgBlue( 'File updated' ), gutil.colors.blue( file ) );
        });
    }

    // run task
    this.b.bundle()
    .on( 'error', function( err ) {
            gutil.log( gutil.colors.bgRed( 'Browserify error:' ), gutil.colors.red( err ) );
        } )
    .pipe( source( this.fileName ) )
    .pipe( buffer() )
    .pipe( cond(
        this.stripCatNames,
        rename( { dirname: '' } ) // strip dinamically generated paths
    ))
    .pipe(
        sourcemaps.init( { loadMaps: true } )
    )
    .pipe( cond(
        this.minify,
        uglify()
    ) )
    .pipe(
        sourcemaps.write( './' )
    )
    .pipe(
        gulp.dest( this.fileOut )
    );
}

/**
 * Setup context for bundle function and run it
 *
 * @param {String} fileName desired name of outputed file
 * @param {String} fileOut desired path for the outputed file
 * @param {Object} browserifyConfig config file for browserify bundler
 * @param {Boolean} stripCatNames if function is used for multiple paths it ensures that outputed paths are relative to root
 * @param {Boolean} minify should output file be minified
 * @param {Boolean} test are we bundling test files
 * @return void
 */
function setupAndRunBundle( fileName, fileOut, browserifyConfig, stripCatNames = null, minify = true ) {

    // bundler reference
    let b;

    // define context for bundle helper
    const bundleContext = {
        fileName,
        fileOut,
        stripCatNames,
        minify
    };

    // if we're in production bundle modules with browserify,
    // otherwise wrap it in watchify and watch
    if ( PROD ) {
        b = browserify( browserifyConfig );
        // add bundler to bundle context
        bundleContext.b = b;
    } else {
        // add watchify config
        const watchifyConfig = Object.assign( {}, watchify.args, browserifyConfig );

        // browserify / watchify init
        b = watchify( browserify( watchifyConfig ) );
        // add bundler to bundle context
        bundleContext.b = b;

        // on modules update call bundle
        b.on( 'update', bundle.bind( bundleContext ) );
    }

    // initial bundler call
    bundle.call( bundleContext );
}

/*###########
### TASKS ###
###########*/

gulp.task( 'clean', function () {
    del( [ 'assets/js/*.js', './*.css', './**/*.map' ] );
} );

gulp.task( 'css', function () {

    // combine streams
    const combined = combine.obj([
        gulp.src( cssEntry ),
        sass( { outputStyle: 'compressed' } ),
        autoprefixer( { browsers: [ '>= 1%', 'ie > 10' ] } ),
        postcss( [ flexibility ] ),
        gulp.dest( cssOut )
    ]);

    // log errors
    combined.on( 'error', gutil.log );

    return combined;

});

gulp.task( 'jsMain', function () {

    // browserify config object
    const browserifyConfig = {
        entries: jsMainEntry,
        debug: !PROD,
        transform: [
            [ 'babelify', {
                presets: [
                    [ 'env', {
                        'targets': {
                            'browsers': [ '>= 1%', 'ie > 10' ]
                        }
                    }]
            ],
                plugins: [ 'transform-runtime' ] }
          ]
        ]
    };

    // setup and run bundle process
    setupAndRunBundle( 'main.js', jsMainOut, browserifyConfig, null, PROD );

});

gulp.task( 'jsPageSpecific', function ( done ) {


    // for each file make transformations and bundle
    glob( jsPageSpecificIn, ( err, files ) => {
        // if there is any errror stop task
        if ( err ) done( err );

        // map all entry files
        const tasks = files.map( ( entry ) => {

            // browserify config object
            const browserifyConfig = {
                entries: entry,
                debug: !PROD,
                transform: [
                    [ 'babelify', {
                        presets: [
                            [ 'env', {
                                'targets': {
                                    'browsers': [ '>= 1%', 'ie > 10' ]
                                }
                            }]
                        ],
                        plugins: [ 'transform-runtime' ] }
                  ]
                ]
            };

            // setup and run bundle process
            setupAndRunBundle( entry, jsPageSpecificOut, browserifyConfig, true );

        });

    });
});

gulp.task( 'jsReactScripts', function () {
    // babelify conf
    const babelify = [ 'babelify', {
        presets: [
            [ 'env', {
                'targets': {
                    'browsers': [ '>= 1%', 'ie > 10' ]
                }
            }], [ 'react' ]
    ],
        plugins: [ 'transform-runtime' ] }
  ];

    // browserify config object
    const browserifyConfig = {
        entries: jsReactScriptsIn,
        transform: !PROD ? [ babelify ] :
        [
            babelify,
            [ 'uglifyify', { global: true } ]
        ],
        plugin: PROD ? [ 'bundle-collapser/plugin' ] : [] // if we're in production add plugin
    }

    // setup and run bundle process
    setupAndRunBundle( 'task-filter.js', jsReactScriptsOut, browserifyConfig, null, PROD );

} );

gulp.task( 'watch', [ 'clean', 'css' ], function () {

    // if we're in production don't watch
    if ( PROD ) return;

    gulp.watch( cssEntry, [ 'css' ] );
});

gulp.task( 'default', [ 'clean', 'css', 'jsMain', 'jsPageSpecific', 'jsReactScripts', 'watch' ] );
