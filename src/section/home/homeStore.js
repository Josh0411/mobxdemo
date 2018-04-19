
import { observable, action, computed } from 'mobx';




export default class homeStore {
    @observable dataList = [];
    @observable title = 'hahahah';
    @observable age = 10;

    @observable info = {
        name: 'testname',
        tile: 'testtile'
    };

    

    @action
    changeTitle(newTitle) {
        this.title = newTitle;
    }

    @action
    addItem({ name, value }) {
        this.dataList.push({ name, value });
    }

    @computed get counts() {
        return this.dataList.length;
    }

    @computed get ageValue() {
        return this.age;
    }

    set ageValue(value) {
        return this.age = value;
    }

    @action
    changeStore ({title, age}) {
        this.title = title;
        this.age = age;
    }

    @action
    updateInfo ({name}) {
        this.info.name = name;
    }


}
