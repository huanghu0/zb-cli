/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const TerserPlugin = require("terser-webpack-plugin");

const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = /\.(js|css|json|ttf)(\?.*)?$/i;

// const { HashedModuleIdsPlugin } = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  // 基本路径
  publicPath: "./",
  // 当运行 build 时生成的生产环境构建文件的目录。
  outputDir: "dist",
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 服务器端口号
  devServer: {},
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/css/config.scss";
        `,
      },
    },
  },
  configureWebpack: (config) => {
    config.module.rules
      .filter((rule) => rule.test.toString().indexOf("scss") !== -1)
      .forEach((rule) => {
        rule.oneOf.forEach((oneOfRule) => {
          oneOfRule.use.splice(
            oneOfRule.use.indexOf(require.resolve("sass-loader")),
            0,
            { loader: require.resolve("css-unicode-loader") }
          );
        });
      });
    const plugins = [];
    // 如果是PRD环境
    if (isProduction) {
      // 移除console
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"], // 移除console
            },
          },
        })
      );
      // GZIP
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path][name].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 0, // 只有大于该值的资源才会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          // deleteOriginalAssets: true // 删除原文件
        })
      );
      // 用于根据模块的相对路径生成 hash 作为模块 id, 只打包改变的文件
      // plugins.push(new HashedModuleIdsPlugin());
      // 开启分离js
      config.optimization = {
        runtimeChunk: "single",
        moduleIds: "named",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 1000 * 60,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                console.log(module.context);
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )
                  ? module.context.match(
                      /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                    )[1]
                  : "vendors";
                return `npm.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      };

      // 取消webpack警告的性能提示
      config.performance = {
        hints: "warning",
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        // 生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        // 只给出 js 文件的性能提示
        assetFilter(assetFilename) {
          return assetFilename.endsWith(".js");
        },
      };
    }
    return { plugins };
  },
};
