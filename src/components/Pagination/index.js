import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';
import './index.scss';
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentPage: this.props.currentPage,
      todosPerPage: this.props.todosPerPage,
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
    this.props.currentPageId(event.target.id);
  }
  render() {
    const { posts } = this.props;
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = posts.slice(indexOfFirstTodo, indexOfLastTodo);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(posts.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number, j) => {
      return (
        <li
          key={number}
          className={'page-item page-'+(j+1)}
        >
          <a
          className="page-link"
          href="#"
          id={number}
          onClick={this.handleClick}>{number}</a>
        </li>
      );
    });
    return (
      <div className="clearfix">
        <ul id="page-numbers" className={"pagination pagination-lg custom-pagination-css currentPage-"+currentPage}>
          <li className="page-item not-h"> 
            <a
              className="page-link"
              href="#"  
              id={currentPage === 0 ? 0 : currentPage - 1}
              onClick={this.handleClick}
            >Previous</a> 
          </li>
          {renderPageNumbers}
          <li className="page-item not-h"> 
            <a
              className="page-link"
              href="#"
              id={currentPage === renderPageNumbers.length ? renderPageNumbers.length : currentPage + 1}
              onClick={this.handleClick}
            >Next</a> 
          </li> 
        </ul>
      </div>
    )
  }
}

export default Pagination;