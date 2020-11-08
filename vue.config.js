module.exports = {
    runtimeCompiler: true,
    configureWebpack:{
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
    
  }