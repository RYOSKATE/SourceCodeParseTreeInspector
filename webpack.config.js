// webpack.config.js
module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: './docs/bundle.js'
    },
    target: "node",
    devtool: 'inline-source-map',
};
