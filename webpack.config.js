const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    return {
        entry: './index.tsx',
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
            ],
        },
    };
};
