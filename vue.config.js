/*
 * @Author: Jerryk jerry@icewhale.org
 * @Date: 2022-02-18 10:20:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-08 19:28:05
 * @FilePath: \CasaOS-UI\vue.config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by IceWhale, All Rights Reserved. 
 */

const webpack = require('webpack')
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UselessFile = require('useless-files-webpack-plugin')
const path = require("path")
module.exports = {
    publicPath: '/ui/',
    runtimeCompiler: true,
    lintOnSave: false,
    productionSourceMap: true,
    pluginOptions: {

    },
    css: {
        extract: true
    },
    chainWebpack: config => {
        config.plugin('ignore')
            .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

        config.plugin('uselessFile')
            .use(
                new UselessFile({
                    root: path.resolve(__dirname, './src/assets/images'),
                    clean: true,
                    exclude: /node_modules/
                })
            )
        // 
        if (process.env.NODE_ENV === "prod") {
            config.optimization.minimize(true);
            // config.plugin('webpack-bundle-analyzer')
            //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            config.optimization.splitChunks({
                chunks: 'all'
            })

            config.optimization
                .minimizer('css')
                .use(require.resolve('optimize-css-assets-webpack-plugin'), [{ cssProcessorOptions: { safe: true } }])

        }
    }
}
