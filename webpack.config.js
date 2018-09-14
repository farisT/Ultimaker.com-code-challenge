
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
});

const outputDirectory = "dist";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            "css-loader?url=false ",
            "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
        {
            loader: 'file-loader',
            options: {
              outputPath: './assets/',
            }
            
        }]
      }
      ]
    },
    devServer: {
      port:3000,
      open:true,
      historyApiFallback: true,
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      htmlPlugin
    ]
  };