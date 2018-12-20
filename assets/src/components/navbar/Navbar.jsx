import React, { Component } from "react";
import "./Navbar.css";
import Logo from "../../extras/logo";
import $ from "jquery";
import history from "../../history";
import { inject, observer } from "mobx-react";

@inject("CarStore")
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullLogo: false,
      showNavBackground: false,
      showMenu: false
    };
  }

  componentDidMount() {
    //check if to display full logo on load

    if (window.location.pathname == "/newcar") {
      this.setLogo(true);
      this.setBackground(true);
    }

    // all things related scrolling
    this.enableScrollEvents();
  }

  //mobile menu toggle

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

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
      // if (scrollbarLocation == $(document).height() - $(window).height())
      if (scrollbarLocation >= $("#footer").offset().top - $(window).height()) {
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
    this.setState({ showMenu: false });
    $(e.target).addClass("active");
    $(e.target)
      .siblings()
      .removeClass("active");
    history.push("/feed");
    if ($(scrollink).offset()) {
      $("body, html").animate({ scrollTop: $(scrollink).offset().top }, 1000);
    }
  };

  handleOutsineNavClick = (e, link) => {
    e.preventDefault();
    this.setState({ showMenu: false });
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
            <div onClick={this.toggleMenu} className="burgerIcon">
              <i className="fas fa-bars" />
            </div>
            <nav
              className={
                (this.state.showMenu ? "opened" : "") +
                " nav nav-masthead justify-content-center"
              }
            >
              <a
                onClick={e => this.handleOutsineNavClick(e, "/newcar")}
                href="/newcar"
                className="nav-link--hl"
              >
                Nuomoti automobilį
              </a>

              <a
                href="#index"
                onClick={e => this.handleNavClick(e, "#index")}
                className="nav-link srollink"
              >
                Pradžia
              </a>
              <a
                href="#mainNav"
                onClick={e => this.handleNavClick(e, "#mainNav")}
                className="nav-link srollink"
              >
                Katalogas
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
