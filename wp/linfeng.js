function LinfengPlugin() {

}

LinfengPlugin.prototype.apply = function(compiler) {
    const self = this
    compiler.plugin("emit", function(compilation, callback) {
        let stats = compilation.getStats().toJson({ chunkModules: true }); // 获取各个模块的状态
        let stringifiedStats = JSON.stringify(stats);
        // 服务端渲染
        let html = `<!doctype html>
          <meta charset="UTF-8">
          <title>AnalyzeWebpackPlugin</title>
          <style>test</style>
          <div id="App">
          ${stringifiedStats}
        </div>`;
        
        compilation.assets['linfeng.html'] = { // 生成文件路径
            source: () => html,
            size: () => html.length
        }
        callback()
    })
}

module.exports = LinfengPlugin;
