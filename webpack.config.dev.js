const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalizerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry : './src/index.js',  //Punto de entrada de la app
    output : {
        path : path.resolve(__dirname, 'dist'),//Es para saber donde se encuentra el directorio
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    //watch: true, No es necesario con la config del devServer
    devtool : 'source-map', // Nos permite generar un mapa del codigo en formato json, identificado todas las partes del project.
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
        new BundleAnalizerPlugin(), //Se utiliza para analizar posibles mejoras en el codigo --> se ejecuta de la siguiente forma --> npx webpack --profile --json | Out-file 'stats.json' -Encoding OEM (Guarda en un json el output) y para ejecutar el analisis se realiza de la siguiente manera : npx webpack-bundle-analyzer stats.json 
    ],
    devServer :{//Build local server for dev instanst
        static : path.join(__dirname,'dist'),
        compress:true,
        historyApiFallback: true,
        port:3005,
    },
}