import React from "react";
import { inject, observer } from "mobx-react";
import LoadModal from "./loadModal";
import EditCarModal from "./EditCarModal";
import axios from "axios";
import Diaglog from "../carListing/Dialog";

@inject("CarFormStore")
@observer
class EditCar extends React.Component {
  state = {
    showEditCarPage: false,
    showSuccess: false,
    statusModalMessage: "",
    statusModalTitle: "",
    editableCarCopy: {}
  };

  handleUndo = () => {
    const { setEditableCar: setCar } = this.props.CarFormStore;
    setCar({ ...this.state.editableCarCopy });
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
          if (response.data.data.length > 0) {
            this.setEditableCar(response.data);
          } else {
            setLoading(false);
            this.props.resetHash();
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          this.props.resetHash();
          return error;
        });
    }
  };

  setFormStatus = (status = "pending") => {
    switch (status) {
      case "deleted":
        this.setState({
          showSuccess: true,
          statusModalMessage: "Automobilis sėkmingai pašalintas!",
          statusModalTitle: "Atlikta!"
        });
        break;
      case "updated":
        this.setState({
          showSuccess: true,
          statusModalMessage: "Automobilis sėkmingai atnaujintas!",
          statusModalTitle: "Atlikta!"
        });
        break;
      case "error":
        this.setState({
          showSuccess: false,
          statusModalMessage: "Klaida, pabandykite veliau ",
          statusModalTitle: "įvyko kažkas netikėto..."
        });
      default:
        this.setState({
          showSuccess: false,
          statusModalMessage: "",
          statusModalTitle: ""
        });
    }
  };

  setEditableCar = car => {
    const { setEditableCar: setCar, setLoading } = this.props.CarFormStore;
    const token = car.token;
    const editableCar = car.data[0];
    const images = editableCar.images.map((image, index) => {
      return {
        preview: "/" + image,
        id: index + 1
      };
    });

    this.setState({
      editableCarCopy: {
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
      }
    });

    setCar(this.state.editableCarCopy);
    this.setState({
      showEditCarPage: true
    });

    setLoading(false);
  };

  handleClose = status => {
    this.setState({ showEditCarPage: false });
    this.clearEdit();
    if (status !== "reset") {
      this.setFormStatus(status);
    } else {
      this.props.resetHash();
    }
  };

  render() {
    const { editableCar, loading } = this.props.CarFormStore;

    if (loading) {
      return <LoadModal open={true} />;
    }

    if (this.state.statusModalTitle) {
      return (
        <Diaglog
          alertMessage={this.state.statusModalMessage}
          alertHeader={this.state.statusModalTitle}
          handleClose={this.handleClose}
          showSuccess={this.state.showSuccess}
        />
      );
    }

    if (this.state.showEditCarPage) {
      return (
        <EditCarModal
          editableCar={editableCar}
          handleClose={this.handleClose}
          handleUndo={this.handleUndo}
          formSubmit={this.formSubmit}
        />
      );
    }
    return <React.Fragment />;
  }
}

export default EditCar;
