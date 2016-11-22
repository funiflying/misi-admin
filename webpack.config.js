var path = require('path');
var webpack = require('webpack');

module.exports = {
    //devtool: 'eval-source-map',
    entry: [
       // 'webpack-hot-middleware/client',
        './app/app'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].misi.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})//production,development
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.less?$/,
                loaders : [
                    'style-loader',
                    'css-loader',
                    'less-loader?{"sourceMap":true}'
                ],
                include: __dirname
            },
            { test: /\.css$/, loader:
                'css-loader',
                include: __dirname},
            { test: /\.(eot|woff|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=50000"},
            { test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url',
                query: {limit: 10240}
            }
        ]
    }
};