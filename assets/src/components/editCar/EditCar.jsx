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
      date_from: "",
      date_until: "",
      images: [],
      token: ""
    });
  };

  componentDidMount() {
    this.ValidateCarId(this.props.carId);
  }

  ValidateCarId = (id = this.props.carId) => {
    const { setLoading } = this.props.CarFormStore;
    setLoading(true);
    if (id) {
      axios
        .get("get/car/" + id)
        .then(response => {
          if (response.status == 200) {
            this.setEditableCar(response.data);
            setLoading(false);
          } else {
            this.props.resetHash();
            this.setState({ open: false });
            history.push("/feed");
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          this.props.resetHash();
          history.push("/feed");
          this.setState({ open: false });
          setLoading(false);
          return error;
        });
    }
  };

  setEditableCar = car => {
    const { setEditableCar: setCar } = this.props.CarFormStore;
    const editableCar = car.data[0];
    const token = car.token;

    const images = editableCar.images.map((image, index) => {
      return {
        preview: "/" + image,
        id: index + 1
      };
    });

    setCar({
      token,
      id: editableCar.id,
      brand: editableCar.brand,
      model: editableCar.model,
      address: editableCar.address,
      price: editableCar.price,
      description: editableCar.description,
      phone: editableCar.phone,
      email: editableCar.email,
      name: editableCar.name,
      date_from: editableCar.rentDates[0].rentedFrom,
      date_until: editableCar.rentDates[0].rentedUntil,
      bookingDates: editableCar.bookingDates,
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
      return <LoadModal open={loading} />;
    }

    if (editableCar.id) {
      return (
        <EditCarModal
          editableCar={editableCar}
          open={true}
          handleClose={this.handleClose}
          handleUndo={this.ValidateCarId}
          formSubmit={this.formSubmit}
        />
      );
    }
    return <React.Fragment />;
  }
}

export default EditCar;
