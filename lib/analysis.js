const path = require('path');
const { scanFileTs } = require(path.join(__dirname, './file')); // 文件操作
const { parseTs } = require(path.join(__dirname, './parse')); // 解析ts文件

class CodeAnalysis {
  constructor() {}

  // 扫描文件
  _scanFiles(scanSource, type) {
    let entrys = [];
    scanSource.forEach((item) => {
      const entryObj = {
        name: item.name,
        httpRepo: item.httpRepo
      };
      let parse = [];
      const scanPath = item.path;
      scanPath.forEach((sitem) => {
        let tempEntry = [];
        console.log(sitem);
        
        tempEntry = scanFileTs(sitem);
        parse = parse.concat(tempEntry);
      });
      entryObj.parse = parse;
      entrys.push(entryObj);
    });
    console.log(entrys);
    return entrys;
  }

  // 扫描文件，分析代码
  _scanCode(scanSource, type) {
    let entrys = this._scanFiles(scanSource, type);
    entrys.forEach((item) => {
      const parseFiles = item.parse;
      if (parseFiles.length > 0) {
        parseFiles.forEach((element, eIndex) => {
          const { ast, checker } = parseTs(element);
          // console.log(ast);
        });
      }
    });
  }
}

module.exports = CodeAnalysis;
