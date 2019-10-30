var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var rose;
(function (rose) {
    /**
     * 基于 eui.Component 的 Dialog
     *
     * 对应的 eui 皮肤命名应为 类名 + "Skin"
     * @author Created by pony on 2019/01/01.
     */
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            var _this = _super.call(this) || this;
            /** 是否居中弹*/
            _this.popupCenter = true;
            /** 容器标识*/
            _this._containerName = 'dlg';
            _this._initProp();
            return _this;
        }
        ;
        Dialog.prototype._initProp = function () {
            this.emitter = new EventEmitter();
            this.once(egret.Event.ADDED_TO_STAGE, this.onEnterStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onExitStage, this);
            // this.popupEffect = ;
            // this.closeEffect = ;
        };
        Dialog.prototype.init = function () {
        };
        ;
        Dialog.prototype.show = function (showEffect) {
            if (showEffect === void 0) { showEffect = true; }
            this._showing(showEffect);
        };
        Dialog.prototype.onEnterStage = function () {
        };
        ;
        Dialog.prototype._showing = function (showEffect) {
            var _this = this;
            var complete = function () {
                _this._afterAnalysisSkin();
                if (typeof _this._container === 'undefined') {
                    _this._container = rose.layerMgr[_this._containerName];
                }
                _this._container.addChild(_this);
                if (showEffect && _this.popupEffect) {
                    _this.popupEffect.runWith(_this);
                }
                else {
                    _this._onOpened();
                }
                _this._addEvent();
            };
            this.once(egret.Event.COMPLETE, complete, this);
            if (typeof this.skinNameIdentify === 'undefined') {
                var className = MyUtil.getClassName(this);
                this.skinNameIdentify = className.slice(className.lastIndexOf('.') + 1) + 'Skin';
            }
            this.skinName = this.skinNameIdentify;
        };
        /**
         * 解析皮肤后、在没有添加到舞台之前
         */
        Dialog.prototype._afterAnalysisSkin = function () {
        };
        /**
         * 打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
         */
        Dialog.prototype._onOpened = function () {
        };
        /**
         * 添加事件
         */
        Dialog.prototype._addEvent = function () {
        };
        ;
        Dialog.prototype.hide = function () {
            this.close(false);
        };
        /**
         * 关闭
         * @param showEffect 是否显示关闭效果
         */
        Dialog.prototype.close = function (showEffect) {
            if (showEffect === void 0) { showEffect = true; }
            if (showEffect && this.closeEffect) {
                this.closeEffect.run();
            }
            this._removeEvent();
            this.closeHandler && this.closeHandler.run();
            this._onClosed();
            this.emitter.emit('onClose', this.id);
        };
        Dialog.prototype.onExitStage = function () {
        };
        ;
        Dialog.prototype.destroy = function () {
            this.emitter.emit('onDestroy', this.id);
        };
        ;
        /**
         * 关闭完成后，调用此方法(回收、移除事件等方法). <br/>
         *（如果有关闭动画，则在动画完成后执行，如有 closeHandler 方法调用 closeHandler 后）
         */
        Dialog.prototype._onClosed = function () {
        };
        /**
         * 移除事件
         * @private
         */
        Dialog.prototype._removeEvent = function () {
        };
        ;
        /**
         * Brings a Dialog to the top.
         */
        Dialog.prototype.bringToTop = function () {
        };
        ;
        /**
         * Sends a Dialog to the back.
         */
        Dialog.prototype.sendToBack = function () {
        };
        ;
        return Dialog;
    }(eui.Component));
    rose.Dialog = Dialog;
    __reflect(Dialog.prototype, "rose.Dialog");
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 数据代理，控制类
     */
    var Proxy = (function () {
        function Proxy() {
            this._initProp();
        }
        Object.defineProperty(Proxy.prototype, "autoNotify", {
            get: function () { return this._autoNotify; },
            set: function (isAuto) { this._autoNotify = isAuto; },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        /**
         *
         * @override
         */
        Proxy.prototype._initProp = function () {
            this._autoNotify = true;
            this.autoNotifyAll = false;
            this.emitter = new EventEmitter();
        };
        Proxy.prototype.init = function () {
            this.isInit = true;
        };
        Proxy.prototype.isAutoNotify = function () {
            return this._autoNotify;
        };
        Proxy.prototype.setData = function (data) {
            this.data = data;
            return this;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        /**
         *
         * @param key
         * @param value
         */
        Proxy.prototype.setValueAndNotify = function (key, value) {
            this.data[key] = value;
            if (!this._autoNotify) {
                return;
            }
            var notifyData;
            if (Array.isArray(value)) {
                notifyData = value.slice();
            }
            else if (typeof value === 'object') {
                notifyData = Object.assign({}, value);
            }
            else {
                notifyData = value;
            }
            this.notifyEvent(Proxy.CHANGE_DATA_KEY + key, notifyData);
            if (this.autoNotifyAll) {
                this.notifyEvent(Proxy.CHANGE_DATA, this.getData());
            }
        };
        ;
        Proxy.prototype.notifyEvent = function (eventName, args) {
            if (!this._autoNotify) {
                return;
            }
            if (args) {
                this.emitter.emit(eventName, args);
                return;
            }
            this.emitter.emit(eventName);
        };
        Proxy.prototype.getValue = function (key) {
            //考虑引用类型问题，外部不可更改
            return this.data[key];
        };
        ;
        Proxy.prototype.getAll = function () {
            var results = {};
            return results;
        };
        ;
        Proxy.prototype.register = function (selector, ctx) {
            this.emitter.on(Proxy.CHANGE_DATA, selector, ctx);
        };
        ;
        Proxy.prototype.unregister = function (selector, ctx) {
            this.emitter.off(Proxy.CHANGE_DATA, selector, ctx, false);
        };
        ;
        Proxy.prototype.registerByKey = function (key, selector, ctx) {
            this.emitter.on(Proxy.CHANGE_DATA_KEY + key, selector, ctx);
        };
        ;
        Proxy.prototype.unregisterByKey = function (key, selector, ctx) {
            this.emitter.off(Proxy.CHANGE_DATA_KEY + key, selector, ctx, false);
        };
        ;
        Proxy.prototype.unregisterAll = function () {
            this.emitter.removeAllListeners();
        };
        ;
        Proxy.prototype.destroy = function () {
            this.unregisterAll();
        };
        ;
        Proxy.RESET_DATA = 'reset_data';
        //默认不进行通知，由于性能原因，尽可能的不要除监听所有数据变化，尽量数据拆分详细
        Proxy.CHANGE_DATA = 'change_data';
        Proxy.CHANGE_DATA_KEY = 'change_data_';
        return Proxy;
    }());
    rose.Proxy = Proxy;
    __reflect(Proxy.prototype, "rose.Proxy", ["rose.IProxy"]);
})(rose || (rose = {}));
var rose;
(function (rose) {
    var GameEventChannel = (function (_super) {
        __extends(GameEventChannel, _super);
        function GameEventChannel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameEventChannel.AFTER_CONFIG = "afterConfig";
        GameEventChannel.AFTER_MAIN = "afterMain";
        return GameEventChannel;
    }(EventEmitter));
    rose.GameEventChannel = GameEventChannel;
    __reflect(GameEventChannel.prototype, "rose.GameEventChannel");
    rose.gameEventChannel = new GameEventChannel();
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 子模块
     */
    var MainModule = (function (_super) {
        __extends(MainModule, _super);
        function MainModule() {
            var _this = _super.call(this) || this;
            _this.isSubModule = false;
            _this._initProp();
            return _this;
        }
        ;
        MainModule.prototype._initProp = function () {
            this.emitter = new EventEmitter();
            this.once(egret.Event.ADDED_TO_STAGE, this.onEnterStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onExitStage, this);
        };
        MainModule.prototype.init = function () {
        };
        ;
        MainModule.prototype.show = function () {
            this.touchEnabled = false;
            rose.layerMgr.initializeGameLayer(this);
        };
        ;
        MainModule.prototype.onEnterStage = function () {
        };
        ;
        MainModule.prototype.close = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        ;
        MainModule.prototype.onExitStage = function () {
        };
        ;
        MainModule.prototype.destroy = function () {
        };
        ;
        return MainModule;
    }(eui.UILayer));
    rose.MainModule = MainModule;
    __reflect(MainModule.prototype, "rose.MainModule", ["rose.IModuleBase"]);
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 加载模块样式枚举
     * @author Created by pony on 2019/01/01.
     */
    var LoadingModuleTypeEnum;
    (function (LoadingModuleTypeEnum) {
        LoadingModuleTypeEnum[LoadingModuleTypeEnum["EMPTY"] = 0] = "EMPTY";
        LoadingModuleTypeEnum[LoadingModuleTypeEnum["CIRCLE"] = 1] = "CIRCLE";
        LoadingModuleTypeEnum[LoadingModuleTypeEnum["ARMATURE"] = 2] = "ARMATURE";
    })(LoadingModuleTypeEnum = rose.LoadingModuleTypeEnum || (rose.LoadingModuleTypeEnum = {}));
    /** 验证模块处理函数*/
    rose._validModuleFunc = function () { return true; };
    /** 找不到模块处理函数*/
    rose._moduleNotFoundFunc = function (modName) { return console.error(modName + "\u6A21\u5757\u672A\u6CE8\u518C"); };
    /**
     * 登记模块处理函数
     * @param fn
     */
    function registerValidModuleFunc(fn) {
        rose._validModuleFunc = fn;
    }
    rose.registerValidModuleFunc = registerValidModuleFunc;
    ;
    /**
     * 登记找不到模块处理函数
     * @param fn
     */
    function registerModuleNotFoundFunc(fn) {
        rose._moduleNotFoundFunc = fn;
    }
    rose.registerModuleNotFoundFunc = registerModuleNotFoundFunc;
    ;
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 子模块
     */
    var SubModule = (function (_super) {
        __extends(SubModule, _super);
        function SubModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isSubModule = true;
            return _this;
        }
        return SubModule;
    }(rose.Dialog));
    rose.SubModule = SubModule;
    __reflect(SubModule.prototype, "rose.SubModule", ["rose.IModuleBase"]);
})(rose || (rose = {}));
var rose;
(function (rose) {
    rose.TimerEventChannel = new EventEmitter();
})(rose || (rose = {}));
var SubTest2 = (function (_super) {
    __extends(SubTest2, _super);
    function SubTest2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubTest2.prototype.init = function () {
        console.log("\u5B50\u6A21\u5757" + this.id);
    };
    SubTest2.prototype.show = function () {
        _super.prototype.show.call(this);
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0xa990a4, 0.5);
        topMask.graphics.drawRect(0, 400, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 133;
        this.addChild(topMask);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "\u5B50\u6A21\u5757" + this.id;
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 180;
        this.addChild(colorLabel);
        subTestData.registerByKey("age", function (a) {
            colorLabel.text = "\u6570\u636E\u53D8\u5316\u4E3A" + a;
        }, this);
    };
    return SubTest2;
}(rose.SubModule));
__reflect(SubTest2.prototype, "SubTest2");
rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, function () {
    //子模块配置
    var moduleCfgItem = new rose.ModuleCfgItem("SubTest2");
    moduleCfgItem.targetClass = SubTest2;
    rose.ModuleMgr.registerModule(moduleCfgItem);
}, null);
var SubTestDataVo = (function () {
    function SubTestDataVo() {
    }
    return SubTestDataVo;
}());
__reflect(SubTestDataVo.prototype, "SubTestDataVo");
var SubTestData = (function (_super) {
    __extends(SubTestData, _super);
    function SubTestData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubTestData.prototype.init = function () {
        _super.prototype.init.call(this);
        var d = new SubTestDataVo();
        d.age = 1;
        d.city = 'beijing';
        d.name = 'pony';
        this.setData(d);
    };
    return SubTestData;
}(rose.Proxy));
__reflect(SubTestData.prototype, "SubTestData");
var subTestData = new SubTestData();
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var rose;
(function (rose) {
    /** 该 api 只保留了在 h5 端常用方法 */
    /**
     * 下一个主循环执行一次。
     * 这个和nodejs不同的是，多了执行回调的上下文和传参。
     * @param cb
     * @param ctx
     */
    function nextTick(cb, ctx) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.callLater(function () {
            cb.apply(ctx, args);
        }, null);
    }
    rose.nextTick = nextTick;
    ;
})(rose || (rose = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var rose;
(function (rose) {
    /**
     *
     * 目前简易实现，后续优化
     */
    //============================================================
    var staticData = {};
    var configKey = [];
    function addDc(dcModule, dataCfg) { }
    ;
    function getData(dcModule, key) { }
    ;
    function registerDcParser(type, parser, ctx) { }
    ;
    /**
     * 添加一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function addJSON(fileName, dataCfg) {
        staticData[fileName] = dataCfg;
        configKey.push(fileName);
    }
    rose.addJSON = addJSON;
    ;
    /**
     * 获取一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function getJSONWithFileName(fileName) {
        return staticData[fileName];
    }
    rose.getJSONWithFileName = getJSONWithFileName;
    ;
    /**
     * 获取一个json文件中某个id的单条信息
     * @param fileName
     * @param id
     * @returns {Object}
     */
    function getJSONWithFileNameAndID(fileName, id) {
        var jsonData = getJSONWithFileName(fileName);
        if (jsonData && jsonData.hasOwnProperty(id)) {
            return jsonData[id];
        }
        return console.error("亲," + fileName + " 文件木有这个ID：" + id), null;
    }
    rose.getJSONWithFileNameAndID = getJSONWithFileNameAndID;
    ;
})(rose || (rose = {}));
// namespace rose {
//     interface IEvents {
//         [evt: string]: Array<EE>;
//     }
//     /**
//      * 事件接口
//      */
//     export interface IEventEmitter {
//         _events: IEvents;
//         _eventsCount: number;
//         eventNames(): Array<string>;
//         listeners(evt: string): Array<Function>;
//         listenerCount(evt: string): number;
//         emit(evt: string, ...args): boolean;
//         on(event: string, fn: Function, context: any): IEventEmitter;
//         once(event: string, fn: Function, context: any): IEventEmitter;
//         removeListener(evt: string, fn: Function, context: any, once: boolean): IEventEmitter;
//         removeAllListeners(event?: string): IEventEmitter;
//         off(evt: string, fn: Function, context: any, once: boolean): IEventEmitter;
//         addListener(event: string, fn: Function, context: any): IEventEmitter;
//     }
//     class EE {
//         public fn: Function;
//         public context: any;
//         public once: boolean;
//         constructor(fn: Function, context: any, once: boolean) {
//             this.fn = fn;
//             this.context = context;
//             this.once = once;
//         }
//     }
//     /**
//      * Add a listener for a given event.
//      * @private
//      */
//     function addListener(emitter: IEventEmitter, evt: string, fn: Function, context: any = null, once = false): IEventEmitter {
//         const listener = new EE(fn, context || emitter, once);
//         if (!Array.isArray(emitter._events[evt])) {
//             emitter._events[evt] = [];
//             emitter._eventsCount++;
//         }
//         emitter._events[evt].push(listener);
//         return emitter;
//     }
//     /**
//      * Clear event by name.
//      *
//      * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
//      * @param {(String)} evt The Event name.
//      * @private
//      */
//     function clearEvent(emitter: EventEmitter, evt: string) {
//         if (--emitter._eventsCount === 0) {
//             emitter._events = {};
//         } else {
//             delete emitter._events[evt];
//         }
//     }
//     export class EventEmitter implements IEventEmitter {
//         public _events: IEvents;
//         public _eventsCount: number;
//         constructor() {
//             this._events = {};
//             this._eventsCount = 0;
//         }
//         /**
//          * Return an array listing the events for which the emitter has registered
//          * listeners.
//          *
//          * @returns {Array<string>}
//          * @public
//          */
//         eventNames(): Array<string> {
//             let names: Array<string> = [];
//             const events = this._events;
//             if (this._eventsCount === 0) return names;
//             names = Object.keys(events);
//             return names;
//         };
//         /**
//          * Return the listeners registered for a given event.
//          *
//          * @param {String} evt The event name.
//          * @returns {Array<Function>} The registered listeners.
//          * @public
//          */
//         listeners(evt: string): Array<Function> {
//             const handlers = this._events[evt];
//             if (!handlers) return [];
//             const ee = [];
//             for (let i = 0, l = handlers.length; i < l; i++) {
//                 ee[i] = handlers[i].fn;
//             }
//             return ee;
//         };
//         /**
//          * Return the number of listeners listening to a given event.
//          *
//          * @param {(String|Symbol)} event The event name.
//          * @returns {Number} The number of listeners.
//          * @public
//          */
//         listenerCount(evt: string): number {
//             const listeners = this._events[evt];
//             if (!listeners) return 0;
//             return listeners.length;
//         };
//         /**
//          * Calls each of the listeners registered for a given event.
//          *
//          * @param {string} event The event name.
//          * @returns {Boolean} `true` if the event had listeners, else `false`.
//          * @public
//          */
//         emit(evt: string, ...args): boolean {
//             if (!this._events[evt]) return false;
//             const listeners = this._events[evt];
//             const length = listeners.length;
//             for (let i = 0; i < length; i++) {
//                 if (listeners[i].once) {
//                     this.removeListener(evt, listeners[i].fn, listeners[i].context, true);
//                 }
//                 listeners[i].fn.apply(listeners[i].context, args);
//             }
//             return true;
//         };
//         /**
//           * Add a listener for a given event.
//           *
//           * @param {(String|Symbol)} event The event name.
//           * @param {Function} fn The listener function.
//           * @param {*} [context=this] The context to invoke the listener with.
//           * @returns {EventEmitter} `this`.
//           * @public
//           */
//         on(event: string, fn: Function, context: any): IEventEmitter {
//             return addListener(this, event, fn, context, false);
//         };
//         /**
//           * Add a one-time listener for a given event.
//           *
//           * @param {(String|Symbol)} event The event name.
//           * @param {Function} fn The listener function.
//           * @param {*} [context=this] The context to invoke the listener with.
//           * @returns {EventEmitter} `this`.
//           * @public
//           */
//         once(event: string, fn: Function, context: any): IEventEmitter {
//             return addListener(this, event, fn, context, true);
//         };
//         /**
//          * Remove the listeners of a given event.
//          *
//          * @param {(String|Symbol)} event The event name.
//          * @param {Function} fn Only remove the listeners that match this function.
//          * @param {*} context Only remove the listeners that have this context.
//          * @param {Boolean} once Only remove one-time listeners.
//          * @returns {EventEmitter} `this`.
//          * @public
//          */
//         removeListener(evt: string, fn: Function, context: any, once: boolean): IEventEmitter {
//             if (!this._events[evt]) return this;
//             if (!fn) {
//                 clearEvent(this, evt);
//                 return this;
//             }
//             const listeners = this._events[evt];
//             for (var i = 0, events = [], length = listeners.length; i < length; i++) {
//                 if (
//                     listeners[i].fn !== fn ||
//                     (once && !listeners[i].once) ||
//                     (context && listeners[i].context !== context)
//                 ) {
//                     events.push(listeners[i]);
//                 }
//             }
//             if (events.length) {
//                 this._events[evt] = events;
//             } else {
//                 clearEvent(this, evt);
//             }
//             return this;
//         };
//         /**
//          * Remove all listeners, or those of the specified event.
//          *
//          * @param {(String)} [event] The event name.
//          * @returns {EventEmitter} `this`.
//          * @public
//          */
//         removeAllListeners(event?: string): IEventEmitter {
//             if (event) {
//                 if (this._events[event]) clearEvent(this, event);
//             } else {
//                 this._events = {};
//                 this._eventsCount = 0;
//             }
//             return this;
//         };
//         /**
//          * Alias methods names because people roll like that.
//          * 
//          * @param evt 
//          * @param fn 
//          * @param context 
//          * @param once 
//          */
//         off(evt: string, fn: Function, context: any, once = false): IEventEmitter {
//             return this.removeListener(evt, fn, context, once);
//         }
//         addListener(event: string, fn: Function, context: any): IEventEmitter {
//             return this.on(event, fn, context);
//         }
//     }
// }
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        rose.gameEventChannel.emit(rose.GameEventChannel.AFTER_CONFIG);
        rose.layerMgr.gameStage = this.stage;
        rose.layerMgr.initializeInfoLayer();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        rose.layerMgr.clearBag();
        rose.ModuleMgr.start('MainTest');
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var rose;
(function (rose) {
    rose.InputEventChannel = new EventEmitter();
})(rose || (rose = {}));
var rose;
(function (rose) {
    rose.NetEventChannel = new EventEmitter();
})(rose || (rose = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var rose;
(function (rose) {
    /**
     * 层级管理
     * @author Created by peony on 2017/3/02.
     */
    var LayerManager = (function () {
        function LayerManager() {
        }
        /** 初始化*/
        LayerManager.prototype.initializeInfoLayer = function () {
            this._infoLayer_ = new eui.UILayer();
            this._infoLayer_.touchEnabled = false;
            this._infoLayer_.name = 'infoLayer_';
            this._gameStage.addChild(this._infoLayer_);
            this._msgLayer = new eui.UILayer();
            this._msgLayer.touchEnabled = false;
            this._msgLayer.name = 'msgLayer';
            this._infoLayer_.addChild(this._msgLayer);
            this._guideLayer = new eui.UILayer();
            this._guideLayer.touchEnabled = false;
            this._guideLayer.name = 'guideLayer';
            this._infoLayer_.addChild(this._guideLayer);
            // _topLayer 层禁止触摸交互
            this._topLayer = new eui.UILayer();
            this._topLayer.touchEnabled = false;
            this._topLayer.touchChildren = false;
            this._topLayer.name = 'topLayer';
            this._infoLayer_.addChild(this._topLayer);
        };
        /** 初始化*/
        LayerManager.prototype.initializeGameLayer = function (layer) {
            this._gameLayer_ = layer;
            this._gameLayer_.name = '_gameLayer_';
            this._gameStage.addChildAt(this._gameLayer_, 0);
            this._sceneLayer = new eui.UILayer();
            this._sceneLayer.touchEnabled = false;
            this._sceneLayer.name = 'sceneLayer';
            this._gameLayer_.addChild(this._sceneLayer);
            this._menuLayer = new eui.UILayer();
            this._menuLayer.touchEnabled = false;
            this._menuLayer.name = 'menuLayer';
            this._gameLayer_.addChild(this._menuLayer);
            this._dlgLayer = new eui.UILayer();
            this._dlgLayer.touchEnabled = false;
            this._dlgLayer.name = 'dlgLayer';
            this._gameLayer_.addChild(this._dlgLayer);
        };
        /**
         *
         * 清理舞台上 _gameLayer_ 和 _infoLayer_ 以外的显示对象
         */
        LayerManager.prototype.clearBag = function () {
            if (this._gameStage) {
                this._gameStage.removeChildren();
                if (this._gameLayer_) {
                    this._gameStage.addChild(this._gameLayer_);
                }
                if (this._infoLayer_) {
                    this._gameStage.addChild(this._infoLayer_);
                }
            }
        };
        Object.defineProperty(LayerManager.prototype, "gameStage", {
            get: function () {
                return this._gameStage;
            },
            set: function (stage) {
                this._gameStage = stage;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(LayerManager.prototype, "scene", {
            get: function () {
                return this._sceneLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "menu", {
            get: function () {
                return this._menuLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "dlg", {
            get: function () {
                return this._dlgLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "msg", {
            get: function () {
                return this._msgLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "guide", {
            get: function () {
                return this._guideLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "top", {
            get: function () {
                return this._topLayer;
            },
            enumerable: true,
            configurable: true
        });
        return LayerManager;
    }());
    __reflect(LayerManager.prototype, "LayerManager");
    rose.layerMgr = new LayerManager();
})(rose || (rose = {}));
var MainTest = (function (_super) {
    __extends(MainTest, _super);
    function MainTest() {
        return _super.call(this) || this;
    }
    MainTest.prototype.init = function () {
        console.log("\u4E3B\u6A21\u5757" + this.id);
    };
    MainTest.prototype.show = function () {
        _super.prototype.show.call(this);
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x0090a0, 0.5);
        topMask.graphics.drawRect(0, 200, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "\u4E3B\u6A21\u5757" + this.id;
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        subTestData.init();
        setTimeout(function () {
            rose.ModuleMgr.start('SubTest').then(function () {
                console.log('子模块加载完成 SubTest');
                console.log(rose.ModuleMgr.getAllModule());
            });
            rose.ModuleMgr.start('SubTest2').then(function () {
                console.log('子模块加载完成 SubTest2');
                console.log(rose.ModuleMgr.getAllModule());
            });
        }, 3 * 1000);
    };
    return MainTest;
}(rose.MainModule));
__reflect(MainTest.prototype, "MainTest");
rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, function () {
    //主模块配置
    var moduleCfgItem = new rose.ModuleCfgItem("MainTest");
    moduleCfgItem.isSubModule = false;
    moduleCfgItem.targetClass = MainTest;
    rose.ModuleMgr.registerModule(moduleCfgItem);
}, null);
var rose;
(function (rose) {
    /**
     *
     * 模块配置项
     * @author Created by pony on 2019/01/01.
     */
    var ModuleCfgItem = (function () {
        function ModuleCfgItem(id) {
            this.id = id;
            this.isHideUnder = false;
            this.isSubModule = true;
            this.loadingType = rose.LoadingModuleTypeEnum.EMPTY;
            this.notOwnRes = false;
            this.onValid = function () { return true; }; //默认
        }
        return ModuleCfgItem;
    }());
    rose.ModuleCfgItem = ModuleCfgItem;
    __reflect(ModuleCfgItem.prototype, "rose.ModuleCfgItem", ["rose.IModuleCfgItem"]);
})(rose || (rose = {}));
var MainTest2 = (function (_super) {
    __extends(MainTest2, _super);
    function MainTest2() {
        return _super.call(this) || this;
    }
    MainTest2.prototype.init = function () {
        console.log("\u4E3B\u6A21\u5757" + this.id);
    };
    MainTest2.prototype.show = function () {
        _super.prototype.show.call(this);
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x0090a0, 0.5);
        topMask.graphics.drawRect(0, 500, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "\u4E3B\u6A21\u5757" + this.id;
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
    };
    return MainTest2;
}(rose.MainModule));
__reflect(MainTest2.prototype, "MainTest2");
rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, function () {
    //主模块配置
    var moduleCfgItem = new rose.ModuleCfgItem("MainTest2");
    moduleCfgItem.isSubModule = false;
    moduleCfgItem.targetClass = MainTest2;
    rose.ModuleMgr.registerModule(moduleCfgItem);
}, null);
var rose;
(function (rose) {
    /**
     *
     * 模块管理、实现
     * @author Created by pony on 2019/01/01.
     */
    var ModuleManager = (function () {
        function ModuleManager() {
            this.moduleConfig = {};
            this.modules = [];
            this.loadingClassMap = {};
        }
        ModuleManager.prototype.registerLoadingClass = function (type, LoadingLayerClass) {
            this.loadingClassMap[type] = LoadingLayerClass;
            return true; //暂时处理
        };
        ;
        ModuleManager.prototype.start = function (id, moduleParam) {
            var _this = this;
            if (moduleParam === void 0) { moduleParam = { fromWhere: 'empty' }; }
            return new Promise(function (resolve, reject) {
                var newModuleCfgItem = _this._getModuleCfgItem(id);
                //找不到模块
                if (typeof newModuleCfgItem === 'undefined') {
                    rose._moduleNotFoundFunc(name);
                    reject({
                        c: -1,
                        t: '未找到模块'
                    });
                    return;
                }
                //统一模块验证
                if (!rose._validModuleFunc(newModuleCfgItem, moduleParam)) {
                    reject({
                        c: -2,
                        t: '统一模块验证失败'
                    });
                    return;
                }
                ;
                //验证模块
                if (!newModuleCfgItem.onValid(moduleParam)) {
                    reject({
                        c: -3,
                        t: '模块验证失败'
                    });
                    return;
                }
                var loadingClass = _this.loadingClassMap[newModuleCfgItem.loadingType];
                if (typeof loadingClass === 'undefined') {
                    console.error('加载页未注册');
                    reject({
                        c: -4,
                        t: '加载页未找到'
                    });
                    return;
                }
                ;
                var loading = new loadingClass();
                loading.show();
                var isSubModule = newModuleCfgItem.isSubModule;
                var isHideUnder = newModuleCfgItem.isHideUnder;
                //数组的第一个元素一定是主模块，后期优化
                //先取出主模块，再操作
                var mainModule = _this.modules.shift();
                if (isHideUnder && !isSubModule) {
                    _this._destroyModule(mainModule);
                }
                var newModule = new newModuleCfgItem.targetClass();
                newModule.id = id;
                newModule.moduleParam = moduleParam;
                newModule.init();
                newModule.show();
                if (!isHideUnder && !isSubModule) {
                    _this._destroyModule(mainModule);
                }
                if (isSubModule) {
                    _this.modules.unshift(mainModule);
                    newModule.emitter.once("onClose", _this._onCloseHandle, _this); //监听关闭事件，关闭后在模块中移除
                }
                _this.modules.push(newModule);
                loading.hide();
                resolve(); //成功加载
            });
        };
        ;
        ModuleManager.prototype._destroyModule = function (mainModule) {
            if (typeof mainModule !== 'undefined') {
                var subModule = this.modules;
                for (var i = subModule.length - 1; i >= 0; i--) {
                    subModule[i].destroy();
                }
                mainModule.close();
                mainModule.destroy();
                this.modules = [];
            }
            ;
        };
        //关闭子模块时处理
        ModuleManager.prototype._onCloseHandle = function (moduleId) {
            var index = this._getModuleIndexById(moduleId);
            if (index > -1) {
                var subModule = this.modules.splice(index, 1).shift();
                subModule.destroy(); //后期配置是否缓存
            }
        };
        ModuleManager.prototype._getModuleIndexById = function (moduleId) {
            for (var i = 0, l = this.modules.length; i < l; i++) {
                if (this.modules[i].id === moduleId) {
                    return i;
                }
            }
            return -1;
        };
        ModuleManager.prototype._getModuleCfgItem = function (id) {
            return this.moduleConfig[id];
        };
        ModuleManager.prototype.popModule = function () {
        };
        ;
        /**
         * 获取所有模块
         * 这个接口仅供调试使用
         * 注意获取的是克隆后的所有模块，外部修改不会影响
         */
        ModuleManager.prototype.getAllModule = function () {
            return this.modules.slice();
        };
        ModuleManager.prototype.registerModule = function (moduleCfgItem) {
            this.moduleConfig[moduleCfgItem.id] = moduleCfgItem;
            return true;
        };
        ;
        return ModuleManager;
    }());
    __reflect(ModuleManager.prototype, "ModuleManager", ["rose.IModuleManager"]);
    /**
     *
     * 全局模块管理
     * @author Created by pony on 2019/01/01.
     */
    rose.ModuleMgr = new ModuleManager();
    //暂时处理
    rose.ModuleMgr.registerLoadingClass(rose.LoadingModuleTypeEnum.EMPTY, (function () {
        function class_1() {
        }
        class_1.prototype.show = function () { };
        class_1.prototype.hide = function () { };
        return class_1;
    }()));
})(rose || (rose = {}));
var SubTest = (function (_super) {
    __extends(SubTest, _super);
    function SubTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubTest.prototype.init = function () {
        console.log("\u5B50\u6A21\u5757" + this.id);
    };
    SubTest.prototype.show = function () {
        _super.prototype.show.call(this);
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0xa090a0, 0.5);
        topMask.graphics.drawRect(0, 400, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "\u5B50\u6A21\u5757" + this.id;
        colorLabel.size = 24;
        colorLabel.x = 80;
        colorLabel.y = 100;
        this.addChild(colorLabel);
        setTimeout(function () {
            // rose.ModuleMgr.start('MainTest2').then(() => {
            //     console.log('获取完成');
            //     console.log(rose.ModuleMgr.getAllModule());
            // });
            subTestData.setValueAndNotify('age', 20);
        }, 5 * 1000);
    };
    SubTest.prototype.onEnterStage = function () {
        wx.getSystemInfo({
            success: function (res) {
                console.log("微信小游戏手机信息", res.brand);
            },
            fail: function (err) {
                console.log(err);
            },
            complete: function (res) {
                console.log(res);
            }
        });
    };
    SubTest.prototype._afterAnalysisSkin = function () {
        console.log('解析皮肤后', this.skinNameIdentify);
    };
    return SubTest;
}(rose.SubModule));
__reflect(SubTest.prototype, "SubTest");
rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, function () {
    //子模块配置
    var moduleCfgItem = new rose.ModuleCfgItem("SubTest");
    moduleCfgItem.targetClass = SubTest;
    rose.ModuleMgr.registerModule(moduleCfgItem);
}, null);
var net;
(function (net) {
    var HttpRequestInfo = (function () {
        function HttpRequestInfo() {
        }
        return HttpRequestInfo;
    }());
    net.HttpRequestInfo = HttpRequestInfo;
    __reflect(HttpRequestInfo.prototype, "net.HttpRequestInfo", ["net.IHttpRequestInfo"]);
})(net || (net = {}));
var net;
(function (net) {
    /**
     * get 请求，命名 request
     * post 请求格式有 json、FormData，命名 post4Json post4FormData
     *
     * 为完成功能
     *   添加设置头
     *   post4FormData 请求方法
     */
    var HttpServer = (function () {
        function HttpServer() {
            this._initProp();
        }
        HttpServer.prototype._initProp = function () {
            this._requestIdCounter = 1;
            this._waitingRequestMap = {};
        };
        ;
        /**
         * get 请求
         * @param route
         * @param args
         * @param cb
         * @param ctx
         */
        HttpServer.prototype.request = function (route, args, cb, ctx) {
            var requestInfo = this._getRequestInfo(route, args, cb, ctx);
            this._waitingRequestMap[requestInfo.requestId] = requestInfo;
            this._requestHttpGet(requestInfo);
        };
        ;
        HttpServer.prototype._requestHttpGet = function (requestInfo) {
            var _this = this;
            var route = requestInfo.route;
            var args = requestInfo.args;
            var httpUrl = this._httpUrl + route + '?';
            for (var key in args) {
                httpUrl += key + '=' + args[key] + '&';
            }
            httpUrl = httpUrl.substring(0, httpUrl.lastIndexOf('&'));
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT; //默认值
            request.open(httpUrl, egret.HttpMethod.GET);
            request.once(egret.Event.COMPLETE, function (evt) {
                var result = evt.currentTarget;
                var response = result.response;
                _this._handleRequestResult(requestInfo, response);
            }, this);
            request.once(egret.IOErrorEvent.IO_ERROR, function (evt) {
                logger.error(route, ">>>", evt.type, evt.currentTarget);
                _this._handleRequestError(requestInfo, evt);
            }, this);
            request.send();
        };
        /**
         * json 格式 post 请求
         * @param route
         * @param args
         * @param cb
         * @param ctx
         */
        HttpServer.prototype.post4Json = function (route, args, cb, ctx) {
            var requestInfo = this._getRequestInfo(route, args, cb, ctx);
            this._waitingRequestMap[requestInfo.requestId] = requestInfo;
            this._requestPost4Json(requestInfo);
        };
        HttpServer.prototype._requestPost4Json = function (requestInfo) {
            var _this = this;
            var route = requestInfo.route;
            var args = requestInfo.args;
            var httpUrl = this._httpUrl + route;
            var request = new egret.HttpRequest();
            request.setRequestHeader("Content-Type", "application/json");
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(httpUrl, egret.HttpMethod.POST);
            request.once(egret.Event.COMPLETE, function (evt) {
                var result = evt.currentTarget;
                var response = result.response;
                _this._handleRequestResult(requestInfo, response);
            }, this);
            request.once(egret.IOErrorEvent.IO_ERROR, function (evt) {
                logger.error(route, ">>>", evt.type, evt.currentTarget);
                _this._handleRequestError(requestInfo, evt);
            }, this);
            request.send(args);
        };
        ;
        HttpServer.prototype._getRequestInfo = function (route, args, cb, ctx) {
            var requestId = this._requestIdCounter++;
            var requestInfo = new net.HttpRequestInfo();
            requestInfo.requestId = requestId;
            requestInfo.route = route;
            requestInfo.args = args;
            requestInfo.cb = cb;
            requestInfo.ctx = ctx;
            return requestInfo;
        };
        /**
         * 处理请求结果
         * @param requestInfo
         * @param result
         */
        HttpServer.prototype._handleRequestResult = function (requestInfo, result) {
            var requestId = requestInfo.requestId;
            var cb = requestInfo.cb;
            var ctx = requestInfo.ctx;
            cb.call(ctx, null, result); //第一个参数为错误
            delete this._waitingRequestMap[requestId]; //从等待中移除
        };
        ;
        /**
         *
         * @param evt
         */
        HttpServer.prototype._handleRequestError = function (requestInfo, errInfo) {
            var requestId = requestInfo.requestId;
            var cb = requestInfo.cb;
            var ctx = requestInfo.ctx;
            cb.call(ctx, new Error(errInfo.type), null);
            delete this._waitingRequestMap[requestId];
        };
        ;
        HttpServer.prototype.reset = function () {
            this._waitingRequestMap = {}; //清空缓存的请求
            this._requestIdCounter = 1; //计数重置
        };
        ;
        HttpServer.ON_ERROR = "error";
        HttpServer.ON_CLOSE = "close";
        HttpServer.ON_KICK = "kick";
        HttpServer.ON_SUCCESS = "success";
        HttpServer.ON_ROUTE_ERROR = "resultError";
        HttpServer.ON_ROUTE_SUCCESS = "resultSuccess";
        return HttpServer;
    }());
    net.HttpServer = HttpServer;
    __reflect(HttpServer.prototype, "net.HttpServer");
})(net || (net = {}));
var utils;
(function (utils) {
    /**
    * 解析 URL 中参数。
    * 要获取的 key 中不允许有 '=',value 中可以正常解析。如果没有 value 默认为 “0”。<br/>
    * @return {{ [index: string]: string }} 包含URL参数的键值对对象。
    * @author Created by pony on 2019/01/01.
    */
    utils.getUrlParams = function () {
        var params = {};
        var url = window.location.href;
        var idx = url.indexOf('?');
        if (idx === -1) {
            return params;
        }
        var queryStr = url.substring(idx + 1);
        var args = queryStr.split('&');
        for (var i = 0, l = args.length; i < l; i++) {
            var str = args[i];
            var keyIdx = str.indexOf('=');
            if (keyIdx === -1) {
                //没有 value 时，添加一个默认值
                params[str] = '0';
                continue;
            }
            var key = str.substring(0, keyIdx);
            var value = str.substring(keyIdx + 1);
            params[key] = value;
        }
        return params;
    };
})(utils || (utils = {}));
/**
 * 显示对象类工具
 * @author Created by pony on 2019/01/01.
 */
var DisplayUtil;
(function (DisplayUtil) {
    /** 删除显示对象、显示对象必须有父级容器*/
    function removeFromParent(disObj) {
        disObj && disObj.parent && disObj.parent.removeChild(disObj);
    }
    DisplayUtil.removeFromParent = removeFromParent;
    function removeAllChildren(disContainer) {
        while (disContainer.numChildren > 0) {
            disContainer.removeChildAt(0);
        }
    }
    DisplayUtil.removeAllChildren = removeAllChildren;
    /** 创建满屏遮罩*/
    function createMaskFull(color, alpha, isTouch) {
        if (isTouch === void 0) { isTouch = true; }
        return createMask(color, alpha, 750, 1336, isTouch); //后期优化取实际宽高
    }
    DisplayUtil.createMaskFull = createMaskFull;
    /** 创建遮罩*/
    function createMask(color, alpha, w, h, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        var rt = new eui.Rect(w, h, color);
        rt.alpha = alpha;
        rt.touchEnabled = isTouch;
        return rt;
    }
    DisplayUtil.createMask = createMask;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    DisplayUtil.createBitmapByName = createBitmapByName;
})(DisplayUtil || (DisplayUtil = {}));
var GeomUtil;
(function (GeomUtil) {
    var R_T_D = 180 / Math.PI;
    var D_T_R = Math.PI / 180;
    /** 弧度转度*/
    GeomUtil.radiansToDegrees = function (radian) { return radian * R_T_D; };
    /** 度转弧度*/
    GeomUtil.degreesToRadians = function (deg) { return deg * D_T_R; };
    /** 根据向量转换角度*/
    GeomUtil.pointAngle = function (strat, end) {
        return Math.atan2(end.y - strat.y, end.x - strat.x) * R_T_D;
    };
    /** 根据向量转换弧度*/
    GeomUtil.pointRadians = function (strat, end) {
        return Math.atan2(end.y - strat.y, end.x - strat.x);
    };
    GeomUtil.angleToSpeed = function (t) {
        var i = t * D_T_R;
        return new egret.Point(Math.cos(i), Math.sin(i));
    };
    /** 距离*/
    GeomUtil.measureDistance = function (p1, p2) {
        return Math.sqrt((p1.x - (p2.x)) * (p1.x - (p2.x)) + (p1.y - (p2.y)) * (p1.y - (p2.y)));
    };
    function radiansToSpeed(e) { return new egret.Point(Math.cos(e), Math.sin(e)); }
    GeomUtil.radiansToSpeed = radiansToSpeed;
    function angleSpeed(e, t) {
        var i = Math.atan2(t.y - e.y, t.x - e.x);
        return new egret.Point(Math.cos(i), Math.sin(i));
    }
    GeomUtil.angleSpeed = angleSpeed;
    function getCirclePoint(t, i, n) { var s = i * D_T_R; return t.add(new egret.Point(Math.cos(s) * n, Math.sin(s) * n)); }
    GeomUtil.getCirclePoint = getCirclePoint;
    function getCirclePoint2(e, t, i) { return e.add(new egret.Point(Math.cos(t) * i, Math.sin(t) * i)); }
    GeomUtil.getCirclePoint2 = getCirclePoint2;
    function getBezierY(e, t) {
        if (void 0 === t && (t = 0), 0 > e || e > 1)
            return 0;
        if (0 > t || t > 1)
            return 0;
        var i = .5 - Math.sqrt((1 - t) / 4);
        var n = e * (1 - i) + i;
        return 4 * (n - .5) * (n - .5) - 1;
    }
    GeomUtil.getBezierY = getBezierY;
})(GeomUtil || (GeomUtil = {}));
var utils;
(function (utils) {
    /**
     * <p><code>Handler</code> 是事件处理器类。</p>
     * <p>推荐使用 Handler.create() 方法从对象池创建，减少对象创建消耗。<br/>
     * 创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，<br/>
     * 回收后不要再使用此对象，否则会导致不可预料的错误。</p>
     */
    var Handler = (function () {
        /**
         * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
         * @param	caller 执行域。
         * @param	method 处理函数。
         * @param	args 函数参数。
         * @param	once 是否只执行一次。
         */
        function Handler(caller, method, args, once) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (args === void 0) { args = null; }
            if (once === void 0) { once = false; }
            /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
            this.once = false;
            this._id = 0;
            this.setTo(caller, method, args, once);
        }
        /**
         * 设置此对象的指定属性值。
         * @param	caller 执行域(this)。
         * @param	method 回调方法。
         * @param	args 携带的参数。
         * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
         * @return  返回 handler 本身。
         */
        Handler.prototype.setTo = function (caller, method, args, once) {
            this._id = Handler._gid++;
            this.caller = caller;
            this.method = method;
            this.args = args;
            this.once = once;
            return this;
        };
        /**
         * 执行处理器。
         */
        Handler.prototype.run = function () {
            if (this.method == null)
                return null;
            var id = this._id;
            var result = this.method.apply(this.caller, this.args);
            this._id === id && this.once && this.recover();
            return result;
        };
        /**
         * 执行处理器，携带额外数据。
         * @param data 附加的回调数据，可以是单数据或者Array(作为多参)。
         */
        Handler.prototype.runWith = function (data) {
            if (this.method == null)
                return null;
            var id = this._id;
            var result;
            if (typeof data === 'undefined') {
                result = this.method.apply(this.caller, this.args);
            }
            else if (!this.args && !(Array.isArray(data))) {
                result = this.method.call(this.caller, data);
            }
            else if (this.args) {
                result = this.method.apply(this.caller, this.args.concat(data));
            }
            else {
                result = this.method.apply(this.caller, data);
            }
            this._id === id && this.once && this.recover();
            return result;
        };
        /**
         * 清理对象引用。
         */
        Handler.prototype.clear = function () {
            this.caller = null;
            this.method = null;
            this.args = null;
            return this;
        };
        /**
         * 清理并回收到 Handler 对象池内。
         */
        Handler.prototype.recover = function () {
            if (this._id > 0) {
                this._id = 0;
                Handler._pool.push(this.clear());
            }
        };
        /**
         * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
         * @param	caller 执行域(this)。
         * @param	method 回调方法。
         * @param	args 携带的参数。
         * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
         * @return  返回创建的handler实例。
         */
        Handler.create = function (caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = true; }
            if (Handler._pool.length !== 0) {
                return Handler._pool.pop().setTo(caller, method, args, once);
            }
            return new Handler(caller, method, args, once);
        };
        /**@private handler对象池*/
        Handler._pool = [];
        /**@private */
        Handler._gid = 1;
        return Handler;
    }());
    utils.Handler = Handler;
    __reflect(Handler.prototype, "utils.Handler");
})(utils || (utils = {}));
var logger;
(function (logger) {
    var noop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    logger.log = console.log.bind(console);
    logger.debug = console.debug.bind(console);
    logger.info = console.info.bind(console);
    logger.warn = console.warn.bind(console);
    logger.error = console.error.bind(console);
    /** 设置日志等级*/
    function setLvl(lvl) {
        if (lvl > 1) {
            logger.log = noop;
            logger.debug = noop;
        }
        if (lvl > 2) {
            logger.info = noop;
        }
        if (lvl > 3) {
            logger.warn = noop;
        }
        if (lvl > 4) {
            logger.error = noop;
        }
    }
    logger.setLvl = setLvl;
    ;
})(logger || (logger = {}));
var MovieClipUtils = (function () {
    function MovieClipUtils() {
    }
    /**
     * @param resPath 路径
     * @param actName 动作名称
     * @param comFunc 回调函数
     * @param ctx 执行域(this)
    */
    MovieClipUtils.createMovieClip = function (resPath, actName, comFunc, ctx) {
        if (!this.depot.hasOwnProperty(resPath)) {
            var resJson = RES.getRes(resPath + "_json");
            var resPng = RES.getRes(resPath + "_png");
            if (resJson && resPng) {
                this.depot[resPath] = new egret.MovieClipDataFactory(resJson, resPng);
            }
        }
        comFunc.call(ctx, new egret.MovieClip(this.depot[resPath].generateMovieClipData(actName)));
    };
    MovieClipUtils.depot = {};
    return MovieClipUtils;
}());
__reflect(MovieClipUtils.prototype, "MovieClipUtils");
var MyUtil = (function () {
    function MyUtil() {
    }
    /**
     * 获取对象类名
     * @param target
     * @returns {any}
     */
    MyUtil.getClassName = function (target) {
        return target.__proto__.__class__;
    };
    /** 删除元素*/ //d--
    MyUtil.removeByElements = function (arr, element) {
        var index = -1;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] == element) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            arr.splice(index, 1);
        }
    };
    /** 获取百分比*/ //d--
    MyUtil.numPrecentage = function (cint, mint, countCop) {
        var value = Math.floor(cint / mint * countCop);
        if (value > countCop) {
            value = countCop;
        }
        ;
        return value;
    };
    ;
    /** 将秒转化为时分秒 */
    MyUtil.countDownStr = function (num) {
        //   conversion
        var timerStr = "";
        var h = Math.floor(num / 3600);
        timerStr = h > 0 ? h + ":" : "00:";
        var m = Math.floor((num - h * 3600) / 60);
        timerStr += m >= 10 ? "" + m + ":" : "0" + m + ":";
        var s = Math.floor((num - h * 3600 - m * 60) / 1);
        timerStr += s >= 10 ? "" + s : "0" + s;
        return timerStr;
    };
    /**
     * 给定 start 和 end 范围随机之间的整数，包括 start 和 end
     */
    MyUtil.rangeRandom = function (start, end) {
        return this.clamp(Math.floor(Math.random() * (end - start + 1) + start), start, end);
    };
    MyUtil.clamp = function (e, t, i) {
        return Math.min(Math.max(e, t), i);
    };
    return MyUtil;
}());
__reflect(MyUtil.prototype, "MyUtil");
var utils;
(function (utils) {
    var TimedTaskTicker = (function () {
        function TimedTaskTicker() {
            /**
             * @private
             * ticker 花销的时间
             */
            this.costEnterFrame = 0;
            /**
             * @private
             * 是否被暂停
             */
            this.isPaused = false;
            /**
             * @private
             */
            this.callBackList = [];
            /**
             * @private
             */
            this.thisObjectList = [];
        }
        TimedTaskTicker.prototype.startTick = function (callBack, thisObject) {
            var index = this.getTickIndex(callBack, thisObject);
            if (index != -1) {
                return;
            }
            this.concatTick();
            this.callBackList.push(callBack);
            this.thisObjectList.push(thisObject);
        };
        TimedTaskTicker.prototype.stopTick = function (callBack, thisObject) {
            var index = this.getTickIndex(callBack, thisObject);
            if (index === -1) {
                return;
            }
            this.concatTick();
            this.callBackList.splice(index, 1);
            this.thisObjectList.splice(index, 1);
        };
        /**
         * @private
         */
        TimedTaskTicker.prototype.getTickIndex = function (callBack, thisObject) {
            var callBackList = this.callBackList;
            var thisObjectList = this.thisObjectList;
            for (var i = callBackList.length - 1; i >= 0; i--) {
                if (callBackList[i] == callBack &&
                    thisObjectList[i] == thisObject) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * @private
         *
         */
        TimedTaskTicker.prototype.concatTick = function () {
            this.callBackList = this.callBackList.concat();
            this.thisObjectList = this.thisObjectList.concat();
        };
        /**
         * 暂停心跳
         */
        TimedTaskTicker.prototype.pause = function () {
            this.isPaused = true;
        };
        /**
         * 恢复心跳
         */
        TimedTaskTicker.prototype.resume = function () {
            this.isPaused = false;
        };
        /**
         * @private
         * 执行一次刷新
         */
        TimedTaskTicker.prototype.update = function () {
            var t1 = Date.now();
            var callBackList = this.callBackList;
            var thisObjectList = this.thisObjectList;
            var length = callBackList.length;
            var timeStamp = Date.now();
            if (this.isPaused)
                return;
            for (var i = 0; i < length; i++) {
                callBackList[i].call(thisObjectList[i], timeStamp);
            }
            var t2 = Date.now();
            this.costEnterFrame = t2 - t1;
        };
        return TimedTaskTicker;
    }());
    __reflect(TimedTaskTicker.prototype, "TimedTaskTicker");
    /**
    * 心跳计时器单例
    */
    utils.ticker = new TimedTaskTicker();
    /**
     * @private
     * 启动心跳计时器。
     */
    function startTimedTaskTicker(ticker) {
        window.setTimeout(loop, 1000);
        function loop() {
            ticker.update();
            window.setTimeout(loop, 1000);
        }
    }
    utils.startTimedTaskTicker = startTimedTaskTicker;
})(utils || (utils = {}));
;window.Main = Main;