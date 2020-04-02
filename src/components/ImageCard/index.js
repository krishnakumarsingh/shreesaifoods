import React from "react";
import "./index.scss";
import { NavLink } from 'react-router-dom';
class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  createMarkup(html) {
    return {__html: html};
  }
  imgDiv(html, href, text, alt, src, exHref, target, nrml) {
    if(href && !nrml) {
      return <NavLink
        exact
        to={href}
        className="link"
        id="formatics"
      >
        {text && <div className="overlay-card-img-top hvr-bounce-to-top">
          <div className="text-card">{text}</div>
        </div>}
        {src && <img className="card-img-top" alt={alt} src={require(`../../assets/images/${src}`)} />}
      </NavLink>;
    } else if(exHref && !nrml) {
      return <a
        href={exHref}
        className="link"
        id="formatics"
        target={target && target}
      >
        {text && <div className="overlay-card-img-top hvr-bounce-to-top">
          <div className="text-card">{text}</div>
        </div>}
        {src && <img className="card-img-top" alt={alt} src={require(`../../assets/images/${src}`)} />}
      </a>;
    }
    if(nrml) {
      return <div
          className="overlay-card-img-top-nrml"
        >
          {src && <img
            className="card-img-top"
            alt={alt}
            src={require(`../../assets/images/${src}`)}
          />}
          {text && <div className="text-card-nrml">{text}</div>}
        </div>;
    }
  }
  render() {
    const { href, text, src, alt, classItem, exHref, target, details, nrml, detailsHtml, btn } = this.props.item;
    return (
      <div className={`card mr-md-3 ml-md-3 mr-sm-1 ml-sm-1 col-xs-12 rounded-0 ${classItem ? classItem : ''} ${details ? 'normal' : 'hello'}`}>
        {this.imgDiv('hello', href, text, alt, src, exHref, target, details)}
        {details && <div className="card-details">{details}</div>}
        {detailsHtml && detailsHtml.map((i, j) => {
          return <div key={j} className={''} dangerouslySetInnerHTML={this.createMarkup(detailsHtml[j])} />
        })}
        {btn && <div className="card-btn">
          <NavLink
              exact
              to={`${href}`}
              className="btn btn-lg btn-secondary-outline btn-secondary"
            >
              {btn}
            </NavLink>
          </div>
        }
      </div>
    );
  }
}
export default ImageCard;