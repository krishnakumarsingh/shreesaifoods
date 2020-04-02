import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    const { apiKey, zoom, mapStyles, center, initialCenter } = this.props;
    return (
      <iframe
        width='100%'
        height='100%'
        id='mapcanvas'
        src='https://maps.google.com/maps?q=NO%2070/A,%202ND%20Main,%20Kathriguppe%20East%20%20BSK%203RD%20Stage,%20Bangalore%20%20Karnataka,%20560085,%20%20India&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=&amp;output=embed'
        frameBorder='0'
        scrolling='no'
        marginHeight='0'
        marginWidth='0'
      >
        <div
          className="zxos8_gm"
        >
          <a rel="nofollow"  href="https://sites.google.com/site/wistfulvariance/apple-iphone-11-pro-deals">iphone 11 deals</a>
        </div>
        <div><div id='gmap_canvas'></div></div><div><small>Powered by <a href="https://www.embedgooglemap.co.uk">Embed Google Map</a></small></div>
      </iframe>
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'GOOGLE_API_KEY',
    language: props.language,
  }
))(MapComponent);