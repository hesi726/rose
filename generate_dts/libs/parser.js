var https = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var url = "https://mp.weixin.qq.com/debug/wxagame/dev/document/report/wx.gameLogoutReport.html";

var itemsCount = 0;
var items = [];

function getContent (url) {
	startRequest(url);
}

function startRequest (url) {
	https.get(url, function (res) {
		var html = '';

		res.setEncoding('utf-8');

		res.on('data', function (chunk) {
			html += chunk;
		});

		res.on('end', function () {
			var $ = cheerio.load(html);

			var titleh3 = $('.markdown-section h3').text().trim();
			var comment = $('.markdown-section h3').next().text().trim();

			//var dotPos = titleh3.indexOf(".");
			var bracketPos = titleh3.indexOf("(");
			var isFuc = bracketPos > 0;
			var belongTo, fucName, outputType, titleMain, mainPos, inputStr, inputs = [];
			if (isFuc) {
				titleMain = titleh3.match(/[a-zA-Z\.]*\(/)[0];//主体部分
				mainPos = titleh3.indexOf(titleMain);//主体部分位置
				outputType = titleh3.substring(0, mainPos - 1);//输出类型
				var dotPos = titleMain.indexOf(".");
				if (dotPos > 0) {
					belongTo = titleMain.substring(0, dotPos);
					fucName = titleMain.substring(dotPos + 1, titleMain.length - 1);//函数名称
				} else {
					belongTo = "window";
					fucName = titleMain.substring(0, titleMain.length - 1);//函数名称
				}

				inputStr = titleh3.match(/\(.*\)/)[0].replace("\(","").replace("\)","");
				if (inputStr.length > 0) {
					var inputArr = inputStr.split(',');
					for (var i = 0; i < inputArr.length; i++) {
						var inputArrItem = inputArr[i];
						var helpArr = inputArrItem.trim().split(' ');
						inputs.push({
							inputType: helpArr[0],
							inputName: helpArr[1]
						})
					}
				}
			}
			//console.log(outputType, belongTo, fucName, inputStr, inputs);
			var namespaceName, className, interfaceName;
			if (belongTo == 'wx' || belongTo == 'window') {
				namespaceName = belongTo;
			} else {
				className = belongTo;
			}
			var item = {
				isMethod: isFuc,
				namespaceName: namespaceName || "",
				className: className || "",
				interfaceName: interfaceName || "",
				name: fucName || "",
				input: inputs || null,
				outputType: outputType || "void",
				comment: comment || "",
				url: url
			}

			//console.log(item);

			items.push(item);

			nextUrl = $('a.navigation.navigation-prev ').attr('href');
			if (nextUrl.indexOf('..\/') < 0) {
				nextUrl = url.substring(0, lastIndexAt(url, '\/', 1) + 1) + nextUrl;
			} else if (nextUrl.indexOf('..\/..\/') < 0) {
				nextUrl = url.substring(0, lastIndexAt(url, '\/', 2) + 1) + nextUrl.substring(3);
			} else if (nextUrl.indexOf('..\/..\/..\/') < 0) {
				nextUrl = url.substring(0, lastIndexAt(url, '\/', 3) + 1) + nextUrl.substring(6);
			} else {
				nextUrl = url.substring(0, lastIndexAt(url, '\/', 4) + 1) + nextUrl.substring(9);
			}

			saveContent(++itemsCount, item);

			console.log(itemsCount);

			if (nextUrl.indexOf("https:\/\/mp.weixin.qq.com\/debug\/wxagame\/dev\/document\/") >= 0) {
				nextUrl = encodeURI(nextUrl);
				startRequest(nextUrl);
			}
			
		});
	}).on('error', function (err) {
		console.log(err);
	});
}

function lastIndexAt(str, x,n) {
	for (var i = 0; i < n; i++) {
		var ind = str.lastIndexOf(x);
		if (ind < 0) break;
		str = str.substring(0, ind);
	}
	return ind;
}

function saveContent (c, j) {
	var x = JSON.stringify(j) + ',\n';
	if (c == 1) {
		fs.writeFile('output\/ast.json', x, 'utf-8', function(err) {
			if (err) console.log(err);
		});
	} else {
		fs.appendFile('output\/ast.json', x, 'utf-8', function(err) {
			if (err) console.log(err);
		})
	}
}

getContent(url);
