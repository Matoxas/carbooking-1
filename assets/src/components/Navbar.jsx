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
    this.isHeaderSet();
  }

  isHeaderSet = () => {
    const showHeader = true;

    if (showHeader) {
      this.enableScrollEvents();
    }
    this.disableScrollEvents();
  };

  disableScrollEvents = () => {
    const scrollink = $(".srollink");
    $(window).scroll(function() {
      scrollink.each(function() {
        let sectionOffset = "";
      });
    });
    this.setLogo(true);
    this.setBackground(true);
  };

  pageUp = () => {
    const {
      total_pages,
      getAllCars,
      filters,
      loading,
      setFilters
    } = this.props.CarStore;

    if (!loading.cars) {
      if (filters.page <= total_pages) {
        setFilters({ page: true });
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

  turnOffHeader = e => {
    e.preventDefault();
    this.disableScrollEvents();
    $(e.target).addClass("active");
    $(e.target)
      .siblings()
      .removeClass("active");
    history.push("/newcar");
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
              <NavLink
                onClick={this.turnOffHeader}
                to="/newcar"
                className="nav-link--hl"
              >
                Nuomoti dabar
              </NavLink>

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
