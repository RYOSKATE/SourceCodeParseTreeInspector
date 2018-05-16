// webpack.config.js
module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: './docs/bundle.js'
    },
    target: "node",
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
