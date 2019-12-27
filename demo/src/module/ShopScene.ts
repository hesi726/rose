class ShopScene extends rose.SubModule {

    init(): void {
        console.log(`子模块${this.id}`);
        this.isPlayEffect = true;
        this.popupEffect = rose.dialogShowEaseBackOut;
        this.closeEffect = rose.dialogCloseDefault;
    }

    onEnterStage(): void {
        if (typeof wx === 'undefined') return;

        wx.getSystemInfo({
            success: function (res?: wx.systemInfo): void {
                console.log("微信小游戏手机信息", res.brand);
            },
            fail: function (err) {
                console.log(err)
            },
            complete: function (res) {
                console.log(res)
            }
        })
    }

    _afterAnalysisSkin(): void {
        console.log('解析皮肤后', this.skinNameIdentify);
    }
}

rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, () => {
    //子模块配置
    const moduleCfgItem = new rose.ModuleCfgItem(moduleId.shop);
    moduleCfgItem.targetClass = ShopScene;
    rose.ModuleMgr.registerModule(moduleCfgItem);
});
