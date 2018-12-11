import React, {Component} from "react";
import Comment from "./comment";
import "./carListing.css";
import Dialog from "./Dialog";
import ReservationDatePicker from "./reservationDatePicker";
import DatePicker from "react-datepicker/es";
import {inject, observer} from "mobx-react";
import axios from "axios";
import moment from "moment";

@inject("CarStore")
@observer
class carInfo extends Component {
    constructor() {
        super();
        this.state = {
            reservationClicked: false,
            reservationButtonText: "Rezervuoti",
            date_from: moment(new Date()).toDate(),
            date_until: new Date(),
            name: "",
            email: "",
            phone: "",
            message: "",
            value: null,
            comments: [],
            commentName: "",
            commentText: "",
            response: {},
            bookingDates: {},
            rentedDates: [],
            showAlertWindow: false,
            alertText: "kazkas tik nepavyko",
            excludeDates: []
        };
    }

    componentDidMount() {}

    getDates = (start, end) => {
        var arr = new Array();
        var dt = new Date(start);
        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    };

    postReservation = reservation => {
        axios
            .post("/new/reservation", {reservation})
            .then(response => {
                alert("jūsų rezervacija patvritinta sėkmingai");
            })
            .catch(error => {
                console.log(error.response.data.status);
                this.setState({
                    showAlertWindow: true,
                    alertHeader: "Rezervacija pavyko",
                    alertText: "Rezervacijos prašymas išsiųstas savininkui patvritinti"
                });
                if (error.response.data.status == "ok") {
                    this.setState({
                        showAlertWindow: true,
                        alertHeader: "Rezervacija pavyko",
                        alertText: "Rezervacijos prašymas išsiųstas savininkui patvritinti"
                    });
                } else {
                    this.setState({
                        showAlertWindow: true,
                        alertHeader: "Rezervacija nepavyko",
                        alertText: error.response.data.message
                    });
                }
            });
    };

    handleSubmit = e => {
        if (this.state.reservationClicked === true) {
            e.preventDefault();
            const {name, email, phone, message, date_from, date_until} = this.state;

            const reservation = {
                carId: this.props.car.id,
                date_from: date_from,
                date_until: date_until,
                name: name,
                email: email,
                phone: phone,
                message: message
            };

            this.postReservation(reservation);
            document.getElementById("clear-reservation-input").reset();

            this.setState({
                reservationClicked: false,
                reservationButtonText: "Rezervuoti"
            });
        } else {
            this.setState({
                reservationClicked: true,
                reservationButtonText: "Patvirtinti rezervaciją"
            });
        }
    };

    handleSubmitComment = e => {
        e.preventDefault();
        const {postComment} = this.props.CarStore;
        const {commentName, commentText} = this.state;

        const comment = {
            carId: this.props.car.id,
            name: commentName,
            text: commentText
        };
        document.getElementById("clear-comment-input").reset();

        //siunčiam komentarą į api
        postComment(comment);
        //TODO IF ALL GOOD
        //pertvarkom komentaro stuktūrą ir atvaizduojam komentarą lokaliai
        const restructuredComment = {
            comment: comment.text,
            name: comment.name,
            createdAt: new Date().toJSON().replace("T", " ")
        };
        this.props.addComment(restructuredComment);
    };

    handleFromChange = date => {
        this.setState({date_from: date});
    };

    handleUntilChange = date => {
        this.setState({date_until: date});
        // this.setState({date_from: date_until});
        console.log(this.state.date_from);
        console.log(this.state.date_until);
        // let timeDiff = Math.abs(this.state.date_until.getTime() - this.state.date_from.getTime());
        // let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        // console.log(diffDays);
        // const date_sum = (this.state.date_until - this.state.date_from);
        // console.log(date_sum);
    };

    handleNameChange = name => {
        this.setState({name: name.target.value});
    };

    handleMessageChange = message => {
        this.setState({message: message.target.value});
    };

    handleEmailChange = email => {
        this.setState({email: email.target.value});
    };

    handlePhoneChange = phone => {
        this.setState({phone: phone.target.value});
    };

    handleCommentName = name => {
        this.setState({commentName: name.target.value});
    };

    handleCommentText = text => {
        this.setState({commentText: text.target.value});
    };

    handleBadListing = () => {
        const {postBadListing} = this.props.CarStore;
        postBadListing(this.props.car.id);
        this.setState({
            badListingText: "Dėkui, jūsų pranešimas buvo išsiųstas",
            badListingShow: true
        });
        // alert("Dėkui, jūsų pranešimas buvo išsiųstas");
    };

    handleAlert = () => {
        this.setState({showAlertWindow: false})
    };

    handleBadListingDialog = () => {
        this.setState({badListingShow: false})
    };

    render() {
        let minDate = new Date();
        let maxDate = new Date();
        if (this.props.car.bookingDates.length !== 0) {
            minDate = this.props.car.bookingDates[0].bookedFrom;
            maxDate = this.props.car.bookingDates[0].bookedUntil;
        } else {
            minDate = moment(new Date()).toDate();
            maxDate = moment(this.date_from).add(30, "d").toDate();
        }
        let dates = [];
        let datesArray = [];
        if (this.props.car.rentDates.length !== 0) {
            this.props.car.rentDates.map(date => {
                datesArray = this.getDates(
                    new Date(date.rentedFrom),
                    new Date(date.rentedUntil),
                );
                dates.push(datesArray);
            });
        }
        return (
            <div className="info">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-lg-3 info-description"/>
                            <div className="col-lg-9">
                                <p className="info--big">
                                    {this.props.car.brand} {this.props.car.model}
                                </p>
                            </div>
                            <div className="col-lg-3 info-description">Vieta</div>
                            <div className="col-lg-9">
                                <p className="info--normal">{this.props.car.city}</p>
                            </div>
                            <div className="col-lg-3 info-description">Aprašymas</div>
                            <div className="col-lg-9">
                                <p className="info--normal">
                                    {this.props.car.description}
                                </p>
                            </div>
                            <hr/>
                            <div className="col-lg-3 info-description">Savininkas</div>
                            <div className="col-lg-9">
                                <p className="info--normal info--owner info--owner-raise">
                                    <i className="fas fa-phone info--envelope"/>
                                    {this.props.car.phone}
                                </p>
                            </div>
                            <div className="col-lg-3 info-description">Komentarai</div>
                            <div className="col-lg-9">
                                {this.props.comments.length ? (
                                    <Comment comments={this.props.comments}/>
                                ) : (
                                    <p>Šis skelbimas neturi jokių komentarų.</p>
                                )}
                            </div>
                            <div className="col-lg-3"/>
                            <div className="col-lg-9 info--newComment">
                                <hr/>
                                <button
                                    className="btn btn-warning btn-comment"
                                    data-toggle="collapse"
                                    data-target="#collapseComment"
                                    aria-expanded="false"
                                    aria-controls="collapseComment"
                                >
                                    Parašyti komentarą
                                </button>
                                <div
                                    className="form-group collapse form-group-separate"
                                    id="collapseComment"
                                >
                                    <form id="clear-comment-input">
                                        <input
                                            onChange={this.handleCommentName}
                                            className="form-control"
                                            type="text"
                                            placeholder="Įrašykite savo vardą"
                                        />
                                        <textarea
                                            onChange={this.handleCommentText}
                                            className="form-control"
                                            type="text"
                                            placeholder="Komentaras..."
                                        />
                                        <br/>
                                        <button
                                            onClick={this.handleSubmitComment}
                                            className="btn btn-warning info-button"
                                            data-toggle="collapse"
                                            data-target="#collapseComment"
                                            aria-expanded="false"
                                            aria-controls="collapseComment"
                                        >
                                            Skelbti
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4  offset-lg-1 info-price">
                        <span className="info-price--currency">€</span>
                        <span className="info-price--value">{this.props.car.price}</span>
                        <span className="info-price--small">dienai</span>
                        <div className="info-dates">
                            <div className="form-group">
                                <label className="" htmlFor="inputState">
                                    Nuomos pradžia:
                                </label>
                                <div className="relative clearfix">
                                    <DatePicker
                                        className="form-control"
                                        name="date_from"
                                        excludeDates={datesArray}
                                        // locale={"lt"}
                                        selected={this.state.date_from}
                                        selectsStart
                                        startDate={new Date(this.state.date_from)}
                                        endDate={this.state.date_until}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        onChange={this.handleFromChange}
                                    />
                                    <i className="fa fa-caret-down" aria-hidden="true"/>
                                </div>
                                <label htmlFor="inputState">Nuomos pabaiga:</label>
                                <div className="relative clearfix">
                                    <DatePicker
                                        className="form-control"
                                        //   locale={"lt"}
                                        name="date_until"
                                        excludeDates={datesArray}
                                        selected={new Date(this.state.date_until)}
                                        selectsEnd
                                        startDate={this.state.date_from}
                                        endDate={this.state.date_until}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        onChange={this.handleUntilChange}
                                    />
                                    <i className="fa fa-caret-down" aria-hidden="true"/>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={this.handleSubmit}
                            className="btn btn-warning info-button"
                            data-toggle="collapse"
                            data-target="#collapseReports"
                            aria-expanded="false"
                            aria-controls="collapseReport"
                        >
                            {this.state.reservationButtonText}
                        </button>
                        {this.state.showAlertWindow ? (<div onClick={this.handleAlert}>
                            <Dialog alertHeader={this.state.alertHeader}
                                    alertMessage={this.state.alertText}/>
                        </div>) : null}
                        <div
                            className="form-group collapse form-group-separate"
                            id="collapseReports"
                        >
                            <form id="clear-reservation-input">
                                <input
                                    onChange={this.handleNameChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="Įrašykite savo vardą"
                                />
                                <input
                                    onChange={this.handleEmailChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="Įrašykite savo el. paštą"
                                />
                                <input
                                    onChange={this.handlePhoneChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="+370"
                                />
                                <div className="form-group">
                  <textarea
                      onChange={this.handleMessageChange}
                      className="form-control"
                      type="text"
                      placeholder="Žinutė savininkui..."
                  />
                                </div>
                            </form>
                        </div>
                        <hr/>
                        <p onClick={this.handleBadListing} className="info-report">
                            Pranešti apie netinkamą skelbimą
                        </p>
                        {this.state.badListingShow ? (<div onClick={this.handleBadListingDialog}>
                            <Dialog alertMessage={this.state.badListingText}/>
                        </div>) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default carInfo;
