/** 根据 API 获取名字*/
const fromAPIgetName = (api) => {
  let copyStr = api.slice(0);
  let bracketsPos = copyStr.indexOf('(');
  if (bracketsPos < 0) {
    bracketsPos = copyStr.length;
  }
  let surplus = copyStr.substr(0, bracketsPos);
  let spacePos = surplus.indexOf(' ');
  if (spacePos < 0) {
    spacePos = 0;
  } else {
    spacePos++;
  }
  return surplus.substr(spacePos, bracketsPos);
}
exports.fromAPIgetName = fromAPIgetName;


/** 
 * 根据 API 获取归属者
 * @param api string Canvas.toTempFilePath(Object object)
*/
const fromAPIgetBelongers = (api) => {
  let str = '';
  let copyStr = api.slice(0);
  let spacePos = copyStr.indexOf(' ');
  let pointPos = copyStr.lastIndexOf('.');
  if (pointPos < 0) return str;
  if (spacePos <= 0 || spacePos > pointPos) {
    spacePos = 0;
  } else {
    spacePos++;
  }
  str = copyStr.substr(spacePos, pointPos - spacePos);
  return str;
}
exports.fromAPIgetBelongers = fromAPIgetBelongers;

/**
 * 根据 API 获取返回值
 * @param {string} api string Canvas.toTempFilePath(Object object)
 * @returns {string}
 */
const fromAPIgetReturn = (api) => {
  let copyStr = api.slice(0);
  let bracketsPos = copyStr.indexOf('(');
  if (bracketsPos < 0) {
    bracketsPos = copyStr.length;
  }
  let surplus = copyStr.substr(0, bracketsPos);
  let spacePos = surplus.indexOf(' ');
  if (spacePos < 0) return "";
  surplus = surplus.substr(0, spacePos);
  if (surplus.indexOf('Array') > -1) {
    surplus = 'string[]';
  }
  if (surplus.indexOf('Promise') > -1) {
    surplus = 'Promise<Object>';
  }
  return surplus;
}
exports.fromAPIgetReturn = fromAPIgetReturn;


/** 
 * 获取参数列表
 *  @param api {string} string Canvas.toTempFilePath(Object object)
 *  @param content {string} 参数内容
 *  @param type {string} 类型 objet | function
 *  @return {Array}
*/
const getParameters = (api, content, type) => {
  let argArr = [];
  let tempParam = [];
  let tempTypes = [];
  if (type === 'function') {
    let copyStr = api.slice(0);
    let bracketsLeftPos = copyStr.indexOf('(') + 1;
    let bracketsRightPos = copyStr.indexOf(')');
    let joinArr = (copyStr.slice(bracketsLeftPos, bracketsRightPos)).split(",");
    //去除多余空格
    joinArr.forEach((value, index, arr) => {
      if (value.charAt(0) === " ") {
        arr[index] = value.substring(1);
      }
    });

    if (joinArr.length < 1) return;
    joinArr.forEach((value) => {
      let pos = value.indexOf(" ");
      if (pos > 0) {
        pos++;
      } else {
        pos = 0;
      }
      tempTypes.push(value.slice(0, pos - 1));
      tempParam.push(value.slice(pos));
    });
    tempParam.forEach((value, index, arr) => {
      let o = Object.create(null);
      o.name = value;
      if (tempTypes[index] == 'Object') {
        o.type = formObjParaList(value, content);
      } else if (tempTypes[index] == 'function') {
        o.type = '()=>void';
      } else {
        o.type = tempTypes[index];
      }
      argArr.push(o);
    });
  } else if (type === 'object') {

  }
  return argArr;
}
exports.getParameters = getParameters;


/**
 * 查找字符串第几次出现的位置
 * @param {string} str 
 * @param {string} cha 
 * @param {string} num 
 */
const findStrPos = (str, cha, num) => {
  let x = str.indexOf(cha);
  for (let i = 1; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}
exports.findStrPos = findStrPos;

// 内部方法

/**
 * 获取对象参数列表
 * @param {string} value 要查找的参数
 * @param {string} content 参考内容字符串
 * @return {string}
 */
function formObjParaList(value, content) {
  let str = '{', wrap5, wrap4, tarpos, wrap5next;
  let tar = 'Object ' + value;
  let pattern = /[\u4E00-\u9FA5]/g;
  tarpos = content.indexOf(tar);
  wrap5 = content.indexOf("\n\n\n\n\n", tarpos) + 5;
  wrap5next = content.indexOf("\n\n\n\n\n", wrap5);
  if (wrap5next < 0) wrap5next = content.length;

  // console.log(wrap5,wrap5next);
  if (wrap5 > -1) {
    arr = content.slice(wrap5, wrap5next).split('\n\n\n\n');
    for (let i = 0, l = arr.length; i < l; i++) {
      // let arrindex = arr[i].indexOf('\n\n\n\n');
      // if (arrindex > -1) {
      // if (arr[i].indexOf('\n') > -1) {
      // console.log('错误',arr[i]);
      let smallArr = arr[i].split('\n');
      if (!pattern.test(smallArr[0]) && !pattern.test(smallArr[1]) && smallArr[1]) {
        smallArr[1] = smallArr[1].replace('/', '|');
        if (smallArr[1].indexOf('Array') > -1) {
          smallArr[1] = 'any[]';
        }
        if (smallArr[1] === 'function') {
          // smallArr[1] = getFuncType(smallArr[0], content);
          smallArr[1] = '(res:any)=>void';
        }
        str += smallArr[0] + ':' + smallArr[1] + ',';
      }
      // }
      // }
    }
    str = str.slice(0, str.length - 1);
    str += '}';
    if (str.length < 2) str = '{}';
  }
  return str;
}

/**
 * 
 * @param {string} value 
 * @param {string} content 
 * @returns {string}
 */
const getFuncType = (value, content) => {
  let str = '(', wrap5, wrap4, tarpos, wrap5next;
  let tar = value + ' 回调函数';
  console.log(tar);
  let pattern = /[\u4E00-\u9FA5]/g;
  tarpos = content.indexOf(tar);
  console.log('定位', tarpos);
  if (tarpos > -1) {
    wrap5 = content.indexOf("\n\n\n\n\n", tarpos);
    wrap5next = content.indexOf("\n\n\n\n\n", wrap5 + 5);
    if (wrap5next < 0) wrap5next = content.length;
    if (wrap5 > -1) {
      arr = content.slice(wrap5, wrap5next).split('\n\n\n\n');
      console.log(arr);
      for (let i = 0, l = arr.length; i < l; i++) {
        let smallArr = arr[i].split('\n');
        console.log(smallArr[0]);
        if (!pattern.test(smallArr[0]) && !pattern.test(smallArr[1]) && smallArr[1]) {
          // smallArr[1] = smallArr[1].replace('/', '|');
          // if (smallArr[1].indexOf('Array') > -1) {
          //   smallArr[1] = '[]';
          // }
          // if (smallArr[1] === 'function') {
          //   smallArr[1] = '[]';
          // }
          str += smallArr[0] + ':' + smallArr[1] + ',';
        }
      }
      str = str.slice(0, str.length - 1);
      str += '}';
      if (str.length < 2) str = '{}';
      str = '(' + str + ')=>void';
    }
  } else {
    return '()=>void';
  }
  return str;
}
