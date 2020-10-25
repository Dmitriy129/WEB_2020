const path = require('path');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PUB_PUTH = "./front/public/"

const genPath = (conf) => {
    var ret = {};
    conf.forEach(({ from, to, name }) => {
        const paths = glob.sync(from)
        paths.forEach((path) =>
            ret[to + (name
                ? path.split('/').pop().replace(/\..*$/, name)
                : path.split('/').pop())] = path)
    })
    console.log(ret);
    return ret;
}

module.exports = {
    entry: genPath([
        {
            from: './front/src/script/*.js',
            to: 'script/',
            name: ".js"
        },
        {
            from: './front/src/less/*.less',
            to: 'css/',
            // name: ".css"
        },
    ]),

    output: {
        filename: "[name]",
        path: path.resolve(__dirname, PUB_PUTH)
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: [
                    path.resolve(__dirname, "/front/src/script/")
                ],
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }

                }

            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    // name: data => data.chunk.name.replace('-', "/"),
                    // filename: data => console.log('data :>> ', data),
                    publicPath: '/public/fonts/',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: '/public/img/',
                    outputPath: 'img/'
                }

            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: data => data.chunk.name.replace(/\..*$/, ".css")
            }
        ),
        new CopyPlugin({
            patterns: [{
                from: './front/src/img/',
                to: 'img/',
            }, {
                from: './front/src/savedImg/',
                to: 'savedImg/',
            },
            ],
        }),
    ],
}