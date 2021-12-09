import truckType from '../inter/Truck';

class Truck {
    state: string;
    wheelSize: string;
    color: string

    constructor(options?: truckType) {
        this.state = options.state || "used";
        this.wheelSize = options.wheelSize || "large";
        this.color = options.color || "blue";
    }
}

export default Truck;