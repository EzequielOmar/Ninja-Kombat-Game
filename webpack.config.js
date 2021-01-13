const path = require('path');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            // Only run `.js` and `.jsx` files through Babel
            test: /\.js?$/,
            //skip the files in the node_modules directory
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};