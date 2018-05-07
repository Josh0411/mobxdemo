const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const stylelint = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports = function(env) {
    return {
        entry: {
            'keeper': ['./src/keeper.js', './src/mobx_test.js'],
            'vendor': ['react', 'react-dom', 'react-router-dom', 'react-keeper', 'mobx', 'mobx-react', 'babel-polyfill']
        },
        output: {
            filename: 'js/[name]-[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: "[name].chunk.[chunkhash].js"
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /(\.jsx|\.js)$/i,
                use: 'happypack/loader?id=js',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            module: false,
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }]
                })
            }]
        },
        plugins: [
            new cleanWebpackPlugin(path.resolve(__dirname, './dist')),
            new NamedModulesPlugin(),
            new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new HappyPack({
                id: 'js',
                threads: 4,
                verbose: true,
                threadPool: happyThreadPool,
                loaders: ['babel-loader?cacheDirectory']
            }),
            new stylelint({
                fix: false
            }),
            new UglifyJSPlugin({
                uglifyOptions: {
                    parallel: true,
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    },
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    }
                }
            }),
            new ExtractTextPlugin({
                filename: './css/[name].[contenthash].css',
                allChunks: true
            }),
            new CopyWebpackPlugin([
                { from: __dirname + '/src/Voice', to: __dirname + '/dist/Voice', toType: 'dir' }
            ]),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest', 'vendor']
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     chunks: ['app', 'vendor'],
            //     name: 'base'
            // }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
                chunks: ['keeper', 'vendor', 'manifest']
            })
        ],
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, './src'),
                '@section': path.resolve(__dirname, './src/section'),
                '@images': path.resolve(__dirname, './src/images')
            },
            modules: [path.resolve(__dirname, 'node_modules')],
            mainFields: ['jsnext:main', 'browser', 'main']
        },
        devServer: {
            host: '0.0.0.0',
            port: 9820,
            inline: true,
            https: false,
            compress: true,
            hot: false
        }
    }
}
