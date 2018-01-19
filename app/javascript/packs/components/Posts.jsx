import React, { Component } from 'react';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  deletePost(post) {
    return fetch("http://localhost:5000/posts/" + post.id, {
      method: 'DELETE',
      })
    .then(results => {
      this.renderPosts()
    });
  }

  renderPosts(data) {
    fetch("http://localhost:5000/posts.json")
    .then(results => {
      return results.json()
    }).then(data => {
      console.log(data)
      let posts = data.map((post) => {
        return(
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.body}</td>
            <td>{post.published.toString()}</td>
            <td>
              <button className="btn btn-primary btn-sm" title="show">
                <i className="icon icon-search"></i>
              </button>
            </td>
            <td>
              <button className="btn btn-primary btn-sm" title="edit">
                <i className="icon icon-edit"></i>
              </button>
            </td>
            <td>
              <button className="btn btn-primary btn-sm" title="delete" onClick={() => {if(confirm("Are you sure?")) {this.deletePost(post)};}}>
                <i className="icon icon-delete"></i>
              </button>
            </td>
          </tr>
        )
      })
      this.setState({posts: posts});
    })
  }

  componentDidMount() {
    this.renderPosts()
  }

  render() {
    return (
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
            {this.state.posts}
          </tbody>
        </table>
      <br />
      <a href="/posts/new" className="btn btn-primary">New Post</a>
      </div>
    );
  }
}

export default Posts;
