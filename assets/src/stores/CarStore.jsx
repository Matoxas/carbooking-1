// čia bus mašinų store'as
import { observable, action, computed } from "mobx";

class CarStore {
  @observable
  cars = [];
  @observable
  brands = [];
  @observable
  models = [];
  @observable
  filter = {
    location: "Visi",
    brand: "Visi",
    models: ["Visi"],
    price_from: 0,
    price_to: 99
  };

  @action
  addCar = car => {
    this.cars.push(car);
  };

  @action
  setCars = list => {
    this.cars = [
      {
        brand: "BMW",
        subbrand: "X5",
        image:
          "https://photos.motorcar.com/used-2011-bmw-x5-35ipremium-9754-16488845-1-640.jpg",
        price: "25.49"
      },
      {
        brand: "Audi",
        subbrand: "A3",
        image:
          "https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/audi-a3-tfsi-cod-red-1200x800-%281%29.jpg",
        price: "49.99"
      },
      {
        brand: "Volkswagen",
        subbrand: "Passat",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/2015_Volkswagen_Passat_%283G_MY16%29_132TSI_station_wagon_%282015-11-11%29_01.jpg/1200px-2015_Volkswagen_Passat_%283G_MY16%29_132TSI_station_wagon_%282015-11-11%29_01.jpg",
        price: "49.99"
      }
    ];
  };

  @computed
  get carsCount() {
    return this.cars.length;
  }
}

const store = new CarStore();
export default store;
