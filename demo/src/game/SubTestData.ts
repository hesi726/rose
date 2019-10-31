class SubTestDataVo {
    age: number
    name: string
    city: string
    skillBook: {
        bai: 90
    }
}

class SubTestData extends rose.Proxy<SubTestDataVo>{

    public myAge: number;

    init(): void {
        super.init();
        const d = new SubTestDataVo();
        d.age = 1;
        d.city = 'beijing';
        d.name = 'pony';
        this.setData(d);
    }
}

const subTestData = new SubTestData();
