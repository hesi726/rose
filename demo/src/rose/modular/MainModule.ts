namespace rose {

    /**
     * 
     * 子模块
     */
    export class MainModule extends eui.UILayer implements IModuleBase {

        id: string;

        isSubModule = false;

        /**
         * 事件
         */
        emitter: EventEmitter;

        /**
         * 模块参数
         */
        moduleParam: IModuleParam;

        constructor() {
            super();
            this._initProp();
        };

        protected _initProp(): void {
            this.emitter = new EventEmitter();
        }

        init(): void {

        };

        show(): void {
            this.touchEnabled = false;
            layerMgr.initializeGameLayer(this);
        };

        close(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };

        destroy(): void {

        };
    }
}
