namespace rose {
    /**
     * 层级管理
     * @author Created by peony on 2017/3/02.
     */
    class LayerManager {

        private _gameStage: egret.Stage;

        private _gameLayer_: eui.UILayer;
        private _sceneLayer: eui.UILayer;
        private _menuLayer: eui.UILayer;
        private _dlgLayer: eui.UILayer;

        private _infoLayer_: eui.UILayer;
        private _msgLayer: eui.UILayer;
        private _guideLayer: eui.UILayer;
        private _topLayer: eui.UILayer;

        /** 初始化*/
        initializeInfoLayer(layer: eui.UILayer): void {
            this._infoLayer_ = layer;
            this._infoLayer_.name = '_infoLayer_';
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
        }

        /** 初始化*/
        initializeGameLayer(layer: eui.UILayer): void {
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
        }

        /**
         * 
         * 清理舞台上 _gameLayer_ 和 _infoLayer_ 以外的显示对象
         */
        clearBag(): void {
            if (this._gameStage) {
                this._gameStage.removeChildren();

                if (this._gameLayer_) {
                    this._gameStage.addChild(this._gameLayer_);
                }

                if (this._infoLayer_) {
                    this._gameStage.addChild(this._infoLayer_);
                }
            }
        }

        set gameStage(stage: egret.Stage) {
            this._gameStage = stage;
        }

        get gameStage(): egret.Stage {
            return this._gameStage;
        };

        get scene() {
            return this._sceneLayer;
        }

        get menu() {
            return this._menuLayer;
        }

        get dlg() {
            return this._dlgLayer;
        }

        get msg() {
            return this._msgLayer;
        }

        get guide() {
            return this._guideLayer;
        }

        get top() {
            return this._topLayer;
        }
    }

    export const layerMgr = new LayerManager();
}
