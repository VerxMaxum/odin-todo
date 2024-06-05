const path = require('path');

module.exports = {
    entry: "./src/index.js",
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
          ],
    },
    plugins: [
        new HtmlWebpackPlugin ({
            filenmae: 'index.html',
            template: 'src/index.html',
            title: 'Restaurant Page',
        }),
    ],
    output: {
        clean: true,
    },
};