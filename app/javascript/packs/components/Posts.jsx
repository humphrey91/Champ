import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => (
  <div className="">
    <h1>Posts</h1>
    <table className="table table-scroll">
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

  <br />

  </div>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
}
export default Posts;
