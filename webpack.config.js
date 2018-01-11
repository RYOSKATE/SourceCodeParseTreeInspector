// webpack.config.js
module.exports = {
    entry: './docs/js/app.js',
    output: {
        filename: './docs/bundle.js'
    },
    target: "node",
    devtool: 'inline-source-map',
};