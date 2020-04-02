import React from "react";
import "./index.scss";
import { NavLink } from 'react-router-dom';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    const { slider } = this.props;
    const sliderList = slider.map((i, j) => {
      return (
        <div
          key={j}
          className={`carousel-item parallax ${i.carouselItemClass} slider-${j} ${j === 0 ? 'active' : ''}`}
          data-img={require(`../../assets/images/${i.sliderImg}`)}
          style={{backgroundImage: `url(${require(`../../assets/images/${i.sliderImg}`)})`}}
        >
          <div className="base-table-cell">
            <div className="container">
              <div className="row">
                {i.grid[0] && <div className={`col-md-${i.grid[0]} text-xs-center animated-text`}>
                  <h1 className="base-section-title KaushanScript">{i.title}</h1>
                  <p className="base-section-lead lead Montserrat">{i.lead}</p>
                  <div className="base-section-btn animated-text-2">
                    <NavLink
                      exact
                      to={`${i.btn[1]}`}
                      className="btn btn-lg btn-secondary-outline btn-secondary"
                    >
                      {i.btn[0]}
                    </NavLink>
                  </div>
                </div>}
                {i.grid[1] !== 0 && <div className={`col-md-${i.grid[1]} ${i.secDivClass}`}>
                  {i.ulCircle && <div className={`${i.ulRes ? '' : 'carousel-buying-center-data'}`}>
										<ul className={`${i.ulRes ? 'slider-responsive' : 'circle-container-buying-center'}`} data-center={i.ulCenter}>
                      {
                        i.ulList.map((i1, j1) => {
                          if(!i.ulRes) {
                            return (<li key={j1}>{i1.text}</li>)
                          } else if (i.ulRes) {
                            return (<li key={j1} className={i1.class}><img src={require(`../../assets/images/${i1.text}`)} /></li>)
                          }
                        })
                      }
										</ul>
                  </div>}
                  {i.innrHTML && i.innrHTML}
                </div>}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <header>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators test">
            {slider.map((i, j) => {
              return (<li key={j} data-target="#carouselExampleIndicators" data-slide-to={`${j}`} className={`${j === 0 ? 'active' : ''}`}></li>);
            })}
          </ol>
          {<div className="carousel-inner" role="listbox">
            {sliderList}
          </div>}
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </header>
    );
  }
}
export default Header;