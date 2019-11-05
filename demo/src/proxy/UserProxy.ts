class UserDataVo {
    age: number
    name: string
    city: string
    skillBook: {
        bai: 90
    }
}

class UserProxy extends rose.Proxy<UserDataVo>{

    init(): void {
        super.init();
        const d = new UserDataVo();
        d.age = 1;
        d.city = 'beijing';
        d.name = 'pony';
        this.setData(d);
    }
}

const userProxy = new UserProxy();
