const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path");

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: "Virrvarr",
        globalObject: `window`,
        libraryExport: "default"
    },
    devServer: {
        inline: true,
        open: true,
        port: 8088
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "src/data"),
                to: path.resolve(__dirname, "dist/data")
            }
        ])
    ]
}