namespace rose {

    //创建一个满屏 mask 
    const _createDialogMask = (isTouch = true, alpha = 0.4) => {
        const dialogMask: egret.Sprite = new egret.Sprite();
        dialogMask.graphics.beginFill(0, alpha);
        dialogMask.graphics.drawRect(0, 0, rose.layerMgr.gameStage.stageWidth, rose.layerMgr.gameStage.stageHeight);
        dialogMask.graphics.endFill();
        dialogMask.touchEnabled = isTouch;
        return dialogMask;
    }

    /**
     * 基于 eui.Component 的 Dialog 
     * 
     * 对应的 eui 皮肤命名应为 类名 + "Skin"
     * @author Created by pony on 2019/01/01.
     */
    export class Dialog extends eui.Component {

        id: string;

        /** 是否铺满*/
        public isFull = false;

        public isMask = true;
        public isClickMaskClose = true;
        public maskLayer: egret.Sprite;

        /** 是否居中*/
        public isPopupCenter = true;

        /** 皮肤标识符，默认类名字加 Skin*/
        public skinNameIdentify: any;

        /** 容器标识*/
        protected _containerName = 'dlg';

        /** 容器*/
        public _container: egret.DisplayObjectContainer;

        public emitter: EventEmitter;

        //是否播放特效
        public isPlayEffect = false;
        /** 打开特效*/
        public popupEffect: IDialogEffect;

        /** 关闭特效*/
        public closeEffect: IDialogEffect;

        /** 关闭后执行*/
        public closeHandler: () => void;

        constructor() {
            super();
            this._initProp();
        };

        protected _initProp(): void {

            this.emitter = new EventEmitter();

            this.once(egret.Event.ADDED_TO_STAGE, this.onEnterStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onExitStage, this);
        }

        init(): void {

        };

        show(): void {
            this._showing();
        }

        onEnterStage(): void {

        };

        private _showing(): void {

            if (typeof this._container === 'undefined') {
                this._container = layerMgr[this._containerName];
            }

            if (this.isFull) {
                this._filledWith();
            } else if (this.isMask) {
                this.maskLayer = _createDialogMask(this.isClickMaskClose);
                this._container.addChild(this.maskLayer);
            }

            if (!this.isFull && this.isPopupCenter) {
                this.horizontalCenter = '0';
                this.verticalCenter = '0';
            }

            const complete = () => {
                this._afterAnalysisSkin();

                this._container.addChild(this);

                if (this.isPlayEffect && this.popupEffect) {
                    this.popupEffect(this, () => { this._onOpened() });
                } else {
                    this._onOpened();
                }
            }

            this.once(egret.Event.COMPLETE, complete, this);

            if (typeof this.skinNameIdentify === 'undefined') {
                const className = CommonUtil.getClassName(this);
                this.skinNameIdentify = className.slice(className.lastIndexOf('.') + 1) + 'Skin';
            }

            this.skinName = this.skinNameIdentify;
        }

        private _filledWith(): void {
            this.top = this.bottom = this.left = this.right = 0;
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
            this._addEvent();

        }

        /**
         * 添加事件
         */
        protected _addEvent(): void {
            if (this.isMask && this.isClickMaskClose) {
                this.maskLayer.once(egret.TouchEvent.TOUCH_TAP, this.close, this);
            }
        };

        close(): void {
            const complete = () => {
                this._removeEvent();
                DisplayUtil.removeFromParent(this);
                DisplayUtil.removeFromParent(this.maskLayer);
                this.closeHandler && this.closeHandler();
                this._onClosed();
                this.emitter.emit('onClose', this.id);
            }

            if (this.isPlayEffect && this.closeEffect) {
                this.closeEffect(this, complete);
            } else {
                complete();
            }
        }

        onExitStage(): void {

        };

        destroy(): void {
            this.emitter.emit('onDestroy', this.id);
        };

		/**
		 * 关闭完成后
		 * 如果有关闭动画，则在动画完成后执行，如有 closeHandler 方法调用 closeHandler 后
		 */
        protected _onClosed(): void {

        }

        /**
		 * 移除事件
		 * @private 
		 */
        protected _removeEvent(): void {

        };

        bringToTop(): void {

        };

        sendToBack(): void {

        };
    }
}
