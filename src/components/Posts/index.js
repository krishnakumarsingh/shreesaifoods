import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import Pagination from '../Pagination';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      todosPerPage: 12,
    }
    this.fnMount = this.fnMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.chunkArray = this.chunkArray.bind(this);
    this.equalHeight = this.equalHeight.bind(this);
  }
  handleClick(currentPageId) {
    this.setState({
      currentPage: currentPageId
    });
  }
  fnMount(e) {
    //console.log(e.target);
    var that = $(e.target);
    if(that.hasClass('more')) {
      that.text('Read Less..').removeClass('btn-primary more').addClass('btn-light less').siblings('.card-text').find('.complete').show();
    } else {
      that.text('Read More →').removeClass('btn-light less').addClass('btn-primary more').siblings('.card-text').find('.complete').hide();
    }
  }
  componentWillMount() {
    this.props.fetchPosts();
  }
  equalHeight(container, element) {
    $(container).each(function(){  
      var highestBox = 0;
      $(this).find(element).each(function(){
        if($(this).height() > highestBox){  
          highestBox = $(this).height();  
        }
      })
      $(this).find(element).height(highestBox);
    });    
  }
  componentDidUpdate() {
    this.equalHeight('.blogs-item .row', '.card-title');
    this.equalHeight('.blogs-item .row', '.card-img-top');
    this.equalHeight('.blogs-item .row', '.card-text');
    this.equalHeight('.blogs-item .row', '.card-footer');
  }
  /* componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  } */
  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.newPost !== prevState.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }
  chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    var y = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        var myChunk = myArray.slice(index, index+chunk_size);
        
        // Do something if you want with the group
        tempArray.push(myChunk);
    }
    var x = [];
    if(tempArray.length) {
      tempArray.map((i1, j1) => {
        x = tempArray[j1].map((post, j) => (
        <div key={j} className={`col-md-4 ` }>
          <div className="card mb-4">
            <img className="card-img-top" src="http://placehold.it/750x300" alt="Card image cap" />
            <div className="card-body">
              <h2 className="card-title">{post.name}</h2>
              <p className="card-text">
                <span className="teaser">{`${post.body.substring(0, 100)}`}</span>
                <span className="complete">{`${post.body.substring(101, post.body.length)}`}</span>
              </p>
              <button className="btn btn-primary more" onClick={this.fnMount}>Read More →</button>
            </div>
            <div className="card-footer text-muted">
              Posted on January 1, 2017 by &nbsp;
              <a href="#">{post.email}</a>
            </div>
          </div>
        </div>
        ));
        y.push(<div className="row" key={j1} >{x}</div>);
      });
    }
    return y;
  }
  render() {
    const { currentPage, todosPerPage, language } = this.state;
    const { posts } = this.props;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = posts.slice(indexOfFirstTodo, indexOfLastTodo);
    const pageNumbers = [];
    var result = this.chunkArray(currentTodos, 3);
    const postItems = currentTodos.map((post, j) => (
      <div key={j} className={`col-md-4 ${j % 3 === 0 ? 'one': ''}` }>
        <div className="card mb-4">
          <img className="card-img-top" src="http://placehold.it/750x300" alt="Card image cap" />
          <div className="card-body">
            <h2 className="card-title">{post.name}</h2>
            <p className="card-text">
              <span className="teaser">{`${post.body.substring(0, 100)}`}</span>
              <span className="complete">{`${post.body.substring(101, post.body.length)}`}</span>
            </p>
            <button className="btn btn-primary more" onClick={this.fnMount}>Read More →</button>
          </div>
          <div className="card-footer text-muted">
            Posted on January 1, 2017 by &nbsp;
            <a href="#">{post.email}</a>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="container">
        <h1>Posts</h1>
        <Pagination posts={posts} currentPage={currentPage} todosPerPage={todosPerPage} currentPageId={this.handleClick} />
        <div className=" blogs-item">
          {result}
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);