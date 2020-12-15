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
    }
}