class SubTest extends rose.SubModule {

    init(): void {
        console.log(`子模块${this.id}`);
    }

    show() {
        super.show();
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0xa090a0, 0.5);
        topMask.graphics.drawRect(0, 400, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        const colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = `子模块${this.id}`;
        colorLabel.size = 24;
        colorLabel.x = 80;
        colorLabel.y = 100;
        this.addChild(colorLabel);

        setTimeout(() => {
            rose.ModuleMgr.start('MainTest2').then(() => {
                console.log('获取完成');
                console.log(rose.ModuleMgr.getAllModule());
            });
        }, 5 * 1000);
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
