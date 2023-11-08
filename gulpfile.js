"use strict";

/* Paths to build/app/watch files */

let dist_folder             = 'dist'; /* build */
let source_folder           = 'app'; /* source */
let documentation_app       = 'app/documentation'; /* documentation */
let documentation_build     = 'documentation'; /* documentation */

let path = {
    build:{
        html:           dist_folder + '/',
        singleBlog:     dist_folder + '/blog/',
        singleBlogCss:  dist_folder + '/blog/css/',
        css:            dist_folder + '/css/',
        vendorStyle:    dist_folder + '/css/vendors/',
        js:             dist_folder + '/js/',
        jsArticle:      dist_folder + '/blog/js/',
        vendorScripts:  dist_folder + '/js/vendors/',
        php:            dist_folder + '/php/',
        img:            dist_folder + '/images/',
        fonts:          dist_folder + '/fonts/',
    },
    app:{
        html:           source_folder + '/index.html',
        singleBlog:     source_folder + '/blog/*.html',
        singleBlogScss: source_folder + '/blog/scss/article.scss',
        error:          source_folder + '/404.html',
        scss:           source_folder + '/scss/style.scss',
        structureScss:  source_folder + '/scss/structure.scss',
        globalScss:     source_folder + '/scss/global.scss',
        cssCus:         source_folder + '/scss/custom.scss',
        vendorCss:      source_folder + '/scss/vendors/**/*',
        js:             source_folder + '/js/*.js',
        js_min:         source_folder + '/js/main.js',
        jsArticle:      source_folder + '/blog/js/*.js',
        vendorJs:       source_folder + '/js/vendors/**/*',
        php:            source_folder + '/php/**/*.php',
        img:            source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest}',
        fonts:          source_folder + '/fonts/**/*',
        favicon:        source_folder + '/browserconfig.xml',
        pdf:            source_folder + '/*.pdf',
    },
    documentationApp:{
        html:           documentation_app + '/index.html',
        scss:           documentation_app + '/scss/style.scss',
        structureScss:  documentation_app + '/scss/structure.scss',
        globalScss:     documentation_app + '/scss/global.scss',
        cssCus:         documentation_app + '/scss/custom.scss',
        vendorCss:      documentation_app + '/scss/vendors/**/*',
        js:             documentation_app + '/js/*.js',
        js_min:         documentation_app + '/js/main.js',
        vendorJs:       documentation_app + '/js/vendors/**/*',
        img:            documentation_app + '/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml}',
        fonts:          documentation_app + '/fonts/**/*',
    },
    documentationBuild:{
        html:           documentation_build + '/',
        css:            documentation_build + '/css/',
        vendorStyle:    documentation_build + '/css/vendors/',
        js:             documentation_build + '/js/',
        vendorScripts:  documentation_build + '/js/vendors/',
        img:            documentation_build + '/images/',
        fonts:          documentation_build + '/fonts/',
    },
    watch:{
        html:           source_folder + '/**/*.html',
        blogCss:        source_folder + '/blog/**/*.scss',
        css:            source_folder + '/scss/**/*.scss',
        js:             source_folder + '/js/*.js',
        jsArticle:      source_folder + '/blog/js/*.js',
        php:            source_folder + '/php/**/*.php',
        img:            source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
        doc_html:       documentation_app + '/**/*.html',
        doc_css:        documentation_app + '/scss/**/*.scss',
        doc_js:         documentation_app + '/js/*.js',
        doc_img:        documentation_app + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean:              './' + dist_folder + '/',
    doc_clean:          './' + documentation_build + '/',
};

/* npm Packages Variables */

const   {src, dest} 	= require('gulp'),
		gulp			= require('gulp'),
        browsersync 	= require('browser-sync').create(),
        fileinclude 	= require('gulp-file-include'),
        sass 			= require('gulp-sass')(require('sass')),
        autoprefixer 	= require('gulp-autoprefixer'),
        cleanCSS        = require('gulp-clean-css'),
        gcmq            = require('gulp-group-css-media-queries'),
        uglify 			= require('gulp-uglify'),
        concat 			= require('gulp-concat'),
        imagemin 		= require('gulp-imagemin'),
        webp            = require('gulp-webp'),
        del 			= require('del');

/* Webserver Config */

function browserSync(){
    browsersync.init({
        server:{
            baseDir: 'dist/'
        },
        port: 3000,
        notify: false
    })
};

/* Gulp Functions */

function html(){
    return src(path.app.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
};

function blogSingle(){
    return src(path.app.singleBlog)
    .pipe(fileinclude())
    .pipe(dest(path.build.singleBlog))
    .pipe(browsersync.stream());
};

function error(){
    return src(path.app.error)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
};

function buildStyles(){
    return src(path.app.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
};

function singleBlogCss(){
    return src(path.app.singleBlogScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.build.singleBlogCss))
    .pipe(browsersync.stream());
};

function structureCss(){
    return src(path.app.structureScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(concat('structure.min.css'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
};

function globalCss(){
    return src(path.app.globalScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(concat('global.min.css'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
};

function cssCus(){
    return src(path.app.cssCus)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(path.build.css));
};

function buildJs(){
    return src(path.app.js)
    .pipe(dest(path.build.js))
};

function buildJsMin(){
    return src(path.app.js_min)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(path.build.js))
};

function jsArticle(){
    return src(path.app.jsArticle)
    .pipe(concat('article.min.js'))
    .pipe(uglify())
    .pipe(dest(path.build.jsArticle))
};

function buildPhp(){
    return src(path.app.php)
    .pipe(dest(path.build.php))
};

function images(){
    return src(path.app.img)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(dest(path.build.img));
};

function vendorsCss(){
    return src(path.app.vendorCss)
    .pipe(dest(path.build.vendorStyle))
};

function vendorsJs(){
    return src(path.app.vendorJs)
    .pipe(dest(path.build.vendorScripts))
};

function fonts(){
    return src(path.app.fonts)
    .pipe(dest(path.build.fonts));
};

function webpConvert(){
    return src(path.app.img)
    .pipe(webp())
    .pipe(dest(path.build.img));
};

function favicon(){
    return src(path.app.favicon)
    .pipe(dest(path.build.html));
};

function pdf(){
    return src(path.app.pdf)
    .pipe(dest(path.build.html));
};

function cleanDist(){
    return del(path.clean)
};

/* Documentation */
function html_doc(){
    return src(path.documentationApp.html)
    .pipe(fileinclude())
    .pipe(dest(path.documentationBuild.html))
    .pipe(browsersync.stream());
};

function buildStyles_doc(){
    return src(path.documentationApp.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.documentationBuild.css))
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(dest(path.documentationBuild.css))
    .pipe(browsersync.stream());
};

function structureCss_doc(){
    return src(path.documentationApp.structureScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.documentationBuild.css))
    .pipe(cleanCSS())
    .pipe(concat('structure.min.css'))
    .pipe(dest(path.documentationBuild.css))
    .pipe(browsersync.stream());
};

function globalCss_doc(){
    return src(path.documentationApp.globalScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true,
    }))
    .pipe(gcmq())
    .pipe(dest(path.documentationBuild.css))
    .pipe(cleanCSS())
    .pipe(concat('global.min.css'))
    .pipe(dest(path.documentationBuild.css))
    .pipe(browsersync.stream());
};

function cssCus_doc(){
    return src(path.documentationApp.cssCus)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(path.documentationBuild.css));
};

function buildJs_doc(){
    return src(path.documentationApp.js)
    .pipe(dest(path.documentationBuild.js))
};

function buildJsMin_doc(){
    return src(path.documentationApp.js_min)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(path.documentationBuild.js))
};

function images_doc(){
    return src(path.documentationApp.img)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(dest(path.documentationBuild.img));
};

function vendorsCss_doc(){
    return src(path.documentationApp.vendorCss)
    .pipe(dest(path.documentationBuild.vendorStyle))
};

function vendorsJs_doc(){
    return src(path.documentationApp.vendorJs)
    .pipe(dest(path.documentationBuild.vendorScripts))
};

function fonts_doc(){
    return src(path.documentationApp.fonts)
    .pipe(dest(path.documentationBuild.fonts));
};

function webpConvert_doc(){
    return src(path.documentationApp.img)
    .pipe(webp())
    .pipe(dest(path.documentationBuild.img));
};

function cleanDist_doc(){
    return del(path.doc_clean)
};
/* ================================================= */

function watching(){
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.html],error);
    gulp.watch([path.watch.html],blogSingle);
    gulp.watch([path.watch.css],buildStyles);
    gulp.watch([path.watch.css],structureCss);
    gulp.watch([path.watch.css],globalCss);
    gulp.watch([path.watch.js],buildJs);
    gulp.watch([path.watch.jsArticle],jsArticle);
    gulp.watch([path.watch.js],buildJsMin);
    gulp.watch([path.watch.php],buildPhp);
    gulp.watch([path.watch.img],images);
    gulp.watch([path.watch.img],webpConvert);
    gulp.watch([path.watch.doc_html],html_doc);
    gulp.watch([path.watch.doc_css],buildStyles_doc);
    gulp.watch([path.watch.doc_css],structureCss_doc);
    gulp.watch([path.watch.doc_css],globalCss_doc);
    gulp.watch([path.watch.doc_js],buildJs_doc);
    gulp.watch([path.watch.doc_js],buildJsMin_doc);
    gulp.watch([path.watch.doc_img],images_doc);
    gulp.watch([path.watch.doc_img],webpConvert_doc);
    gulp.watch([path.watch.blogCss],singleBlogCss);
};

let build = gulp.series(
    cleanDist,
    html,
    blogSingle,
    singleBlogCss,
    error,
    images,
    vendorsCss,
    vendorsJs,
    fonts,
    webpConvert,
    favicon,
    pdf,
    buildStyles,
    structureCss,
    globalCss,
    cssCus,
    buildJs,
    buildJsMin,
    buildPhp,
    cleanDist_doc,
    html_doc,
    images_doc,
    vendorsCss_doc,
    vendorsJs_doc,
    fonts_doc,
    webpConvert_doc,
    buildStyles_doc,
    structureCss_doc,
    globalCss_doc,
    cssCus_doc,
    buildJs_doc,
    buildJsMin_doc,
    jsArticle
    );
let watch = gulp.parallel(
    build,
    watching,
    browserSync
    );

exports.html            = html;
exports.blogSingle      = blogSingle;
exports.singleBlogCss   = singleBlogCss;
exports.error           = error;
exports.buildStyles     = buildStyles;
exports.structureCss    = structureCss;
exports.globalCss       = globalCss;
exports.cssCus          = cssCus;
exports.buildJs         = buildJs;
exports.jsArticle       = jsArticle;
exports.buildJsMin      = buildJsMin;
exports.buildPhp        = buildPhp;
exports.images          = images;
exports.vendorsCss      = vendorsCss;
exports.vendorsJs       = vendorsJs;
exports.fonts           = fonts;
exports.webpConvert     = webpConvert;
exports.favicon         = favicon;
exports.pdf             = pdf;
exports.cleanDist       = cleanDist;
exports.build           = build;
exports.watch           = watch;
exports.default         = watch;
/* Documentation */
exports.html_doc            = html_doc;
exports.buildStyles_doc     = buildStyles_doc;
exports.structureCss_doc    = structureCss_doc;
exports.globalCss_doc       = globalCss_doc;
exports.cssCus_doc          = cssCus_doc;
exports.buildJs_doc         = buildJs_doc;
exports.buildJsMin_doc      = buildJsMin_doc;
exports.images_doc          = images_doc;
exports.vendorsCss_doc      = vendorsCss_doc;
exports.vendorsJs_doc       = vendorsJs_doc;
exports.fonts_doc           = fonts_doc;
exports.webpConvert_doc     = webpConvert_doc;
exports.cleanDist_doc       = cleanDist_doc;