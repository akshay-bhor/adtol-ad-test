const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        text: "./js/text.js",
        native: "./js/native.js",
        banner: "./js/banner.js",
        feed: "./js/feed.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body'
        })
    ]
}