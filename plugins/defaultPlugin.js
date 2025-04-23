// API 调用信息统计

// apiName： API 在代码中的完整调用名（Map key）
// callNum： API 调用总次数
// callOrigin： API 本名，通过 as 导入的API会存在此项
// callFiles： API 调用分布情况（Map）
// filePath： 存在 API 调用的代码文件路径信息（Map key）
// projectName： 存在 API 调用的代码文件所在的项目
// httpRepo： 用于在代码分析报告展示在线浏览代码文件的http链接前缀
// lines： 代码文件中出现 API 调用的代码行信息（数组）
exports.defaultPlugin = function (analysisContext) {
  const mapName = 'apiMap';
  // 在分析实例上下文挂载副作用
  analysisContext[mapName] = {};
  // context : codeAnalysis分析实例上下文
  // tsCompiler : typescript编译器
  // node : 基准分析节点baseNode
  // depth : 链式调用深度
  // apiName : api完整调用名（含链式调用）
  // matchImportItem : API调用在import节点中的声明信息
  // filePath : 代码文件路径
  // projectName : 待分析代码文件所在的项目名称
  // line : API调用所在代码文件中的行信息
  function isApiCheck (context, tsCompiler, node, depth, apiName, matchImportItem, filePath, projectName, httpRepo, line) {
      try{
          if (!context[mapName][apiName]) {
              context[mapName][apiName] = {};
              context[mapName][apiName].callNum = 1;
              context[mapName][apiName].callOrigin = matchImportItem.origin;
              context[mapName][apiName].callFiles = {};
              context[mapName][apiName].callFiles[filePath] = {};
              context[mapName][apiName].callFiles[filePath].projectName = projectName;
              context[mapName][apiName].callFiles[filePath].httpRepo = httpRepo;
              context[mapName][apiName].callFiles[filePath].lines = [];
              context[mapName][apiName].callFiles[filePath].lines.push(line);
          } else {
              context[mapName][apiName].callNum++;
              if (!Object.keys(context[mapName][apiName].callFiles).includes(filePath)) {
                  context[mapName][apiName].callFiles[filePath] = {};
                  context[mapName][apiName].callFiles[filePath].projectName = projectName;
                  context[mapName][apiName].callFiles[filePath].httpRepo = httpRepo;
                  context[mapName][apiName].callFiles[filePath].lines = [];
                  context[mapName][apiName].callFiles[filePath].lines.push(line);
              }else{
                  context[mapName][apiName].callFiles[filePath].lines.push(line);
              }
          }
          return true;                                                                                 // true: 命中规则, 终止执行后序插件
      }catch(e){
          // console.log(e);
          const info = {
              projectName: projectName,
              matchImportItem: matchImportItem,
              apiName: apiName,
              httpRepo: httpRepo + filePath.split('&')[1] + '#L' + line,
              file: filePath.split('&')[1],
              line: line,
              stack: e.stack
          };
          context.addDiagnosisInfo(info);
          return false;                                                                               // false: 插件执行报错, 继续执行后序插件
      }
  }

  // 返回分析Node节点的函数
  return {
      mapName: mapName,
      checkFun: isApiCheck,
      afterHook: null
  };
}