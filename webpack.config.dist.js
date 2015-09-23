/**
 * Created by zhbhun on 2015/9/8.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'react-window-kit': path.join(__dirname, './src/index.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
        library: 'ReactWindow',
        libraryTarget: 'umd'
    },
    externals: {
        classnames: true,
        'object-assign': true,
        'rc-align': true,
        react: true,
        'react-overlays': true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: /src/,
                loader: 'babel?stage=0'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            output: {
                ascii_only: true
            }
        })
    ]
}