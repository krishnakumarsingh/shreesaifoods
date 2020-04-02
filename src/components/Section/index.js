import React from "react";
import "./index.scss";
import ImageCard from '../ImageCard';
import ContactUs from '../ContactUs';
import MapComponent from '../Map';
import ListItems from '../ListItems';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      mapStyles: {width:'100%',height: '25rem'},
      mapCenter: {lat: 12.925453, lng: 77.546761},
      mapApiKey: 'GOOGLE_API_KEY',
      mapZoom: 20,
    };
  }
  createMarkup(html) {
    return {__html: html};
  }
  counterAnimate() {
    //var $animation_elements = $('.animation-element');
    var $window = $(window);
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    //console.log('hello here', $('.page-section'));
    $('.page-section').map(function(i, j) {
      //console.log(i, j);
      if ($(j).is(":visible")) {
        $('.red').removeClass('red');
        $(j).addClass('red');
      } else {
        // $('.page-section').removeClass('red');
      }
    });
    var $element = $('.items-count__row-count span');
    if($element.length) {
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view done');
      }
      $('.items-count__row-count span.in-view').not('.done').each(function () {
        var $this = $(this);
        jQuery({ Counter: () => {
            if ($this.text() > 1000)
              return 10000
            else
              return 0
          }
        }).animate({ Counter: $this.data('val') }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(
              () => {
                if (12000 - 100 < Math.ceil(this.Counter)) return 12000
                else return Math.ceil(this.Counter)
              }
            );
            $this.addClass('done');
          }
        });
      });
    }
  }
  componentDidMount() {
    var $this = this;
    //console.log($this);
    $(document).scroll(function() {
      $this.counterAnimate();
    });
    //$(document).scroll();
  }
  render() {
    const {
      id,
      classItem,
      h2,
      h3,
      para,
      imageCard,
      imageCardAble,
      imgItemShow,
      map,
      childHtml,
      hrHide,
      childHtmlImg,
      counter,
      grid,
      imageCardHtml,
      imageCardHalf,
      imgLeft,
      listItemsBol,
      addToCarts
    } = this.props.sectionData;
    const { mapApiKey, mapZoom, mapStyles, mapCenter } = this.state;
    var groupSize = imgItemShow;
    var ImageCardRow = imageCard.map(function(item, index) {
        return <ImageCard key={index} item={item} />;
      }).reduce(function(r, element, index) {
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
      }, []).map(function(rowContent, index) {
        return <div key={index} className={`card-group ${imageCard.length === 2 ? 'two-card': ''} col-sm-12`}>{rowContent}</div>;
    });
    return (
      <section id={id} className={`page-section ${classItem}`} data-animate-in="fadeIn" data-animate-in-delay="100">
        {(h2 !== "" || h3 !== "") && <div className="base-section base-section__container">
          <div className="container">
            <div className="row">
              {imageCardHalf && <div className={`col-md-${grid[1]} image-card-half ${imgLeft ? 'align-left' : ''}`} >
                <div className="base-cards">
                  <div className="container">
                    <div className="row">{ImageCardRow}</div>
                  </div>
                </div>
              </div>}
              <div className={`col-md-${grid[0]} header-sec ${grid[0] === 12 ? 'w-100' : ''}`}>
                {h2 !== "" && <h2 className="KaushanScript h2-head-sec">
                  {h2}
                  <hr className="brdr" />
                </h2>}
                {h3 !== "" && <h3 className="Montserrat h3-head-sec">{h3}</h3>}
                {
                  para.map((item, index) => {
                    return (<p key={index} className="sec-para Roboto">{item}</p>)
                  })
                }
              </div>
              {imageCardHalf && <div className={`col-md-${grid[1]} image-card-half sec-img`}>
                <div className="base-cards">
                  <div className="container">
                    <div className="row">{ImageCardRow}</div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>}
        {imageCardAble && <div className="base-cards">
          <div className="container">
            <div className="row">{ImageCardRow}</div>
          </div>
        </div>}
        {listItemsBol && <ListItems addToCarts={addToCarts} />}
        {map && <div className='map-section'>
          <MapComponent
            apiKey={mapApiKey}
            zoom={mapZoom}
            mapStyles = {mapStyles}
            center={mapCenter}
            initialCenter={mapCenter}
          />
        </div>}
        {map && 
          <div className="base-contact">
            <ContactUs />
          </div>
        }
        {childHtmlImg && <div className='container-fluid'><div className='row'><img className='img-fluid' src={require(`../../assets/images/${childHtmlImg}`)} /></div></div>}
        {childHtml && <div className={''} dangerouslySetInnerHTML={this.createMarkup(childHtml)} />}
        {(hrHide === undefined || hrHide !== true) && <hr className="sec-btm" />}
      </section>
    );
  }
}
export default Section;