import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  entry: "./client/index.tsx",
  devtool: "inline-source-map",
  output: {
    path: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  mode: "development",
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(js|tsx|jsx|ts)$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
    }),
  ],
};

export default config;
