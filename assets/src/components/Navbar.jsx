import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import Logo from "./logo";
import $ from "jquery";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showFullLogo: false
    };
  }

  componentDidMount() {
    //

    const logoLocation = $(".index-logo-wrapper-logo").offset().top;

    const scrollink = $(".nav-link");
    scrollink.click(function(e) {
      e.preventDefault();
      $("body, html").animate({ scrollTop: $(this.hash).offset().top }, 1000);
    });

    //

    let self = this;
    // Active link switching
    $(window).scroll(function() {
      let scrollbarLocation = $(this).scrollTop();

      if (scrollbarLocation > logoLocation) {
        self.setLogo(true);
        // this.setState({
        //   showFullLogo: true
        // });
      } else {
        self.setLogo(false);
        // this.setState({
        //   showFullLogo: false
        // });
      }

      scrollink.each(function() {
        let sectionOffset = $(this.hash).offset().top - 30;

        if (sectionOffset <= scrollbarLocation) {
          $(this).addClass("active");
          $(this)
            .siblings()
            .removeClass("active");
        }
      });
    });
  }

  setLogo = bool => {
    this.setState({
      showFullLogo: bool
    });
  };

  render() {
    return (
      <header className="masthead mb-auto padding-top text-center">
        <div className="container">
          <div className="inner">
            <div
              className={
                this.state.showFullLogo
                  ? "logo-mask logo-mask--opened"
                  : "logo-mask"
              }
            >
              <Logo className="masthead-brand" />
            </div>
            <nav className="nav nav-masthead justify-content-center">
              <a href="#index" className="nav-link--hl">
                Nuomoti dabar
              </a>
              <a href="#index" className="nav-link">
                Pagrindinis
              </a>
              <a href="#mainNav" className="nav-link">
                Nuomotis
              </a>
            </nav>
            <div className="clearfix" />
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
