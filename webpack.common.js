
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
                use: ['babel-loader']
            }
        ]
    }
}