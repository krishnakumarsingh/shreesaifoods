import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';
import './index.scss';
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      body: '',
      id: 501,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.initFileUploads = this.initFileUploads.bind(this);
  }
  onChange(e) {
    if(e.target.name === 'file') {
      this.initFileUploads(e);
      this.setState({ [e.target.name]: e.target.value });
      //console.log(e.target.name, e.target.value);
    } else {
      //console.log(e.target.name, e.target.value);
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  initFileUploads(e) {
    var fileName = e.target.value;
    var allowed_extensions = new Array("jpg","png","gif");
    var file_extension = fileName.split('.').pop().toLowerCase();
    for(var i = 0; i <= allowed_extensions.length; i++) {
      if(allowed_extensions[i]==file_extension) {
        this.setState({ [e.target.name]: e.target.value });
        return true;
      }
    }
    this.setState({ [e.target.name]: '' }, () => {
      //console.log('No', this.state.file);
    });
    
    return false;
  }
  onBlur(e) {
    if(e.target.value) {
      $(e.target).addClass('active');
      
    } else {
      $(e.target).removeClass('active');
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      name: this.state.name,
      email: this.state.email,
      body: this.state.body,
      id: ++this.state.id,
    };
    this.props.createPost(post);
    this.setState({
      name: '',
      email: '',
      body: '',
      id: '',
    });
    $('.form-control').removeClass('active');
  }
  render() {
    return (
      <div className="container blogs">
        <h1>Blog Headline</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-12 mb-md-0 mb-12">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.name}
                  id="name"
                />
                <label htmlFor="name">Title:</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.email}
                  id="email"
                />
                <label htmlFor="email">Email:</label>
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  name="body"
                  maxLength="200"
                  className="form-control md-textarea"
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.body}
                  id="body"
                />
                <label htmlFor="body">Message:</label>
              </div>
              <div className="form-group fileinputs">
                <input
                  type="file"
                  name="file"
                  className="form-control file"
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.file}
                  id="file"
                />
                <div className="fakefile">
                  <input
                    type="text"
                    name="file"
                    className="form-control file-show"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={this.state.file}
                    id="file"
                  />
                  <label htmlFor="file">File:</label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-md-left">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
          <div className="status"></div>
        </form>
      </div>
    )
  }
}

Blogs.propTypes = {
  createPost: PropTypes.func.isRequired
};
export default connect(null, { createPost })(Blogs);