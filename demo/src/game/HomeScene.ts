class HomeScene extends rose.MainModule {

    constructor() {
        super();
    }

    init(): void {
        console.log(`模块${this.id}`);
    }

    show() {
        super.show();

        const topMask = new egret.Shape();
        topMask.graphics.beginFill(0x0090a0, 1);
        topMask.graphics.drawRect(0, 200, 100, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        topMask.touchEnabled = true;
        this.addChild(topMask);

        const colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = 600 - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = `主模块${this.id}`;
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        colorLabel.touchEnabled = true;
        this.addChild(colorLabel);

        colorLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            rose.ModuleMgr.start(moduleId.shop).then(() => {
                console.log('子模块加载完成 SubTest');
            });
        }, this);
    }
}

rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, () => {
    //主模块配置
    const moduleCfgItem = new rose.ModuleCfgItem(moduleId.home);
    moduleCfgItem.isSubModule = false;
    moduleCfgItem.targetClass = HomeScene;
    rose.ModuleMgr.registerModule(moduleCfgItem);
});
