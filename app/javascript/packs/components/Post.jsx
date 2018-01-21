import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => (
  <tr>
    <td>{props.post.title}</td>
    <td>{props.post.body}</td>
    <td>{props.post.published.toString()}</td>
    <td>
      <button className="btn btn-primary btn-sm" title="show" onClick={() => {props.showPost(); props.setPost(props.post)}}>
        <i className="icon icon-search"></i>
      </button>
    </td>
    <td>
      <button className="btn btn-primary btn-sm" title="edit" onClick={() => {props.editPost(); props.setPost(props.post)}}>
        <i className="icon icon-edit"></i>
      </button>
    </td>
    <td>
      <button className="btn btn-primary btn-sm" title="delete" onClick={() => {if(confirm("Are you sure?")) {props.deletePost(props.post, props.index)};}}>
        <i className="icon icon-delete"></i>
      </button>
    </td>
  </tr>
)

Post.propTypes = {
  showPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

export default Post;
