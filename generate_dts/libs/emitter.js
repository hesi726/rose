// var dom = require('dts-dom');
// var fs = require('fs');

// function todts() {
// 	var data = fs.readFileSync('output\/ast.json', 'utf-8');
// 	data = '[' + data + ']';
// 	data = data.replace(',\n]', ']');
// 	data = JSON.parse(data);

// 	var namespacePool = {};
// 	var classPool = {};
// 	var interfacePool = {};
	
// 	for (var i = 0; i < data.length; i++) {
// 		var item = data[i];
// 		var mthd, fuc;
// 		if (item.isMethod) {
// 			var parameters = [];
// 			for (var j = 0; j < item.input.length; j++) {
// 				parameters.push(dom.create.parameter(item.input[j].inputName, item.input[j].inputType));
// 			}
// 			mthd = dom.create.method(item.name, parameters, item.outputType, dom.DeclarationFlags.None);
// 			mthd.jsDocComment = item.comment;
// 			fuc = dom.create.function(item.name, parameters, item.outputType, dom.DeclarationFlags.None);
// 			fuc.jsDocComment = item.comment;
// 			var ns = {}, cls, itf;
// 			if (item.namespaceName != "") {
// 				var ns_cls, ns_itf;

// 				if (namespacePool[item.namespaceName]) {
// 					ns = namespacePool[item.namespaceName]
// 				} else {
// 					ns["self"] = dom.create.namespace(item.namespaceName);
// 					ns["memberList"] = {};
// 					namespacePool[item.namespaceName] = ns;
// 				}

// 				if (item.className != "") {
// 					if (ns.memberList[item.className]) {
// 						ns_cls = ns.memberList[item.className];
// 					} else {
// 						ns_cls = dom.create.class(item.className);
// 						ns.memberList[item.className] = ns_cls;
// 						ns.self.members.push(ns_cls);
// 					}
// 					ns_cls.members.push(mthd);
// 				} else if (item.interfaceName != "") {
// 					if (ns.memberList[item.interfaceName]) {
// 						ns_itf = ns.memberList[item.interfaceName];
// 					} else {
// 						ns_itf = dom.create.interface(item.interfaceName);
// 						ns.memberList[item.interfaceName] = ns_itf;
// 						ns.self.members.push(ns_itf);
// 					}
// 					ns_itf.members.push(mthd);
// 				} else {
// 					ns.self.members.push(fuc);
// 				}

// 				//console.log(dom.emit(ns.self));
// 			} else {
// 				if (item.className != "") {
// 					if (classPool[item.className]) {
// 						cls = classPool[item.className];
// 					} else {
// 						cls = dom.create.class(item.className);
// 						classPool[item.className] = cls;
// 					}
// 					cls.members.push(mthd);
// 				} else if (item.interfaceName != "") {
// 					if (interfacePool[item.interfaceName]) {
// 						itf = interfacePool[item.interfaceName];
// 					} else {
// 						itf = dom.create.interface(item.interfaceName);
// 						interfacePool[item.interfaceName] = itf;
// 					}
// 					itf.members.push(mthd);
// 				}
// 			}
// 		}
// 	}

// 	writeTodts(namespacePool, classPool, interfacePool);
// }

// function writeTodts (namespacePool, classPool, interfacePool) {
// 	fs.writeFile('output\/wx.d.ts', "", 'utf-8', function(err) {
// 		if (err) console.log(err);
// 	});
// 	for (ns in namespacePool) {
// 		var ns_ts = dom.emit(namespacePool[ns].self);
// 		//console.log(ns_ts);
// 		fs.appendFile('output\/wx.d.ts', ns_ts, 'utf-8', function(err) {
// 			if (err) console.log(err);
// 		})
// 	}
// 	for (cls in classPool) {
// 		var cls_ts = dom.emit(classPool[cls]);
// 		//console.log(cls_ts);
// 		fs.appendFile('output\/wx.d.ts', cls_ts, 'utf-8', function(err) {
// 			if (err) console.log(err);
// 		})
// 	}
// 	for (inf in interfacePool) {
// 		var itf_ts = dom.emit(interfacePool[itf]);
// 		//console.log(itf_ts);
// 		fs.appendFile('output\/wx.d.ts', itf_ts, 'utf-8', function(err) {
// 			if (err) console.log(err);
// 		})
// 	}
// }

// todts();
