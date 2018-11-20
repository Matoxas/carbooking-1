// čia bus mašinų store'as
import { observable, action, computed, autorun } from "mobx";
import axios from "axios";
import baseUrl from "../rootConfig";
axios.defaults.baseURL = baseUrl;

class CarStore {
  @observable
  loading = true;
  @observable
  cars = [];

  @observable
  currentCar = {};

  // FILTERS OF CARS LIST

  @observable
  filters = {
    brand: "",
    model: "",
    location: "",
    date_from: "",
    date_until: "",
    price_from: "",
    price_until: ""
  };

  brands = [];
  @observable
  models = [];
  @observable
  cities = [];

  // TEST FUNCTIONS

  @action
  test = object => {
    console.log(object);
  };

  // var disposer = autorun(() => console.log(this.cities));

  // ==================== GETTERS ====================

  // @action
  // getFilteredCars = () => {
  //   this.setLoading(true);
  //   axios
  //     .put("cars/filter", this.filters)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => console.log(error.response));
  // };

  @action
  getAllCars = () => {
    this.setLoading(true);
    axios
      .put("cars", this.filters)
      .then(response => {
        this.setCars(response.data.data);
        this.setLoading(false);
      })
      .catch(error => console.log(error.response));
  };

  @action
  getBrands = () => {
    this.setLoading(true);
    axios
      .get("brands")
      .then(response => {
        this.setBrands(response.data.data);
        this.setLoading(false);
      })
      .catch(error => console.log(error.response));
  };

  @action
  GetCar = id => {
    this.currentCar = this.cars.find(car => {
      return car.id == id;
    });
  };

  @action
  getModels = id => {
    this.setLoading(true);
    axios
      .get("/models/" + id)
      .then(response => {
        this.setModels(response.data.data);
        this.setLoading(false);
      })
      .catch(error => console.log(error.response));
  };

  @action
  getCities = () => {
    this.setLoading(true);
    axios
      .get("/cities/")
      .then(response => {
        this.setCities(response.data.data);
        this.setLoading(false);
      })
      .catch(error => console.log(error.response));
  };

  // ==================== SETTERS ====================

  @action
  setCars = list => {
    this.cars = list;
  };

  @action
  setBrands = list => {
    this.brands = list;
  };

  @action
  setLoading = value => {
    this.loading = value;
  };

  @action
  setModels = value => {
    this.models = value;
  };

  @action
  setCities = value => {
    this.cities = value;
  };

  @action
  setFilters = filters => {
    this.filters = { ...this.filters, ...filters };
  };

  // ==================== COMPUTED PROPERTIES ====================
  // @computed
  // get getFilters() {
  //   console.log("computed changed");
  //   return {
  //     location_id: this.city,
  //     brand: this.brand,
  //     models: this.models,
  //     price_from: this.price_from,
  //     price_to: this.price_to,
  //     date_from: this.date.from,
  //     date_until: this.date.until
  //   };
  // }
}
const store = new CarStore();
export default store;
