const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackConfig = {
    entry: {
        main: path.join(__dirname, "../src/main.js"),
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.join(__dirname, "../src/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: "vue-style-loader", use: "css-loader!postcss-loader" }),
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"],
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "img/[name].[ext]",
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "media/[name].[ext]",
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name].[ext]",
                },
            },
        ],
    },
    plugins: [new ExtractTextPlugin({ filename: "css/[name].[contentHash:8].css" })],
};
module.exports = webpackConfig;
