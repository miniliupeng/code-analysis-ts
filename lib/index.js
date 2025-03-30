const path = require('path');
const CodeAnalysis = require(path.join(__dirname, './analysis'));
// 新建分析实例
const coderTask = new CodeAnalysis();
// 执行代码分析
coderTask._scanCode([
  {
    name: 'test',
    path: ['src']
  }
]);
