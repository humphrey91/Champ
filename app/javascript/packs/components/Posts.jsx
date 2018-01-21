import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => (
  <div className="">
    <h1 style={{textAlign: "center"}}>Posts</h1>
    <div className="">
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Published</th>
          <th colSpan="3"></th>
        </tr>
      </thead>
      <tbody>
        {props.posts}
      </tbody>
    </table>
    </div>
    <br/>
  </div>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
}
export default Posts;
