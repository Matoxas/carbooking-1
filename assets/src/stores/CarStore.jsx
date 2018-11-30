// čia bus mašinų store'as
import { observable, action, computed, autorun } from "mobx";
import axios from "axios";
import baseUrl from "../rootConfig";
axios.defaults.baseURL = baseUrl;

class CarStore {
  // GLOBAL PARAMETERS
  @observable
  loading = {
    cars: true,
    brands: false,
    models: false,
    cities: false
  };
  @observable
  showHeader = true;

  // CAR
  @observable
  cars = [];

  @observable
  currentCar = {};

  @observable
  likedCars = [];
  // FILTERS OF CARS LIST

  @observable
  filters = {
    brand: "",
    model: "",
    location: "",
    date_from: "",
    date_until: "",
    price_from: 1,
    price_until: 99,
    sort: "naujausi"
  };

  brands = [];
  @observable
  models = [];
  @observable
  cities = [];

  // ==================== GETTERS ====================

  @action
  getAllCars = () => {
    this.setLoading({ cars: true });
    axios
      .get("cars", {
        params: {
          filters: this.filters
        }
      })
      .then(response => {
        console.log(response);
        this.setCars(response.data.data);
        this.setLoading({ cars: false });
      })
      .catch(error => console.log(error.response));
  };

  @action
  getBrands = () => {
    this.setLoading({ brands: true });
    axios
      .get("brands")
      .then(response => {
        this.setBrands(response.data.data);
        this.setLoading({ brands: false });
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
    this.setLoading({ models: true });
    axios
      .get("/models/" + id)
      .then(response => {
        this.setModels(response.data.data);
        this.setLoading({ models: false });
      })
      .catch(error => console.log(error.response));
  };

  @action
  getCities = () => {
    this.setLoading({ cities: true });
    axios
      .get("/cities/")
      .then(response => {
        this.setCities(response.data.data);
        this.setLoading({ cities: false });
      })
      .catch(error => console.log(error.response));
  };

  @action
  postReservation = reservation => {
    axios
      .post("/reservations", {
        reservation
      })
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // ==================== SETTERS ====================

  @action
  toggleHeader = value => {
    this.showHeader = value;
  };

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
    this.loading = { ...this.loading, ...value };
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

  @action
  setSort = sort => {
    this.sort = sort;
  };

  @action
  setLikes = likes => {
    this.likedCars = likes;
  };

  @action
  likesToggler = id => {
    if (this.likedCars.includes(id)) {
      this.likedCars = this.likedCars.filter(like => like != id);
    } else {
      this.likedCars = [...this.likedCars, id];
    }
    localStorage.setItem("likes", JSON.stringify(this.likedCars));
  };

  // ==================== COMPUTED PROPERTIES ====================

  @computed get likedCarList() {
    return this.cars.filter(car => this.likedCars.includes(car.id));
  }
}
const store = new CarStore();
export default store;
