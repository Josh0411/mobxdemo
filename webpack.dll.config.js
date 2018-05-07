const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        'vendor': ['react', 'react-dom', 'react-router-dom', 'react-keeper', 'mobx', 'mobx-react', 'babel-polyfill']
    },
    output: {
        filename: 'vendor.js',
        path: path.resolve(__dirname, './dll'),
        library: 'vendor'
    },
    plugins: [
        new CleanWebpackPlugin(['./dll']),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, './dll/vendor-manifest.json'),
            filename: 'vendor.js',
            name: 'vendor'
        })
    ]
};
