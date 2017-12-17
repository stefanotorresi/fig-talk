var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var del     = require('del');
var path    = require('path');
var argv    = require('yargs').argv;
var gulpsync = plugins.sync(gulp);

var paths = {
    dist: './',
    pug: 'pug/'
};

var srcFiles = {
    pug: [ paths.pug + '**/*.pug' ]
};

gulp.task('clean', function () {
    log('Cleaning index file...');
    return del([ './index.html' ], { force: true });
});

gulp.task('pug', function() {
    log('Building HTML from Pug sources...');
    return gulp.src([].concat(srcFiles.pug, '!**/_*.*'))
        .pipe(plugins.pug())
        .on('error', handleError)
        .pipe(gulp.dest(paths.dist))
    ;
});

gulp.task('watch', function() {
    log('Starting watch and LiveReload...');

    plugins.livereload.listen();

    gulp.watch([ paths.pug, srcFiles.pug ], ['pug']);

    // a delay before triggering browser reload to ensure everything is compiled
    var livereloadDelay = 500;

    // list of source file to watch for live reload
    var watchSource = [].concat(
        srcFiles.pug
    );

    gulp.watch(watchSource)
        .on('change', function(event) {
            setTimeout(function() {
                plugins.livereload.changed(event.path);
            }, livereloadDelay);
        })
        .on('error', handleError)
    ;

    log('************************');
    log('* Watching for changes *');
    log('************************');
});

gulp.task('build', gulpsync.sync([
    'clean',
    'pug'
]), function(){
    log('*******************');
    log('* Build Completed *');
    log('*******************');
});

gulp.task('default', gulpsync.sync([
    'build',
    'watch'
]));

/////////////////////

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    plugins.util.log(plugins.util.colors.blue(msg));
}
