module.exports = {
  // 空字符串 ('') 或是相对路径 ('./') 打出来的包可以被部署在任意路径
  // 相对路径的 publicPath 有一些使用上的限制。当使用基于 HTML5 history.pushState 的路由时；当使用 pages 选项构建多页面应用时。
  // 还好我们都没涉及到.
  // 更多应用(比如不同环境的不同配置)详见 https://cli.vuejs.org/zh/config/#publicpath
  publicPath: './',
  devServer: {
    port: 3000,
    proxy: {
      '/vue-demo-webapi': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}