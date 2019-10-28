class MovieClipUtils {

	static depot = {};

	/** 
	 * @param resPath 路径
	 * @param actName 动作名称
	 * @param comFunc 回调函数
	 * @param ctx 执行域(this)
	*/
	static createMovieClip(resPath: string, actName: string, comFunc: (mc: egret.MovieClip) => void, ctx: any) {
		if (!this.depot.hasOwnProperty(resPath)) {
			let resJson = RES.getRes(resPath + "_json");
			let resPng = RES.getRes(resPath + "_png");
			if (resJson && resPng) {
				this.depot[resPath] = new egret.MovieClipDataFactory(resJson, resPng);
			}
		}
		comFunc.call(ctx, new egret.MovieClip(this.depot[resPath].generateMovieClipData(actName)));
	}

}