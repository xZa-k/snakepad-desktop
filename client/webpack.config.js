const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, "../");
const srcPath = path.join (__dirname, "src")

module.exports = {
  mode: "development",
  entry: './src/index.ts',
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
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(srcPath, "index.html"),
        }),
    ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(rootPath, 'dist/client'),
  },
    devServer: {
        hot: false,
        port: 8080,
        liveReload: true, 
        static: {
            publicPath: "/",
        },
        proxy: {
          "/api": "http://localhost:3000"
        },
    }
};
