import React, { Component } from "react";
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
    const logoLocation = $(".index-logo-wrapper-logo").offset().top;

    const scrollink = $(".srollink");
    scrollink.click(function(e) {
      e.preventDefault();
      $("body, html").animate({ scrollTop: $(this.hash).offset().top }, 1000);
    });

    let self = this;
    //  Active link switching
    $(window).scroll(function() {
      let scrollbarLocation = $(this).scrollTop();

      if (scrollbarLocation > logoLocation) {
        self.setLogo(true);
      } else {
        self.setLogo(false);
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
              <a className="srollink" href="#index">
                <Logo className="masthead-brand" />
              </a>
            </div>
            <nav className="nav nav-masthead justify-content-center">
              <a href="#index" className="nav-link--hl">
                Nuomoti dabar
              </a>
              <a href="#index" className="nav-link srollink">
                Pagrindinis
              </a>
              <a href="#mainNav" className="nav-link srollink">
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
