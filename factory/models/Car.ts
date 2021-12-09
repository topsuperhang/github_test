import carType from '../inter/Car';

class Car {
    doors:  number;
    state: string;
    color: string;

    constructor(options?: carType) {
        this.doors = options.doors || 4;
        this.state = options.state || "brand new";
        this.color = options.color || "silver";
    }
}

export default Car;