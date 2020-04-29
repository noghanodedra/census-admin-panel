'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: './index.tsx',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 19006,
            historyApiFallback: true,
        },
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
            }),
            new Dotenv(),
            new CopyWebpackPlugin([{ from: 'public/locales', to: 'locales' }]),
        ],
        resolve: {
            modules: [__dirname, 'src', 'node_modules'],
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
    };
};
