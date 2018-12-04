import React, { Component } from "react";
import "../style/Navbar.css";
import Logo from "./logo";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import history from "../history";
import { inject, observer } from "mobx-react";

@inject("CarStore")
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullLogo: false,
      showNavBackground: false
    };
  }

  componentDidMount() {
    this.enableScrollEvents();
  }

  //load on scroll

  pageUp = () => {
    const {
      total_pages,
      getAllCars,
      filters,
      loading,
      setFilters
    } = this.props.CarStore;

    if (!loading.cars) {
      if (filters.page < total_pages) {
        setFilters({ page: filters.page + 1 });
        getAllCars();
      }
    }
  };

  enableScrollEvents() {
    // const logoLocation = $(".index-logo-wrapper-logo").offset().top;
    const scrollink = $(".srollink");
    let self = this;
    //  Active link switching
    $(window).scroll(function() {
      let scrollbarLocation = $(this).scrollTop();

      // Load feed on scroll
      if (scrollbarLocation == $(document).height() - $(window).height()) {
        if (window.location.pathname == "/feed") {
          self.pageUp();
        }
      }

      if (window.location.pathname == "/newcar") {
        self.setLogo(true);
        self.setBackground(true);
      } else {
        if (scrollbarLocation > 30) {
          self.setLogo(true);
        } else {
          self.setLogo(false);
        }

        if (scrollbarLocation > 10) {
          self.setBackground(true);
        } else {
          self.setBackground(false);
        }
      }

      scrollink.each(function() {
        //change active links on scroll if path is not newCar
        if (window.location.pathname == "/newcar") {
          let sectionOffset = 0;
        } else {
          let sectionOffset = $(this.hash).offset().top - 30;
          if (sectionOffset <= scrollbarLocation) {
            $(this).addClass("active");
            $(this)
              .siblings()
              .removeClass("active");
          }
        }
      });
    });
  }

  setLogo = bool => {
    this.setState({
      showFullLogo: bool
    });
  };

  setBackground = bool => {
    this.setState({
      showNavBackground: bool
    });
  };

  handleNavClick = (e, scrollink) => {
    e.preventDefault();
    $(e.target)
      .siblings()
      .removeClass("active");
    history.push("/feed");
    $("body, html").animate({ scrollTop: $(scrollink).offset().top }, 1000);
  };

  handleOutsineNavClick = (e, link) => {
    e.preventDefault();
    history.push(link);
    $(e.target).addClass("active");
    $(e.target)
      .siblings()
      .removeClass("active");
    this.setLogo(true);
    this.setBackground(true);
  };

  render() {
    return (
      <header
        className={
          (this.state.showNavBackground ? "masthead-background" : "") +
          " masthead mb-auto padding-top text-center"
        }
      >
        <div className="container">
          <div className="inner">
            <div
              className={
                this.state.showFullLogo
                  ? "logo-mask logo-mask--opened"
                  : "logo-mask"
              }
            >
              <a href="#index" onClick={e => this.handleNavClick(e, "#index")}>
                <Logo className="masthead-brand" />
              </a>
            </div>
            <nav className="nav nav-masthead justify-content-center">
              <a
                onClick={e => this.handleOutsineNavClick(e, "/newcar")}
                href="/newcar"
                className="nav-link--hl"
              >
                Nuomoti dabar
              </a>

              <a
                href="#index"
                onClick={e => this.handleNavClick(e, "#index")}
                className="nav-link srollink"
              >
                Pagrindinis
              </a>
              <a
                href="#mainNav"
                onClick={e => this.handleNavClick(e, "#mainNav")}
                className="nav-link srollink"
              >
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
