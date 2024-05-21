const resolve = require("path").resolve
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const NODE_ENV = process.env.NODE_ENV === "production" ? "production" : "development"

const createBrowserConfig = (type, name) => ({
    mode: NODE_ENV,
    entry: resolve(__dirname, "src", type, name + ".jsx"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "source-map-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader", "source-map-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: resolve(__dirname, type),
        filename: `${name}.js`
        // clean: true
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src", type, "index.html"),
            filename: `${name}.html`
        }),
        new CopyPlugin({
            patterns: [{ from: resolve(__dirname, "public"), to: "public" }]
        })
    ],
    externals: ["nodecg"],
    devtool: NODE_ENV === "development" ? "inline-source-map" : void 0
})

module.exports = [
    createBrowserConfig("dashboard", "tower"),
    createBrowserConfig("dashboard", "teams"),
    createBrowserConfig("graphics", "tower")
]
