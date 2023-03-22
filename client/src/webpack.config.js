const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, "../");


module.exports = {
  mode: "development",
  entry: './src/client/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
