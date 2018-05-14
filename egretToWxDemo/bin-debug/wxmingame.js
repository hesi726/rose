var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wxmingame = (function () {
    function wxmingame() {
    }
    wxmingame.createUserInfoBtn = function () {
        console.log('获取信息按钮');
        var button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        });
        button.show();
        return new Promise(function (resolve, reject) {
            //点击获取
            button.onTap(function (res) {
                resolve(res);
            });
        });
    };
    return wxmingame;
}());
__reflect(wxmingame.prototype, "wxmingame");
