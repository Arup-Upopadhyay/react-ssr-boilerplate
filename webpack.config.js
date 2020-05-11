const webpack = require('webpack');
const path = require('path');
//const nodeExternals = require('webpack-node-externals');

const clientConfig = {
    entry: './src/client/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'public/client.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};

const serverConfig = {
    entry: './src/server/index.jsx',
    target: "node",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
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
