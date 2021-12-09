import vehicleFactoryType from "../inter/VihicleFactory";
import Car from "./Car";
import Truck from "./Truck";

class VehicleFactory {
    vehicleClass: new (options: vehicleFactoryType) => Car | Truck;

    constructor(options?: vehicleFactoryType) {
        this.vehicleClass = Car;
    }

    createVehicle(options: vehicleFactoryType): Car | Truck {
        if (options && options.vehicleType === "Truck") {
            this.vehicleClass = Truck;
        } else {
            this.vehicleClass = Car;
        }

        return new this.vehicleClass(options);
    }
}