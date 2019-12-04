class UserProxy extends rose.Proxy<UserDataVo>{

    initialize(): void {
        const d = new UserDataVo();
        d.age = 1;
        d.city = 'beijing';
        d.name = 'pony';
        this.setData(d);
    }
}

const userProxy = new UserProxy();
