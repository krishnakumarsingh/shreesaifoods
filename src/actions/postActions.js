import { FETCH_POSTS, NEW_POST, FETCH_DATA } from './types';

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const fetchDataPosts = () => dispatch => {
  fetch('./data.json')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_DATA,
        payload: posts
      })
    );
};
export const createPost = postData => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};

export const loginCheck = loginChecked => dispatch => {
  console.log({ loginChecked });
};