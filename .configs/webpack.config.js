const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, "../");


module.exports = {
  entry: './src/client/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
    plugins: [
        new HtmlWebpackPlugin()
    ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(rootPath, 'dist/client'),
  },
};
