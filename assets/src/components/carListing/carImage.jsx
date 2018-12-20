import React, { Component } from "react";

class carImage extends Component {
  render() {
    const imageBackground = src => ({
      backgroundImage: "url(/" + src + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    });

    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
        Date-interval="false"
      >
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={imageBackground(this.props.image.images[0])}
          />
          {this.props.image.images.map((image, index) => {
            if (index > 0) {
              return (
                <div
                  key={index}
                  style={imageBackground(image)}
                  className="carousel-item"
                />
              );
            }
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default carImage;
