// čia bus mašinų store'as
import { observable, action, computed, autorun } from "mobx";
import axios from "axios";
import baseUrl from "../rootConfig";

axios.defaults.baseURL = baseUrl;

class CarStore {
  // GLOBAL PARAMETERS
  @observable
  loading = {
    cars: false,
    brands: false,
    models: false,
    cities: false,
    responses: false
  };

  // CAR LIST
  @observable
  cars = [];
  @observable
  total_pages = 1;

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
    sort: "naujausi",
    page: 1
  };

  brands = [];
  @observable
  models = [];
  @observable
  cities = [];
  @observable
  allCities = [];
  @observable
  reservationResponse = {};
  @observable
  reservationError = {};

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
        this.setCars(response.data);
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
      .get("models/" + id)
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
      .get("cities")
      .then(response => {
        this.setCities(response.data.data);
        this.setLoading({ cities: false });
      })
      .catch(error => console.log(error.response));
  };

  @action
  getAllCities = () => {
    this.setLoading({ cities: true });
    axios
      .get("cities/all")
      .then(response => {
        this.setAllCities(response.data.data);
        this.setLoading({ cities: false });
      })
      .catch(error => console.log(error.response));
  };

  //================== POST =====================

  @action
  postReservation = reservation => {
    axios
      .post("/new/reservation", { reservation })
      .then(response => {
        this.setReservationResponse(response.data);
      })
      .catch(error => {
        this.setLoading(error);
        this.setReservationError(error.response.data);
      });
  };

  @action
  postBadListing = carId => {
    axios
      .post("/report/car", { carId })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  };

  @action
  postComment = comment => {
    axios
      .post("/new/comment", { comment })
      .then(response => {})
      .catch(function(error) {
        console.log(error);
      });
  };

  // ==================== SETTERS ====================

  @action
  setReservationError = error => {
    this.reservationError = error;
  };

  @action
  setReservationResponse = response => {
    this.reservationResponse = response;
  };

  @action
  toggleHeader = value => {
    this.showHeader = value;
  };

  @action
  setCars = list => {
    this.cars = [...this.cars, ...list.data];
    this.total_pages = list.page_count;
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
  setAllCities = value => {
    this.allCities = value;
  };

  @action
  setFilters = filters => {
    //if filters doesn't contain page number
    if (!filters.page) {
      //reset cars list after filters change;
      this.cars = [];
      filters.page = 1;
    }

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
  likesToggler = car => {
    const isIncluded =
      this.likedCars.filter(likedCar => {
        return likedCar.id == car.id;
      }).length > 0;

    console.log(isIncluded);

    if (isIncluded) {
      this.likedCars = this.likedCars.filter(likedCar => likedCar.id != car.id);
    } else {
      this.likedCars = [...this.likedCars, car];
    }
    localStorage.setItem("likes", JSON.stringify(this.likedCars));
  };

  // ==================== COMPUTED PROPERTIES ====================
}

const store = new CarStore();
export default store;
