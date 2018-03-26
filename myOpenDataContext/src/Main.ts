class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        let imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.bgtexture = new egret.Texture();
            this.bgtexture._setBitmapData(imageLoader.data);
            this.runGame();
        }, this);
        imageLoader.load("resource/assets/panel_shop_01.png");
    }

    private bgtexture: egret.Texture;



    /**
     * 便于演示数据，这里使用家数据
     * 有关获取还有的接口参考：https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/open-data.html?t=2018323
     */
    private readonly gameData = [
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 100, time: 1000 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 101, time: 100 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 102, time: 1700 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 103, time: 1800 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 104, time: 1900 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 105, time: 1070 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 106, time: 1030 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 107, time: 1010 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 108, time: 1020 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 109, time: 1030 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 111, time: 1040 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 112, time: 1050 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 123, time: 1060 }] },
        { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 167, time: 1080 }] }
    ]

    private runGame() {
        let imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        imageLoader.load("resource/assets/panel_bg.png");
    }

    private loadCompleteHandler(event: egret.Event): void {

        let imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        let bitmap = new egret.Bitmap(texture);
        bitmap.x = (640 - 480) >> 1;
        bitmap.y = (1136 - 800) >> 1;
        this.addChild(bitmap);

        const listContainer = new egret.DisplayObjectContainer();

        const scrollView = new egret.ScrollView();
        scrollView.setContent(listContainer);
        scrollView.x = bitmap.x;
        scrollView.y = bitmap.y;
        scrollView.width = bitmap.width;
        scrollView.height = bitmap.height;
        this.addChild(scrollView);

        this.gameData.forEach(
            (value, index) => {
                let item = new egret.DisplayObjectContainer();
                item.y = index * 130;
                listContainer.addChild(item);

                let bitmap = new egret.Bitmap(this.bgtexture);
                bitmap.width = 460;
                item.addChild(bitmap);

                let nicktxt = new egret.TextField();
                nicktxt.y = 50;
                nicktxt.text = '名字:' + value.nickName;
                item.addChild(nicktxt);

                let numtxt = new egret.TextField();
                numtxt.x = 260;
                numtxt.y = 50;
                numtxt.text = '得分:' + value.data[0].score;
                item.addChild(numtxt);

            }, this);
    }
}