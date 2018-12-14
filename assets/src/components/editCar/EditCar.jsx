import React from "react";
import { inject, observer } from "mobx-react";
import LoadModal from "./loadModal";
import EditCarModal from "./EditCarModal";
import history from "../../history";
import axios from "axios";

@inject("CarFormStore")
@observer
class EditCar extends React.Component {
  state = {
    open: true
  };

  clearEdit = () => {
    const { setEditableCar } = this.props.CarFormStore;
    setEditableCar({
      id: "",
      brand: "",
      model: "",
      address: "",
      price: "",
      description: "",
      phone: "",
      email: "",
      name: "",
      images: []
    });
  };

  componentDidMount() {
    this.ValidateCarId(this.props.carId);
  }

  ValidateCarId = id => {
    const { setLoading } = this.props.CarFormStore;
    setLoading(true);
    if (id) {
      axios
        .get("/car/" + id)
        .then(response => {
          if (response.status == 200) {
            this.setEditableCar(response.data.data);
            setLoading(false);
          } else {
            this.props.resetHash();
            history.push("/feed");
            setLoading(false);
          }
        })
        .catch(error => {
          this.props.resetHash();
          history.push("/feed");
          setLoading(false);
          return error;
        });
    }
  };

  setEditableCar = car => {
    const { setEditableCar: setCar } = this.props.CarFormStore;

    const images = car.images.map((image, index) => {
      return {
        preview: "/" + image,
        id: index + 1
      };
    });

    setCar({
      id: car.id,
      brand: car.brand,
      model: car.model,
      address: car.address,
      price: car.price,
      description: car.description,
      phone: car.phone,
      email: car.email,
      name: car.name,
      date_from: car.rentDates[0].rentedFrom,
      date_until: car.rentDates[0].rentedUntil,
      images
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.clearEdit();
    this.props.resetHash();
    history.push("/feed");
  };

  render() {
    const { editableCar, loading } = this.props.CarFormStore;

    if (loading) {
      return <LoadModal open={this.state.open} />;
    }

    if (editableCar.id) {
      return (
        <EditCarModal
          editableCar={editableCar}
          open={this.state.open}
          handleClose={this.handleClose}
        />
      );
    }
    return <React.Fragment />;
  }
}

export default EditCar;
