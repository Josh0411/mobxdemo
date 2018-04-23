const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const stylelint = require('stylelint-webpack-plugin');


module.exports = function(env) {
    console.log(env);
    return {
        entry: {
            'app': ['./src/app.js', './src/mobx_test.js'],
            'vendor': ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'babel-polyfill']
        },
        output: {
            filename: 'js/[name]-[chunkhash].js',
            path: path.resolve(__dirname, 'build'),
            chunkFilename: "[name].chunk.[chunkhash].js"
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /(\.jsx|\.js)$/i,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }],
                exclude: /node_modules/
            }, {
                test: /(\.png|\.jpg|\.jpeg|\.gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name]-[hash].[ext]'
                    }
                }]
            }, {
                test: /(\.scss|\.sass)$/i,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                },{
                    loader: 'sass-loader'
                }]
            }]
        },
        plugins: [
            new cleanWebpackPlugin(path.resolve(__dirname, './build')),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new stylelint({
                fix: true
            }),
            new CopyWebpackPlugin([
                { from: __dirname + '/src/Voice', to:__dirname+ '/build/', toType: 'dir' }
            ]),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'runtime'],
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
                chunks: ['app', 'vendor', 'runtime']
            })
        ],
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, './src'),
                '@section': path.resolve(__dirname, './src/section'),
                '@images': path.resolve(__dirname, './src/images')
            },
            modules: [path.resolve(__dirname, 'node_modules')]
        },
        devServer: {
            contentBase: path.join(__dirname, "build"),
            host: '0.0.0.0',
            https: true

        }
    }
}
