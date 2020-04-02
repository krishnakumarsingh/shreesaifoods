import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';
import './index.scss';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message,
    };
    //console.log(post);
    $.ajax({  
      type: 'POST',//http://2formatics.com/
      url: /* process.env.NODE_ENV !== "production" ? '/email.php' :  */"http://2formatics.com/email.php",
      data: {
        name: $('#form1-2h-name').val(),
        email: $('#form1-2h-email').val(),
        phone: $('#form1-2h-phone').val(),
        message: $('#form1-2h-message').val(),
      },
      success: function(response) {
        //console.log(response);
        $('#message-show').html(response);
        $('#form1-2h-name').val('');
        $('#form1-2h-email').val('');
        $('#form1-2h-phone').val('');
        $('#form1-2h-message').val('');
        setTimeout(function() {
          $('#message-show > div').fadeOut(2000, function() {
            $('#message-show').html('');
          });
        }, 4000);
      }
    });
    this.props.createPost(post);
    console.log('Loading..');
  }
  render() {
    return (
      <div className="contact-us-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div className="pb-2">
                <h5 className="Roboto font-weight-bold pb-2">2FORMATICS SOLUTIONS PRIVATE LIMITED</h5>
                <p>NO 70/A, 2ND Main, Kathriguppe East</p>
                <p>BSK 3RD Stage, Bangalore</p>
                <p>Karnataka, 560085,</p>
                <p>India</p>
              </div>
              <div className="pb-2">
                <p className="Roboto font-weight-bold">Contacts</p>
                <p>Email: info@2formatics.com<br/></p>
                <p>GSTIN: 29AABCZ3559M1ZL<br/></p>
                <p>Phone: +91 974 3155 846</p><br/>
              </div>
              <div className="pb-2">
                <h6 className="Roboto">Web Development & Support</h6>
                <p>Phone: +91 953 4080 086</p><br/>
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div id="message-show" />
              <form onSubmit={this.onSubmit} autoComplete="off">
                <div className="row">
                  <div className="col-md-4">
                    <div className="md-form mb-0">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        required="required"
                        onChange={this.onChange}
                        value={this.state.name}
                        id="name"
                      />
                      <label htmlFor="name" className="">Name<sup>*</sup></label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="md-form mb-0">
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        required="required"
                        onChange={this.onChange}
                        value={this.state.email}
                        id="email"
                      />
                      <label htmlFor="email" className="">Email<sup>*</sup></label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="md-form mb-0">
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        required="required"
                        onChange={this.onChange}
                        value={this.state.phone}
                        id="phone"
                      />
                      <label htmlFor="phone" className="">Phone<sup>*</sup></label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mt-2">
                      <textarea
                        className="form-control"
                        name="message"
                        required="required"
                        data-form-field="Message"
                        id="message"
                        value={this.state.message}
                        onChange={this.onChange}
                      ></textarea>
                      <label className="form-control-label text-white" htmlFor="message">Message<sup>*</sup></label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-black submit-form">
                      <span className="btn-text">CONTACT US</span>
                      <i className="btn-loader"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ContactUs.propTypes = {
  createPost: PropTypes.func.isRequired
};
export default connect(null, { createPost })(ContactUs);