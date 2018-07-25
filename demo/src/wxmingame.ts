class wxmingame {
  static createUserInfoBtn() {
    console.log('获取信息按钮');
    
    let button = wx.createUserInfoButton({
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
    return new Promise((resolve, reject) => {
      //点击获取
      button.onTap((res) => {
        resolve(res);
      });
    });
  }
}