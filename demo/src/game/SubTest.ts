class SubTest extends rose.SubModule {

    init(): void {
        console.log(`子模块${this.id}`);
        this.isPlayEffect = true;
        this.popupEffect = rose.dialogShowEaseBackOut;
        this.closeEffect = rose.dialogCloseDefault;
    }

    show() {
        super.show();

        // subTestData.registerByKey("skillBook", (obj) => {
        //     console.log("数据输出", obj);
        // }, this);

        // let topMask = new eui.Rect();
        // topMask.graphics.beginFill(0xa090a0, 1);
        // topMask.graphics.drawRect(0, 0, 500, 500);
        // topMask.graphics.endFill();
        // this.addChild(topMask);

        // const colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = 600 - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = `子模块${this.id}`;
        // colorLabel.size = 24;
        // colorLabel.x = 80;
        // colorLabel.y = 100;
        // this.addChild(colorLabel);
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
    const moduleCfgItem = new rose.ModuleCfgItem("SubTest");
    moduleCfgItem.targetClass = SubTest;
    rose.ModuleMgr.registerModule(moduleCfgItem);

}, null);
