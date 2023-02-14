const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const path = require("path");

const plugins = [];
let mode = "development";
let target = "web"; // в режиме разработки browserslist не используется
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist"; // в продакшен режиме используем browserslist
}

if (process.env.SERVE) {
  // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
} //

module.exports = {
  mode,
  target,
  entry: {},
  devtool: false,
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss$/i, // /\.(le|c)ss$/i если вы используете less
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource", // В продакшен режиме
        // изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
            // при каждом запуске
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve("dist"),
    filename: "[id].[hash].js",
    chunkFilename: "[id].js",
    assetModuleFilename: "assets/[hash][ext][query]", // Все ассеты будут
    library: { type: "system" },
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Формат имени файла
    }),
    ...plugins,
  ],

  devServer: {
    static: path.join("dist"),
    compress: true,
    port: 4000,
    hot: true,
  },
};
