import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
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
            {this.props.posts}
          </tbody>
        </table>

      <br />

      </div>
    );
  }
}

export default Posts;
