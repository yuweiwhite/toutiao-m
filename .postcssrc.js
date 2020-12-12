module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用autoprefixer 插件 Vue会有默认的，这里不需要配置
    // 作用：生成游览器CSS样式规则前缀
    // 'autoprefixer': {
    // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // lib-flexible 的rem适配方案，把一行分成10份每份都是十分之一
      // vant固定按照37.5每份来划分的，我们设计图需要按照实际尺寸来划分，这里需要判断
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 75,
      // 配置CSS要转换的属性， *代表所有
      propList: ['*']
    }
  }
}
