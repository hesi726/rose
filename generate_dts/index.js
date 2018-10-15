/**
 * 爬虫获取页面左侧导航，每一个链接就是一个 api 说明
 * 获取所有的 ".chapter a" 元素的 href 属性保存到 allUrlArr
 * 遍历 allUrlArr 所有 url 获取网页分析数据 '#book-search-results'
 * h3 标签为 api 随后的 p 标签为这个 api 的描述
 * h4 为参数说明
 * 
 * 
 */
const fs = require('fs');
const { URL } = require('url');
const https = require('https');
const xml2js = require('xml2js');
const cheerio = require('cheerio');

/** 抓取的 url*/
const grabUrl = 'https://developers.weixin.qq.com/minigame/dev/api/render/canvas/wx.createCanvas.html';

/** 参考 url*/
const referUrl = 'https://developers.weixin.qq.com/minigame/dev/api/render/canvas/';

/** 输出路径*/
const outPath = './publish/wx_mini_game.d.ts';

/**
 * 根据 url 获取网页内容
 * @param {string} url 
 * @return {Promise<string>}
 */
const getContentByUrl = async (url) => {

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let html = '';

            res.setEncoding('utf-8');

            res.on('data', (chunk) => {
                html += chunk;
            });

            res.on('end', () => {
                resolve(html);
            });

            res.on('error', (err) => {
                reject(err);
            });
        });
    });
}

/** 保存文件到本地*/
const saveFile = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf-8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

/**
 * 判断类型 
 * 基本类型 number、string、boolean
 * 复杂类型 array、object、function、class
 * @param judgeStr string Canvas.toTempFilePath(Object object)
 */
const judgeType = (judgeStr) => {

}

const tempUrlArrPath = './temp/tempurl.json';
/** @type {Array<string>}*/
const allUrlArr = [];
const getAllUrl = async () => {
    console.log('>>>getAllUrl');
    let html = await getContentByUrl(grabUrl);

    const $ = cheerio.load(html);

    $(".chapter a").each((index, el) => {
        const href = $(el).attr('href');
        const urlObj = new URL(href, referUrl);

        if (allUrlArr.indexOf(urlObj.href) === -1) {
            allUrlArr.push(urlObj.href);
        }
    });

    await saveFile(tempUrlArrPath, JSON.stringify(allUrlArr));//保存
}

/** 保存api描述的路径*/
const tempAPIdesPath = './temp/tempAPIdes.json';
/** 
 * api描述的原始数据
 * @type {Array<string>}
*/
const APIDescribe = [];
/** 获取原始数据*/
const getOriginalAPIDescribe = async () => {
    console.log('>>>getOriginalAPIDescribe');
    let concurrency = [];//并发控制

    const keep = async (url) => {
        let html = await getContentByUrl(url);
        const $ = cheerio.load(html);
        let des = $('#book-search-results').html();
        APIDescribe.push(des);
    }

    for (let i = 0, l = allUrlArr.length; i < 10; i++) {
        concurrency.push(keep(allUrlArr[i]));
    }

    await Promise.all(concurrency);

    await saveFile(tempAPIdesPath, JSON.stringify(APIDescribe));//保存
}

const APIDescribeJs = [];

const tempAPIDescribeJsonPath = './temp/tempAPIDescribeJson.json';
/** */
const APIDescribeToJson = async () => {
    console.log('>>>APIDescribeToJson');
    const parser = new xml2js.Parser();

    abi = APIDescribe.splice(0, 2);

    console.log('>>>输出内容',abi[0]);

    const xml2jsParser = (str) => {
        console.log('>>>输出内容',str);

        parser.parseString(str, (err, res) => {
            if (!err) {
                APIDescribeJs.push(res);
                let sij = abi.pop();
                if(sij){
                    xml2jsParser(sij);
                }
            } else {
                console.log('>>>错误错误错误错误错误',err);
            }
        });
    }

    // xml2jsParser(abi.pop());

    await saveFile(tempAPIDescribeJsonPath, JSON.stringify(APIDescribeJs));//保存
}

/**
 * 存储基础数据结构
 * @type {{
 * key:{
 *  name: string, //名字
 *  type: string, //function | class | namespace
 *  parent: string, // 命名空间或属于那个类或 null
 *  API: string, //api 全称
 *  notes: string, //注释
 *  parameterList: [], //参数列表 - 递归 - 难点
 *  returnValue: string, //返回值
 *  optional: boolean, //是否可选
 *  default: 递归， //默认值
 *  theType: string // class、namespace、parameter
 * }
 * }} bodyData
 */
const bodyData = Object.create(null);

const tempbodyDataPath = './temp/tempbodyData.json';

//创建 wx 命令空间 --- 手动创建，作为例子。（不可以删除 - 网页内无法获取命名空间）
bodyData['wx'] = {
    name: 'wx',
    type: 'namespace', //function | class | namespace
    parent: null, // 命名空间或属于那个类或 null
    API: 'wx', //api 全称
    notes: '微信小游戏命名空间', //注释
    parameterList: null, //参数列表 - 递归 - 难点
    returnValue: null, //返回值
    optional: false, //是否可选
    default: null, //默认值
    theType: 'namespace' // class、namespace、parameter
}

/** 
 * 格式化数据
 * 基本类型 number、string、boolean
 * 复杂类型 array、object、function、class、namespace
 */
const formatBodyData = async () => {
    console.log('>>>formatBodyData');

    await saveFile(tempbodyDataPath, JSON.stringify(bodyData));//保存
}

/** 转换成 dts*/
const converterDTS = async () => {
    console.log('>>>converterDTS');
}

/** 开始*/
const start = (async () => {
    console.log('>>>开始获取');

    await getAllUrl();

    await getOriginalAPIDescribe();

    await APIDescribeToJson();

    await formatBodyData();

    await converterDTS();

    console.log('>>>解析完成');
})();