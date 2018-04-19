import { observable, action, computed } from 'mobx';

export default class categoryStore {
    @observable dataList = []
    @observable title = ''

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
}