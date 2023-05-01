const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require ('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry : './src/index.js',  //Punto de entrada de la app
    output : {
        path : path.resolve(__dirname, 'dist'),//Es para saber donde se encuentra el directorio
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions:['.js'],
        alias:{//alias --> Se utilizan para acotar las rutas a las carpetas y no tenes que generar un assets/images/github.png
            '@utlis': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module:{
        rules:[
            {
                test : /\.m?js$/,
                exclude : /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test :/\.css|\.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader : 'url-loader',
                    options: {
                        limit : 10000,
                        mimetype : "aplication/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath:"./assets/fonts/",
                        publicPath: "..assets/fonts/",
                        esModule: false,
                    },
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template : './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename : 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns : [
                {
                    from : path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ]
}