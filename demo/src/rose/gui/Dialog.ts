namespace rose {

    /**
     * 基于 eui.Component 的 Dialog 
     * 
     * 对应的 eui 皮肤命名应为 类名 + "Skin"
     * @author Created by pony on 2019/01/01.
     */
    export class Dialog extends eui.Component {

        id: string;

        /** 打开特效*/
        public popupEffect: utils.Handler;

        /** 关闭特效*/
        public closeEffect: utils.Handler;

        /** 关闭后执行*/
        public closeHandler: utils.Handler;

        /** 是否居中弹*/
        public popupCenter = true;

        /** 皮肤标识符，默认类名字加 Skin*/
        public skinNameIdentify: any;

        public emitter: EventEmitter;

        /**
         * 容器
         */
        public _container: egret.DisplayObjectContainer;

        /** 容器标识*/
        protected _containerName = 'dlg';

        constructor() {
            super();
            this._initProp();
        };

        protected _initProp(): void {

            this.emitter = new EventEmitter();

            // this.popupEffect = ;
            // this.closeEffect = ;
        }

        init(): void {

        };

        public show(showEffect: boolean = true): void {
            this._showing(showEffect);
        }

        private _showing(showEffect: boolean): void {

            const complete = () => {
                this._afterAnalysisSkin();

                if (typeof this._container === 'undefined') {
                    this._container = layerMgr[this._containerName];
                }
                this._container.addChild(this);

                if (showEffect && this.popupEffect) {
                    this.popupEffect.runWith(this);
                } else {
                    this._onOpened();
                }

                this._addEvent();
            }

            this.once(egret.Event.COMPLETE, complete, this);

            if (typeof this.skinNameIdentify === 'undefined') {
                const className = MyUtil.getClassName(this);
                this.skinNameIdentify = className.slice(className.lastIndexOf('.') + 1) + 'Skin';
            }

            this.skinName = this.skinNameIdentify;
        }

        /**
         * 解析皮肤后、在没有添加到舞台之前
         */
        protected _afterAnalysisSkin(): void {

        }

		/**
		 * 打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
		 */
        protected _onOpened(): void {

        }

        /**
         * 添加事件
         */
        protected _addEvent(): void {

        };

        public hide(): void {
            this.close(false);
        }

		/**
		 * 关闭
		 * @param showEffect 是否显示关闭效果
		 */
        public close(showEffect: boolean = true): void {
            if (showEffect && this.closeEffect) {
                this.closeEffect.run();
            }
            this._removeEvent();
            this.closeHandler && this.closeHandler.run();
            this._onClosed();
            this.emitter.emit('onClose', this.id);
        }

        public destroy(): void {
            this.emitter.emit('onDestroy', this.id);
        };

		/**
		 * 关闭完成后，调用此方法(回收、移除事件等方法). <br/>
		 *（如果有关闭动画，则在动画完成后执行，如有 closeHandler 方法调用 closeHandler 后）
		 */
        protected _onClosed(): void {

        }

        /**
		 * 移除事件
		 * @private 
		 */
        protected _removeEvent(): void {

        };

		/**
		 * Brings a Dialog to the top.
		 */
        public bringToTop(): void {

        };

		/**
		 * Sends a Dialog to the back.
		 */
        public sendToBack(): void {

        };
    }
}
