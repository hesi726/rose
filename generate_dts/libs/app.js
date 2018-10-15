const fs = require("fs");

var dom = require('dts-dom');

const utils = require("./utils/utils");

// 配置文件
const config = {
  testOutput: './output/wx_mini_game.d.json',
  inputUrl: './input/search_index0413.json',
  outputUrl: './output/wx_mini_game.d.ts'
}

/**
 * 存储所有 body
 * 结构:
 * {key:{name:string,type:string,parent:string,API:string,notes:string,parameterList:[{},{}],returnValue:}}
 * 
 */
const bodyData = Object.create(null);

const readCall = (err, data) => {
  if (err) {
    return console.error(err);
  }

  const sourcejOSN = JSON.parse(data.toString());
  const store = sourcejOSN.store;

  for (let key in store) {
    let substance = store[key];
    let body/** string body*/ = substance['body'];
    formatBody(body);
  }
  startWrite();
}

const formatBody = (format) => {
  let pos = utils.findStrPos(format, '\n', 2);
  let noteAndApi = (format.slice(0, pos)).split('\n');
  let argContent = format.slice(pos);
  let API = noteAndApi[0];
  let notes = noteAndApi[1];
  let obj = Object.create(null);//{name:string,type:string,parent:string,API:string,notes:string,parameterList:[{},{}],returnValue:}
  obj['notes'] = notes;//注释
  obj['name'] = utils.fromAPIgetName(API);//名字
  obj['API'] = API;//API
  obj['type'] = utils.judgeType(API);//type 类型
  obj['parent'] = utils.fromAPIgetBelongers(API);//归属者 
  obj['parameterList'] = utils.getParameters(API, argContent, obj['type']);//参数列表 
  obj['returnValue'] = utils.fromAPIgetReturn(API);//返回值 
  bodyData[API] = obj;
}

/** bodyData 数据，一次性写入 并清理覆盖文件内容*/
const startWrite = () => {
  let constArr = [], result = '';

  for (let key in bodyData) {
    let parentStr = bodyData[key]['parent'];
    if (!(parentStr === '')) {
      let isrepeat = true;
      for (let i = 0, l = constArr.length; i < l; i++) {
        if (constArr[i] === parentStr) isrepeat = false;
      }
      isrepeat ? constArr.push(parentStr) : null;
    } else {
      if (bodyData[key]['type'] === "function") {
        let name = (bodyData[key]['name']).slice((bodyData[key]['name']).indexOf(".") + 1);
        let parameterList = [];
        let returnValue = bodyData[key]['returnValue'];
        if (returnValue == "" || returnValue == " ") {
          returnValue = 'void';
        }
        for (let i = 0, l = bodyData[key]['parameterList'].length; i < l; i++) {
          let name = bodyData[key]['parameterList'][i]['name'];
          let type = bodyData[key]['parameterList'][i]['type'];
          if (name != "" || type != "") {
            parameterList.push(dom.create.parameter(name, type));
          }
        }
        let func = dom.create.function(name, parameterList, returnValue);
        func.jsDocComment = bodyData[key]['notes'];
        result += dom.emit(func);
      }
      if (bodyData[key]['type'] === "object") {
        // let name = (bodyData[key]['name']).slice((bodyData[key]['name']).indexOf(".") + 1);
        // let parameterList = [];
        // let returnValue = bodyData[key]['returnValue'];
        // if (returnValue == "" || returnValue == " ") {
        //   returnValue = 'void';
        // }
        // for (let i = 0, l = bodyData[key]['parameterList'].length; i < l; i++) {
        //   let name = bodyData[key]['parameterList'][i]['name'];
        //   let type = bodyData[key]['parameterList'][i]['type'];
        //   if (name != "" || type != "") {
        //     parameterList.push(dom.create.parameter(name, type));
        //   }
        // }
        // let func = dom.create.function(name, parameterList, returnValue);
        // func.jsDocComment = bodyData[key]['notes'];
        // result += dom.emit(func);
      }
    }
  }

  for (let i = 0, l = constArr.length; i < l; i++) {
    // let constStr = dom.create.const(constArr[i], "string");
    let classStr = dom.create.interface(constArr[i]);
    // let objType = dom.create.objectType([]);
    for (let key in bodyData) {
      if (bodyData[key]['parent'] === constArr[i]) {
        if (bodyData[key]['type'] === "function") {
          let name = (bodyData[key]['name']).slice((bodyData[key]['name']).indexOf(".") + 1);
          let parameterList = [];
          let returnValue = bodyData[key]['returnValue'];
          if (returnValue == "" || returnValue == " ") {
            returnValue = 'void';
          }
          for (let i = 0, l = bodyData[key]['parameterList'].length; i < l; i++) {
            let name = bodyData[key]['parameterList'][i]['name'];
            let type = bodyData[key]['parameterList'][i]['type'];
            if (name != "" || type != "") {
              parameterList.push(dom.create.parameter(name, type));
            }
          }
          let func = dom.create.method(name, parameterList, returnValue);
          func.jsDocComment = bodyData[key]['notes'];
          classStr.members.push(func);
          // objType.members.push(func);
          // result += dom.emit(func);
        }

        if (bodyData[key]['type'] === "object") {

        }
      }
    }
    result += dom.emit(classStr);
  }

  fs.readFile('./input/extra.d.ts', (err, data) => {
    result += `\n`+ data.toString();
    result = result.replace('interface wx','const wx:');
    result = result.replace('string|object','string|Object');
    fs.writeFile(config.outputUrl, result, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(config.outputUrl, "生成成功！");
    });
  });
}

/**开始 */
fs.readFile(config.inputUrl, readCall);