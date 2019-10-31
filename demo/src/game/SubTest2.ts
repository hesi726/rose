class SubTest2 extends rose.SubModule {

    init(): void {
        console.log(`子模块${this.id}`);
    }

    show() {
        super.show();
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0xa990a4, 0.5);
        topMask.graphics.drawRect(0, 400, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 133;
        this.addChild(topMask);

        const colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = `子模块${this.id}`;
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 180;
        this.addChild(colorLabel);

        subTestData.registerByKey<keyof SubTestDataVo>("age", (a: number) => {
            console.log(a);
            colorLabel.text = `数据变化为${a}`;
        }, this);
    }
}

rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, () => {
    //子模块配置
    const moduleCfgItem = new rose.ModuleCfgItem("SubTest2");
    moduleCfgItem.targetClass = SubTest2;
    rose.ModuleMgr.registerModule(moduleCfgItem);

}, null);
