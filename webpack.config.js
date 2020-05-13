const webpack = require('webpack');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';

//const nodeExternals = require('webpack-node-externals');

const clientConfig = {
    entry: './src/client/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'public/client.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: "source-map",
    mode: dev ? 'development': 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader','eslint-loader']
            }
        ]
    }
};

const serverConfig = {
    entry: './src/server/index.jsx',
    target: "node",
    mode: dev ? 'development': 'production',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader','eslint-loader']
            }
        ]
    },
    plugins: [
        /*
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        })
        */
    ]
};

module.exports = [clientConfig, serverConfig];
