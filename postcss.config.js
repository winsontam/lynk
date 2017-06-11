var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var browsers = [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 9',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12'
];

var plugins = [
    autoprefixer({
        browsers: browsers
    })
];

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    plugins.push(cssnano({
        autoprefixer: {
            browsers: browsers
        },
        discardComments: {
            removeAll: true
        }
    }));
}

module.exports = {
    plugins: plugins
};
