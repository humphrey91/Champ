import React, { Component } from 'react';

// components
import Posts from './Posts'
import Create from './Create'
import Show from './Show'

class App extends Component {
  constructor() {
    super();

    this.state = {
      newPost: false,
      editPost: false,
      showPost: false,
      posts: [],
      post: {
        id: "",
        title: "",
        body: "",
        published: false,
      }
    }

    this.createPost = this.createPost.bind(this)
    this.patchPost = this.patchPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.showPost = this.showPost.bind(this)
    this.handleNew = this.handleNew.bind(this)
  };

  // renderPosts on app load
  componentDidMount() {
    this.renderPosts()
  }

  // toggles index/create
  handleNew() {
    this.setState(prevState => ({
      newPost: !prevState.newPost
    }));
  }

  // toggles index/edit
  editPost() {
    this.setState(prevState => ({
      editPost: !prevState.editPost,
    }));
  }

  showPost() {
    this.setState(prevState => ({
      showPost: !prevState.showPost,
    }))
  }

  setPost(post) {
    this.setState({
      post: post,
    })
  }
  // handles delete request
  deletePost(post, i) {
    return fetch("/posts/" + post.id, {
      method: 'DELETE',
      })
    .then(response => {
      if(response.ok) {
        this.removePostAt(i)
      }
    })
  }

  // handles create request
  createPost(e, state) {
    e.preventDefault();
    return fetch("/posts", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          // pass state from <Create />
          "post": state,
        })
      })
    .then(response => {
      if(response.ok) {
        // toggle index page
        this.handleNew()
        this.renderPosts()
      } else {
        alert("Please input a title and a body.")
      }
    })
  }

  patchPost(e, state) {
    e.preventDefault();
    return fetch("/posts/" + state.id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          // pass state from <Create />
          "post": state,
        })
      })
    .then(response => {
      if(response.ok) {
        // toggle index page
        this.editPost()
        this.renderPosts()
      } else {
        alert("Please input a title and a body.")
      }
    })
  }

  // handles index request
  renderPosts() {
    fetch("/posts.json")
    .then((resp) => resp.json())
    .then((data) => {
      this.setIndexPosts(data)
    })
  }

  // set new state for posts after delete
  removePostAt(index) {
    this.setState({
      posts: [
        ...this.state.posts.slice(0, index),
        ...this.state.posts.slice(index + 1)
      ]
    })
  }


  // TODO: refactor post into its own class
  setIndexPosts(data) {
    let posts = data.map((post, i) => {
      return(
        <tr key={post.id}>
          <td>{post.title}</td>
          <td>{post.body}</td>
          <td>{post.published.toString()}</td>
          <td>
            <button className="btn btn-primary btn-sm" title="show" onClick={() => {this.showPost(); this.setPost(post)}}>
              <i className="icon icon-search"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-primary btn-sm" title="edit" onClick={() => {this.editPost(); this.setPost(post)}}>
              <i className="icon icon-edit"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-primary btn-sm" title="delete" onClick={() => {if(confirm("Are you sure?")) {this.deletePost(post, i)};}}>
              <i className="icon icon-delete"></i>
            </button>
          </td>
        </tr>
      )
    })
    this.setState({posts: posts});
  }

  render() {
    let page = null;
    if (this.state.newPost) {
      page = <Create handleSubmit={this.createPost} handleNew={this.handleNew}/>
    } else if (this.state.editPost) {
      page = <Create handleSubmit={this.patchPost} post={this.state.post} edit={this.state.editPost}  editPost={this.editPost}/>
    } else if (this.state.showPost) {
      page = <Show post={this.state.post} editPost={this.editPost} showPost={this.showPost} />
    } else {
      page =
      <div>
        <Posts posts={this.state.posts} />
        <button className="btn btn-primary" onClick={(e) => this.handleNew(e)}>New Post</button>
      </div>
    }
    return (
      <div>
        {page}
      </div>
    )
  }
}

export default App;
