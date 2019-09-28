const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
module.exports = {
    entry: { 
        main: './src/index.js',
        summary: './src/summary.js',
        vacancy: './src/vacancy.js' 
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {loader: "babel-loader"},
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                     'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                     {
                         loader: 'image-webpack-loader'
                     },
                    ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
          }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/summary.html',
            filename: 'summary.html'
          }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/vacancy.html',
            filename: 'vacancy.html'
          }),
        new WebpackMd5Hash()
    ]
}