import React, {Component} from "react";
import Comment from "./comment";
import "./carListing.css";
import Dialog from "./Dialog";
import Validators from "./carListingValidators";
import DatePicker from "react-datepicker/es";
import {inject, observer} from "mobx-react";
import axios from "axios";
import moment from "moment";
import {Button, Collapse} from "mdbreact";

@inject("CarStore")
@observer
class carInfo extends Component {
    constructor() {
        super();
        this.state = {
            reservationClicked: false,
            reservationButtonText: "Rezervuoti",
            date_from: new Date().setHours(0, 0, 0, 0),
            date_until: moment(this.date_from)
                .add(1, "d")
                .valueOf(),
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
            excludeDates: [],
            showCommentNameError: false,
            showCommentTextError: false,
            commentCollapse: false
        };
    }

    getDates = (start, end) => {
        let arr = [];
        let dt = new Date(start);
        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
    };

    componentDidMount() {
        this.calculateSum();
    }

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
        const commentNameError = Validators.commentName(this.state.commentName);
        const commentTextError = Validators.commentText(this.state.commentText);
        let showError = false;
        if (commentNameError !== "") {
            this.setState({
                showCommentNameError: true,
                commentNameError: commentNameError
            });
            showError = true;
        } else this.setState({showCommentNameError: false});
        if (commentTextError !== "") {
            this.setState({
                showCommentTextError: true,
                commentTextError: commentTextError
            });
            showError = true;
        } else this.setState({showCommentTextError: false});
        if (showError) {
            this.setState({
                commentCollapse: true,
            });
            e.preventDefault();
        } else {
            this.setState({
                commentCollapse: false,
                commentName: "",
                commentText: ""
            });
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
        }
    };

    toggleComment = () => {
        this.setState({commentCollapse: !this.state.commentCollapse})
    };

    handleFromChange = date => {
        this.setState({date_from: this.dateWithoutTime(date)}, this.calculateSum);
    };

    dateWithoutTime = date => {
        return date.setHours(0, 0, 0, 0);
    };

    calculateSum = () => {
        console.log("date_from:", this.state.date_from);
        console.log("date_until:", this.state.date_until);
        if (this.state.date_until > this.state.date_from) {
            const resultInMiliseconds = this.state.date_until - this.state.date_from;

            const ResultInDays = Math.floor(
                resultInMiliseconds / (1000 * 60 * 60 * 24)
            );

            const totalPrice =
                Math.round(ResultInDays * this.props.car.price * 100) / 100;

            this.setState({
                totalPrice
            });
        } else {
            this.setState({
                totalPrice: 0
            });
        }
    };

    handleUntilChange = date => {
        this.setState(
            {date_until: this.dateWithoutTime(date)},
            this.calculateSum
        );
    };

    handleNameChange = name => {
        this.setState({name: name.target.value});
    };

    handleMessageChange = message => {
        this.setState({message: message.target.value});
    };

    handleBadListing = () => {
        const {postBadListing} = this.props.CarStore;
        postBadListing(this.props.car.id);
        this.setState({
            badListingText: "Dėkui, jūsų pranešimas buvo išsiųstas",
            badListingShow: true
        });
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

    render() {
        let datesArray = [];
        if (this.props.car.bookingDates.length !== 0) {
            this.props.car.bookingDates.map(date => {
                datesArray = this.getDates(
                    new Date(date.bookedFrom),
                    new Date(date.bookedUntil),
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
                                <button onClick={this.toggleComment} className="btn btn-warning btn-comment">
                                    Parašyti komentarą
                                </button>
                                <Collapse isOpen={this.state.commentCollapse}>
                                    <div className="form-group form-group-separate">
                                        <form id="clear-comment-input">
                                            <input
                                                onChange={this.handleCommentName}
                                                value={this.state.commentName}
                                                className="form-control"
                                                type="text"
                                                placeholder="Įrašykite savo vardą"
                                            />
                                            {this.state.showCommentNameError ? (
                                                <div className="input--error">{this.state.commentNameError}</div>
                                            ) : null}
                                            <textarea
                                                onChange={this.handleCommentText}
                                                value={this.state.commentText}
                                                className="form-control"
                                                placeholder="Komentaras..."
                                            />
                                            {this.state.showCommentTextError ? (
                                                <div className="input--error">{this.state.commentTextError}</div>
                                            ) : null}
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
                                </Collapse>
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
                                        startDate={this.state.date_from}
                                        endDate={this.state.date_until}
                                        minDate={new Date(this.props.car.rentDates[0].rentedFrom)}
                                        maxDate={new Date(this.props.car.rentDates[0].rentedUntil)}
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
                                        minDate={new Date(this.props.car.rentDates[0].rentedFrom)}
                                        maxDate={new Date(this.props.car.rentDates[0].rentedUntil)}
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default carInfo;
