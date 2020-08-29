const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {

    console.debug("----------------------------")
    console.debug(" ", argv.bundle, " | ", argv.mode);
    console.debug("----------------------------\n")

    const res = {
        entry: "REPLACE",
        output: {
            path: path.resolve(__dirname, "dist")
        },
        externals: {
            "loader-utils": "loaderUtils",
            css: "css"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            }
                        },
                        {
                            loader: "eslint-loader",
                            options: {
                                configFile: "./eslintrc.js"
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        "styles-to-js-loader",
                        {
                            loader: "css-loader",
                            options: {
                                //Include 1 prev loader for @import. ie use css-prefix-loader for @import.
                                importLoaders: 1
                            }
                        },
                        {
                            loader: path.resolve(__dirname, "src/index.js"),
                            options: {
                                selector: ".my-class"
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    loader: "html-loader"
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg)$/,
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]"
                    }
                }
            ]
        },
        plugins: []
    };

    if (argv.bundle === "dist") {
        res.entry = {
            "css-prefix-loader": path.resolve(__dirname, "src/index.js"),
        };
        res.output.filename = argv.mode === "production"
            ? "[name].min.js"
            : "[name].js"
        res.output.libraryTarget = "umd";
        res.devtool = "source-map";
    }
    else {
        res.entry = path.resolve(__dirname, "test/test.js");
        res.plugins.push(
            new HtmlWebPackPlugin({
                template: "test/test.html"
            })
        );
    }

    return res;
};