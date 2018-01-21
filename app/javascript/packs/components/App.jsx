import React, { Component } from 'react';
// components
import Posts from './Posts'
import Create from './Create'
import Show from './Show'
import Post from './Post'
import Fact from '../helpers/Fact';

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
        fact: "",
      }
    }

    this.createPost = this.createPost.bind(this)
    this.patchPost = this.patchPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.showPost = this.showPost.bind(this)
    this.handleNew = this.handleNew.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.setPost = this.setPost.bind(this)
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

  // set post on show
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
    const fact = Fact(Math.floor((Math.random() * 10) + 1))
    const newPost = Object.assign({}, state.post);
    newPost.fact = fact;
    e.preventDefault();
    return fetch("/posts", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          // pass state from <Create />
          "post": newPost,
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

  // handle patch request for post
  patchPost(e, state) {
    const fact = Fact(Math.floor((Math.random() * 10) + 1))
    const newPost = Object.assign({}, state.post);
    newPost.fact = fact;
    e.preventDefault();
    return fetch("/posts/" + state.post.id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          // pass state from <Create />
          "post": newPost,
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

  // creates posts for index
  setIndexPosts(data) {
    let posts = data.map((post, i) => {
      return(
        <Post
          index={i}
          key={post.id}
          post={post}
          showPost={this.showPost}
          editPost={this.editPost}
          setPost={this.setPost}
          deletePost={this.deletePost}
        />
      )
    })
    this.setState({posts: posts});
  }

  render() {
    let page = null;
    // render for create
    if (this.state.newPost) {
      page = <Create handleSubmit={this.createPost} handleNew={this.handleNew} editPost={this.editPost}/>
      // render for edit
    } else if (this.state.editPost) {
      page = <Create handleSubmit={this.patchPost} post={this.state.post} edit={this.state.editPost}  editPost={this.editPost}/>
      // render for show
    } else if (this.state.showPost) {
      page = <Show post={this.state.post} editPost={this.editPost} showPost={this.showPost} />
      // render for index
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
