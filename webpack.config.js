const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
    entry: {
        app: path.resolve(__dirname, 'public', 'app.js')
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'app.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            babelrc: false,
                            presets: [
                                ['es2015', {'modules': false}],
                                'stage-0'
                            ],
                            plugins: [
                                'transform-runtime',
                                ['angularjs-annotate', {'explicitOnly': true}]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css')
    ],
    devtool: 'source-map'
};


if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            sourceMap: false,
            mangle: true,
            minimize: true
        })
    );
}


module.exports = config;
