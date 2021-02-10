module.exports = {
    runtimeCompiler: true,
    pwa: {
        workboxOptions: {
            skipWaiting: true
        }
    },
    configureWebpack: {
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                minSize: 20000,
                maxSize: 210000,
            }
        }
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
}