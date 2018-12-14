import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ImageUpload from "../newCar/imageUpload";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";
import PlacesAutocomplete from "react-places-autocomplete";
import moment from "moment";
registerLocale("lt", lt);

const searchOptions = {
  // types: ["address"],
  strictbounds: true,
  componentRestrictions: { country: "ltu" }
};

@inject("CarFormStore")
@observer
class EditCarForm extends Component {
  constructor(props) {
    super(props);
    this.state = { state: "" };
  }

  componentDidMount() {
    this.validateDates();
  }

  setValues = e => {
    const { setEditableCar, setEditableCarErrors } = this.props.CarFormStore;

    //set value
    setEditableCar({ [e.target.name]: e.target.value });
    //clear error
    setEditableCarErrors({ [e.target.name]: "" });
  };

  setImages = images => {
    const { setEditableCar } = this.props.CarFormStore;
    setEditableCar({ images });
  };

  setImagesErrorMessage = message => {
    const { setEditableCarErrors } = this.props.CarFormStore;
    setEditableCarErrors({ images: message });
  };

  onDeleteImage = id => {
    const { setEditableCarErrors, editableCar } = this.props.CarFormStore;
    setEditableCarErrors({ images: "" });
    const images = editableCar.images;
    const index = images.findIndex(image => image.id == id);
    images.splice(index, 1);
    this.setImages(images);
  };

  handleFromChange = date => {
    const { setEditableCarErrors, setEditableCar } = this.props.CarFormStore;
    setEditableCarErrors({ date_until: "", date_from: "" });
    setEditableCar({ date_from: date });
    this.validateDates();
  };

  handleUntilChange = date => {
    const { setEditableCarErrors, setEditableCar } = this.props.CarFormStore;
    setEditableCarErrors({ date_until: "", date_from: "" });
    setEditableCar({ date_until: date });
    this.validateDates();
  };

  handleChangeAddress = address => {
    const { setEditableCarErrors, setEditableCar } = this.props.CarFormStore;
    setEditableCarErrors({ address: "" });
    setEditableCar({ address });
  };

  validateDates = () => {
    const { editableCar, setEditableCar } = this.props.CarFormStore;
    if (editableCar.date_from >= editableCar.date_until) {
      setEditableCar({
        date_until: moment(editableCar.date_from)
          .add(1, "d")
          .toDate()
      });
    }

    if (moment(editableCar.date_from).toDate() < new Date()) {
      setEditableCar({
        date_from: new Date()
      });
    }
  };

  doesFormHasErrors = () => {
    const { editableCarErrors } = this.props.CarFormStore;
    return Object.values(editableCarErrors).every(error => error == "");
  };

  hasSpecificError = input => {
    const { editableCarErrors } = this.props.CarFormStore;
    return editableCarErrors[input].length > 0;
  };

  render() {
    const { editableCar, editableCarErrors } = this.props.CarFormStore;

    return (
      <React.Fragment>
        <h5>keisk esamas nuotraukas, arba pridėk naujų</h5>
        <div className="card">
          <ImageUpload
            onDelete={this.onDeleteImage}
            setImagesErrorMessage={this.setImagesErrorMessage}
            images={editableCar.images}
            setImages={this.setImages}
            errors={editableCarErrors.images}
          />
        </div>

        <h5>Automobilio informacija</h5>
        <div className="card">
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Aprašymas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <textarea
                  onChange={this.setValues}
                  className="form-control"
                  value={editableCar.description}
                  name="description"
                  rows="1"
                  id="inputState"
                  placeholder="Trumpai aprašyk automobilį"
                />
              </div>
              {this.hasSpecificError("description") && (
                <span className="invalid-feedback">
                  {editableCarErrors.description}
                </span>
              )}
            </div>
          </div>
        </div>

        <h5>vietos informacija</h5>
        <div className="card">
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Adresas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <PlacesAutocomplete
                  value={editableCar.address}
                  onChange={this.handleChangeAddress}
                  onSelect={this.handleChangeAddress}
                  searchOptions={searchOptions}
                  clearItemsOnError={true}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "įveskite automobilio lokaciją",
                          className: "form-control"
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Kraunasi...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer"
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer"
                              };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
              {this.hasSpecificError("address") && (
                <span className="invalid-feedback">
                  {editableCarErrors.address}
                </span>
              )}
            </div>
          </div>
        </div>

        <h5>laikas ir kaina</h5>
        <div className="card">
          <div className="form-group row">
            <label className="col-sm-2" htmlFor="inputState">
              Nuomos pradžia:
            </label>
            <div className="col-sm-4">
              <div className="relative pb-mobile">
                <DatePicker
                  className="form-control"
                  locale={"lt"}
                  name="date_from"
                  minDate={new Date()}
                  maxDate={moment(new Date())
                    .add(31, "d")
                    .toDate()}
                  selected={editableCar.date_from}
                  onChange={this.handleFromChange}
                />
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>
              {this.hasSpecificError("date_from") && (
                <span className="invalid-feedback">
                  {editableCarErrors.date_from}
                </span>
              )}
            </div>
            <label
              className="col-sm-2 border-left pt-mobile"
              htmlFor="inputState"
            >
              Nuomos pabaiga:
            </label>
            <div className="col-sm-4">
              <div className="relative">
                <DatePicker
                  className="form-control"
                  locale={"lt"}
                  name="date_until"
                  minDate={moment(editableCar.date_from)
                    .add(1, "d")
                    .toDate()}
                  maxDate={moment(editableCar.date_from)
                    .add(31, "d")
                    .toDate()}
                  selected={editableCar.date_until}
                  onChange={editableCar.handleUntilChange}
                />
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>
              {this.hasSpecificError("date_until") && (
                <span className="invalid-feedback">
                  {editableCarErrors.date_until}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Paros kaina:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="99"
                  name="price"
                  value={editableCar.price}
                  onChange={this.setValues}
                  className="form-control"
                  placeholder="0.00 €"
                />
              </div>
              {this.hasSpecificError("price") && (
                <span className="invalid-feedback">
                  {editableCarErrors.price}
                </span>
              )}
            </div>
          </div>
        </div>

        <h5>kontaktinė informacija</h5>
        <div className="card">
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Vardas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <input
                  name="name"
                  value={editableCar.name}
                  onChange={this.setValues}
                  type="text"
                  className="form-control"
                  placeholder="įveskite savo vardą"
                />
              </div>
              {this.hasSpecificError("name") && (
                <span className="invalid-feedback">
                  {editableCarErrors.name}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Telefonas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <input
                  name="phone"
                  value={editableCar.phone}
                  onChange={this.setValues}
                  type="text"
                  className="form-control"
                  placeholder="+370"
                />
              </div>
              {editableCarErrors.phone.length > 0 && (
                <span className="invalid-feedback">
                  {editableCarErrors.phone}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              El.paštas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <input
                  name="email"
                  value={editableCar.email}
                  onChange={this.setValues}
                  type="email"
                  className="form-control"
                  placeholder="pavyzdys@mail.lt"
                />
              </div>
              {this.hasSpecificError("email") && (
                <span className="invalid-feedback">
                  {editableCarErrors.email}
                </span>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditCarForm;
