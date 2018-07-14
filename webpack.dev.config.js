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
const purifycssWebpackPlugin = require('purifycss-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const glob = require('glob');
const linfeng = require('./wp/linfeng');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

const PreloadWebpackPlugin = require('preload-webpack-plugin');


module.exports = function(env) {
    return {
        // 设置模块的根目录，影响相对路径的写法
        // context: path.resolve(__dirname, 'src'),
        entry: {
            'keeper': ['./src/keeper.js', './src/mobx_test.js'],
            'router': ['./src/router.js'],
            'analysis': ['./src/js/analysis.js']
        },
        output: {
            filename: 'js/[name]-[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: "[name].chunk.[chunkhash].js"
        },
        devtool: 'source-map',
        externals: {
            "zepto": "Zepto"
        },
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
            new linfeng(),
            new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, './dll/vendor-manifest.json')
            }),
            new NamedModulesPlugin(),
            new webpack.HashedModuleIdsPlugin(),
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
            // new UglifyJSPlugin({
            //     uglifyOptions: {
            //         parallel: true,
            //         output: {
            //             // 最紧凑的输出
            //             beautify: false,
            //             // 删除所有的注释
            //             comments: false,
            //         },
            //         compress: {
            //             // 在UglifyJs删除没有用到的代码时不输出警告
            //             warnings: false,
            //             // 删除所有的 `console` 语句，可以兼容ie浏览器
            //             drop_console: true,
            //             // 内嵌定义了但是只用到一次的变量
            //             collapse_vars: true,
            //             // 提取出出现多次但是没有定义成变量去引用的静态值
            //             reduce_vars: true,
            //         }
            //     }
            // }),
            // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
            // new ParallelUglifyPlugin({
            //   // 传递给 UglifyJS 的参数
            //   uglifyJS: {
            //     output: {
            //       // 最紧凑的输出
            //       beautify: false,
            //       // 删除所有的注释
            //       comments: false,
            //     },
            //     compress: {
            //       // 在UglifyJs删除没有用到的代码时不输出警告
            //       warnings: false,
            //       // 删除所有的 `console` 语句，可以兼容ie浏览器
            //       drop_console: true,
            //       // 内嵌定义了但是只用到一次的变量
            //       collapse_vars: true,
            //       // 提取出出现多次但是没有定义成变量去引用的静态值
            //       reduce_vars: true,
            //     }
            //   },
            //   cacheDir: __dirname + '/uglifyJSCache',
            //   exclude: './node_modules',
            //   test: /(\.js)$/i,
            //   workerCount: 4
            // }),
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                allChunks: true
            }),
            new CopyWebpackPlugin([
                { from: __dirname + '/src/Voice', to: __dirname + '/dist/Voice', toType: 'dir' }
            ]),
            new CopyWebpackPlugin([
                { from: __dirname + '/src/zepto.min.js', to: __dirname + '/dist' }
            ]),
            new CopyWebpackPlugin([
                { from: __dirname + '/src/work.js', to: __dirname + '/dist' }
            ]),
            new CopyWebpackPlugin([
                { from: __dirname + '/src/subwork.js', to: __dirname + '/dist' }
            ]),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'],
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                template: 'html-loader!./src/keeper.html',
                filename: './keeper.html',
                chunks: ['keeper', 'vendor', 'manifest', 'analysis'],
                linfeng: 'josh',
                inlineSource: 'analysis'
            }),
            new HtmlWebpackPlugin({
                template: './src/router.html',
                filename: './router.html',
                chunks: ['router', 'vendor', 'manifest']
            }),
            new HtmlIncludeAssetsPlugin({
                assets: ['./dll/vendor.js'], //添加的资源相对html的路径
                append: false // false 在其他资源的之前添加 true 在其他资源之后添加
            }),
            new HtmlWebpackInlineSourcePlugin(),
            // new PreloadWebpackPlugin({
            //     rel: 'preload',
            //     as: 'script',
            //     include: 'allChunks'
            // })
            // new InlineChunkManifestHtmlWebpackPlugin()
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
            host: '0.0.0.0',
            port: 9820,
            inline: true,
            https: false,
            compress: true,
            hot: false
        }
    }
}
