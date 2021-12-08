import PubSub from './Event';

class Controller {
    pubSub: PubSub;

    constructor() {
        this.pubSub = new PubSub();
        this.pubSub.$on('newDataAvailable', this.updateGrid);
    }

    updateGrid(data: unknown) {
        if (data) {
            this.addGridRow(data);
            this.updateCounter(data);
        }
    }

    addGridRow(data: unknown) {
        console.log("update grid component with" + data);
    }

    updateCounter(data: unknown) {
        console.log("data last updated at: " + this.getCurrentTime() + " with " + data);
    }

    getCurrentTime() {
        const date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDay(),
            t = date.toLocaleDateString();
        return y + '/' + m + '/' + d + ' ' + t;
    }
}

export default Controller;