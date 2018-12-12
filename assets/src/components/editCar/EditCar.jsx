import React from "react";
import { inject, observer } from "mobx-react";
import LoadModal from "./loadModal";
import EditCarModal from "./EditCarModal";
import history from "../../history";

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

  handleClose = () => {
    this.setState({ open: false });
    this.clearEdit();
    history.push("/feed");
  };

  render() {
    const { editableCar, loading } = this.props.CarFormStore;

    if (loading) {
      return (
        <LoadModal open={this.state.open} handleClose={this.handleClose} />
      );
    }

    if (editableCar.id) {
      return <EditCarModal />;
    }
    return <React.Fragment />;
  }
}

export default EditCar;
