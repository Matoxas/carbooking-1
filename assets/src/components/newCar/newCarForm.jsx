import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ImageUpload from "./imageUpload";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";
import PlacesAutocomplete from "react-places-autocomplete";
import moment from "moment";
import SubmitModal from "./submitModal";

import "./newCar.css";
registerLocale("lt", lt);

const searchOptions = {
  // types: ["address"],
  strictbounds: true,
  componentRestrictions: { country: "ltu" }
};

class NewCarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      formStatus: "PENDING", // PENDING/LOADING/SUCCESS/FAILURE
      carId: ""
    };
  }

  changeFormStatus = status => {
    this.setState({
      formStatus: status
    });
  };

  handleModalOpen = () => {
    this.setState({ modalIsOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
    this.changeFormStatus("PENDING");
  };

  handleFormSubmit = () => {
    //Keičiam statusą į loading
    this.changeFormStatus("LOADING");
    //tinrinam ką grąžina submit
    Promise.resolve(this.props.formSubmit()).then(response => {
      if (!response) {
        this.handleModalClose();
        this.changeFormStatus("PENDING");
      } else {
        console.log(response);
        // jei response teigiamas, keičiam formos statusą į SUCCESS
        if (response.status === 200) {
          console.log(response);
          this.props.clearForm();
          this.setState({
            formStatus: "SUCCESS",
            carId: response.data.carId
          });
        } else {
          //priešingu atveju, keičiam formos statusą į FAILURE
          this.changeFormStatus("FAILURE");
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Siūlyk savo automobilį</h2>
        <h5>pradėk įkeldamas keletą nuotraukų</h5>
        <div className="card">
          <ImageUpload
            onDelete={this.props.onDelete}
            setImagesErrorMessage={this.props.setImagesErrorMessage}
            images={this.props.images}
            setImages={this.props.setImages}
            errors={this.props.errors.images}
          />
        </div>

        <h5>automobilio informacija</h5>
        <div className="card">
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Gamintojas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <select
                  onChange={this.props.setBrand}
                  name="brand"
                  className="form-control"
                  id="inputState"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pasirink automobilio gamintoją
                  </option>

                  {this.props.brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.brand}
                    </option>
                  ))}
                </select>
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>

              {this.props.errors.brand.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.brand}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Modelis:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <select
                  onChange={this.props.setValues}
                  name="model"
                  className="form-control"
                  id="inputState"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pasirink automobilio modelį
                  </option>
                  {this.props.models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.model}
                    </option>
                  ))}
                </select>
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>
              {this.props.errors.model.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.model}
                </span>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-md-2" htmlFor="inputState">
              Aprašymas:
            </label>
            <div className="col-sm-9 col-md-10">
              <div className="relative">
                <textarea
                  onChange={this.props.setValues}
                  className="form-control"
                  name="description"
                  rows="1"
                  id="inputState"
                  placeholder="Trumpai aprašyk automobilį"
                />
              </div>
              {this.props.errors.description.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.description}
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
                  value={this.props.address}
                  onChange={this.props.handleChangeAddress}
                  onSelect={this.props.handleChangeAddress}
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
              {this.props.errors.address.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.address}
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
                  selected={this.props.date_from}
                  onChange={this.props.handleFromChange}
                />
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>
              {this.props.errors.date_from.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.date_from}
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
                  minDate={moment(this.props.date_from)
                    .add(1, "d")
                    .toDate()}
                  maxDate={moment(this.props.date_from)
                    .add(31, "d")
                    .toDate()}
                  selected={this.props.date_until}
                  onChange={this.props.handleUntilChange}
                />
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>
              {this.props.errors.date_until.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.date_until}
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
                  onChange={this.props.setValues}
                  className="form-control"
                  placeholder="0.00 €"
                />
              </div>
              {this.props.errors.price.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.price}
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
                  onChange={this.props.setValues}
                  type="text"
                  className="form-control"
                  placeholder="įveskite savo vardą"
                />
              </div>
              {this.props.errors.name.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.name}
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
                  onChange={this.props.setValues}
                  type="text"
                  className="form-control"
                  placeholder="+370"
                />
              </div>
              {this.props.errors.phone.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.phone}
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
                  onChange={this.props.setValues}
                  type="email"
                  className="form-control"
                  placeholder="pavyzdys@mail.lt"
                />
              </div>
              {this.props.errors.email.length > 0 && (
                <span className="invalid-feedback">
                  {this.props.errors.email}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={this.handleModalOpen}
          className="btn btn-info"
          disabled={!this.props.doesFormHasErrors()}
        >
          Paskelbti kataloge
        </button>
        <SubmitModal
          formStatus={this.state.formStatus}
          carId={this.state.carId}
          formSubmit={this.handleFormSubmit}
          open={this.state.modalIsOpen}
          onClose={this.handleModalClose}
          onOpen={this.handleModalkOpen}
        />
        <div className="clearfix margin-bottom--big" />
      </React.Fragment>
    );
  }
}

export default NewCarForm;
