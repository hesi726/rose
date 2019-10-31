class MainTest extends rose.MainModule {

    constructor() {
        super();
    }

    init(): void {
        console.log(`主模块${this.id}`);
    }

    show() {
        super.show();
        const topMask = new egret.Shape();
        topMask.graphics.beginFill(0x0090a0, 0.5);
        topMask.graphics.drawRect(0, 200, 600, 172);
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

        subTestData.init();

        setTimeout(() => {
            rose.ModuleMgr.start('SubTest').then(() => {
                console.log('子模块加载完成 SubTest');
                console.log(rose.ModuleMgr.getAllModule());

                subTestData.setValueAndNotify("skillBook", <any>{
                    bai: 100
                });
            });

            rose.ModuleMgr.start('SubTest2').then(() => {
                console.log('子模块加载完成 SubTest2');
                console.log(rose.ModuleMgr.getAllModule());
            });

        }, 3 * 1000);
    }
}

rose.gameEventChannel.once(rose.GameEventChannel.AFTER_CONFIG, () => {
    //主模块配置
    const moduleCfgItem = new rose.ModuleCfgItem("MainTest");
    moduleCfgItem.isSubModule = false;
    moduleCfgItem.targetClass = MainTest;
    rose.ModuleMgr.registerModule(moduleCfgItem);

}, null);
