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

    @observable
    sort = "";

    brands = [];
    @observable
    models = [];
    @observable
    cities = [];

    // TEST FUNCTIONS

    // @action
    // test = object => {
    //   console.log(object);
    // };

    // var disposer = autorun(() => console.log(this.cities));

    // ==================== GETTERS ====================

    @action
    getAllCars = () => {
        this.setLoading(true);
        axios
            .put("cars", this.filters)
            .then(response => {
                this.setCars(response.data.data);

                console.log(
                    response.data.data.map(hop => {
                        return Date(hop.createdAt);
                    })
                );

                console.log(
                    response.data.data.sort((a, b) => {
                        return Date(a.createdAt) - Date(b.createdAt);
                    })
                );

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

    @action
    setSort = sort => {
        this.sort = sort;
    };

    // ==================== COMPUTED PROPERTIES ====================

    @computed
    get sortedCarList() {
            switch (this.sort) {
                case "naujausi":
                    return this.cars.slice().sort((a, b) => {
                        return (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * (-1);
                    });
                case "seniausi":
                    return this.cars.slice().sort((a, b) => {
                        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
                    });
                case "pigiausi":
                    return this.cars.sort((a, b) => {
                        return a.price - b.price;
                    });
                case "brangiausi":
                    return this.cars.sort((a, b) => {
                        return b.price - a.price;
                    });
                default:
                    return this.cars.sort((a, b) => {
                        return a.createdAt - b.createdAt;
                    });
            }
        }
    }

const store = new CarStore();
export default store;