import React, { Component } from 'react'
import "./index.scss";
import Header from '../../Header';
import Section from '../../Section';
import Footer from '../../Footer';
class SubPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  componentDidMount() {
    $('html, body').animate({
      scrollTop: 0
    }, 400);
  }
  render() {
    const { subPages, headerContent } = this.props;
    const sectionData = subPages;
    if(!headerContent) {
      $('.navbar').addClass('nav-scrolled-top direct-page');
    } else {
      $('.navbar').removeClass('nav-scrolled-top direct-page');
    }
    return (
      <div className="home-page">
        {headerContent && <Header {...this.props} slider={headerContent.slider} />}
        {
          sectionData.map((item, index) => {
            return (<Section key={index} sectionData={item} />)
          })
        }
        <Footer />
      </div>
    )
  }
}
export default SubPages