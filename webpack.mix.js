const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    devtool: 'inline-source-map',
    resolve: {
        fallback: {
            path: require.resolve("path-browserify")
        }
    }
});

mix.js('resources/js/app.js', 'public/js')
    .vue(
            {
                version: 2,
                extractStyles: true,
                globalStyles: false,
            }
        )
    .sass('resources/sass/app.scss', 'public/css');

//No reload page on development
mix.browserSync({
    open: 'external',
    host: 'localhost',
    proxy: 'localhost/websocket-chat-demo/public',
    files: [
        'resources/views/**/*.php',
        // 'app/**/*.php',
        // 'routes/**/*.php',
        'public/js/*.js',
        'public/css/*.css'
    ],
    browser: '/usr/lib/firefox-developer-edition/firefox',
    port: 3000
});
