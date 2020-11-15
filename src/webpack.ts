import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const webpackConfig: webpack.Configuration = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(__dirname, ".."),
    entry: "./src/index",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /\.d\.ts$/,
                loader: "@ts-tools/webpack-loader",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: { localIdentName: "[name]_[local]" },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|woff2|ttf|ico)$/i,
                loader: "url-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
    ],
    stats: "errors-only",
};

export const webpackMiddleware = webpackDevMiddleware(webpack(webpackConfig));
