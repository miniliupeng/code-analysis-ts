const glob = require('glob');
const path = require('path');

// 扫描TS文件
exports.scanFileTs = function (scanPath) {
  const tsFiles = glob.sync(
    path.join(process.cwd(), `${scanPath}/**/*.{ts,tsx}`)
  );
  return tsFiles;
};
