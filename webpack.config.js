/**
 * Created by zhbhun on 2015/9/8.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, './src')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")],
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react-window-kit': path.join(__dirname, './src'),
            react: path.join(__dirname, './node_modules/react/dist/react'),
            'react-bootstrap': path.join(__dirname, './node_modules/react-bootstrap/dist/react-bootstrap'),
            bootstrap$: path.join(__dirname, './node_modules/bootstrap/dist/js/bootstrap.js'),
            bootstrap: path.join(__dirname, './node_modules/bootstrap')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: /src/,
                loader: 'babel?stage=0'
            }, {
                test: /\.css$/,
                loaders: ['style', 'css']
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            }]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    debug: true,
    devtool: 'source-map',
    devServer: {
        contentBase: './test',
        inline: true,
        port: 3000
    }
}