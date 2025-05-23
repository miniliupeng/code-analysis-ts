var report = {
  importItemMap: { app: { callOrigin: null, callFiles: ['test&src/demo.ts'] } },
  parseErrorInfos: [],
  scoreMap: null,
  reportTitle: '依赖调用分析报告',
  analysisTime: '2025.04.23 16:49:30',
  mapNames: ['methodMap', 'typeMap', 'apiMap', 'browserMap'],
  methodMap: {
    'app.get': { callNum: 1, callOrigin: null, callFiles: { 'test&src/demo.ts': { projectName: 'test', lines: [12] } } }
  },
  typeMap: {},
  apiMap: {},
  browserMap: {
    'window.history.back': {
      callNum: 1,
      callOrigin: null,
      callFiles: { 'test&src/demo.ts': { projectName: 'test', lines: [13] } }
    }
  }
};
