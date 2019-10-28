class MainTest2 extends rose.MainModule {

    constructor() {
        super();
    }

    init(): void {
        console.log(`主模块${this.id}`);
    }

    show() {
        super.show();
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x0090a0, 0.5);
        topMask.graphics.drawRect(0, 500, 600, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        const colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = `主模块${this.id}`;
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
    }
}

rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, () => {
    //主模块配置
    const moduleCfgItem = new rose.ModuleCfgItem("MainTest2");
    moduleCfgItem.isSubModule = false;
    moduleCfgItem.targetClass = MainTest2;
    rose.ModuleMgr.registerModule(moduleCfgItem);
}, null);
