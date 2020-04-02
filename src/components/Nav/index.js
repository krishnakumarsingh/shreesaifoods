import React from "react";
import "./index.scss";
import { NavLink } from 'react-router-dom';
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  handleClick() {
    this.setState({value: 'squares'});
  }

  pageScrolled() {
    $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();
      if(scroll > 100) {
        $('.navbar').addClass('nav-scrolled').removeClass('navbar-dark1');
        if ($(window).width() < 768) {
          $('.nav-dropdown-bottom').show();
          $('.nav-dropdown-bottom').parent().addClass('open-footer-menu');
        }
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          $('.open-footer-menu').removeClass('open-footer-menu');
          $('.nav-dropdown-bottom').addClass('bottom-menu-static');
        } else {
          $('.nav-dropdown-bottom').addClass('bottom-menu-static');
        }
      } else {
        $('.navbar').removeClass('nav-scrolled').addClass('navbar-dark1');
        $('.nav-dropdown-bottom').hide();
        $('.open-footer-menu').removeClass('open-footer-menu');
      }
    });
  }
  componentDidMount () {
    this.pageScrolled();
    $('.navbar-toggler').on('click', function() {
      $(this).closest('.navbar').toggleClass('navbar-ham-active');
    });
    if (window.innerWidth <= 768) {
      $('.nav-list').on('click', function() {
        console.log(window.innerWidth);
        $('.navbar-toggler').trigger('click');
      });
    }
  }
  render() {
    const { navBarList } = this.props;
    const logo = navBarList.logo;
    const navList = navBarList.navList;
    const navClass = '';
    const navFixedClassName = "navbar ";
    const navDark = navBarList.nav_theme === 'dark' ? "bg-dark " : "navbar-light ";
    if(navBarList.nav_theme !== 'dark') {
      $('body').addClass('nav-transparent');
    }
    const navClassName = "fixed-top navbar-expand-lg " + navDark + this.props.navClassName;
    //navBarList.nav_theme
    const navMapList = navList.map((i, j) => {
      const classNameNavList = ( j === 0 ) ?
        "nav-item " :
        "nav-item";
      if(!i.navSub) {
        if(!i.samePage) {
          return (
            <li key={j} className={classNameNavList}>
              <NavLink
                exact
                activeClassName="active"
                className={"nav-link " + i.navClass}
                to={i.navHref}
              >
                {i.navSrc !== '' && <span className={i.navSrc}></span>}
                {i.navText}
              </NavLink>
            </li>
          );
        } else {
          return (
            <li key={j} className={classNameNavList}>
              <a className="nav-link nav-list" href={i.navHref}>{i.navText}</a>
            </li>
          );
        }
      } else {
        return (
          <li key={j} className="nav-item dropdown">
            <NavLink
              exact
              activeClassName="active"
              exact
              to={'#'}
              className="nav-link dropdown-toggle"
              id="navbarDropdownPortfolio"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {i.navText}
            </NavLink>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
              {i.subList && i.subList.length > 0 && i.subList.map((i1, j1) => {
                return (
                  <NavLink
                    exact
                    activeClassName="active"
                    exact
                    key={j1}
                    className="dropdown-item"
                    to={i1.navHref}
                  >
                    {i1.navText}
                  </NavLink>
                )
              })}
            </div>
          </li>
        )
      }
    });
    return (
      <nav kye={'navbar'} className={navFixedClassName + navClassName}>
        <div className="container">
          <NavLink
            exact
            activeClassName=""
            exact
            to={logo.logoHref}
            className="navbar-brand"
          >
            {logo.logoImg && <img src={require(`../../assets/images/${logo.logoSrc}`)} alt={logo.logoAlt} />}
            {!logo.logoImg && logo.logoText}
          </NavLink>
          <button
            className="navbar-toggler navbar-toggler-right collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>	
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {navMapList}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;