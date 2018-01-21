import React, { Component } from 'react';
// components
import Posts from './Posts'
import Create from './Create'
import Show from './Show'
import Post from './Post'
import Header from './Header'
import Search from './Search'
import Fact from '../helpers/Fact';
import Modal from 'react-modal';


class App extends Component {
  constructor() {
    super();

    this.state = {
      newPost: false,
      editPost: false,
      showPost: false,
      posts: [],
      search: "",
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
    this.handleChange = this.handleChange.bind(this)

  };

  // renderPosts on app load
  componentDidMount() {
    this.renderPosts()
  }

  componentWillMount() {
    Modal.setAppElement("body");
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
  deletePost(post) {
    return fetch("/posts/" + post.id, {
      method: 'DELETE',
      })
    .then(response => {
      if(response.ok) {
        this.renderPosts()
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

  handleSearch(value) {
    fetch("/posts.json?term=" + value)
    .then((resp) => resp.json())
    .then((data) => {
      this.setIndexPosts(data)
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleSearch(e.target.value)
  }

  getParent() {
    return document.querySelector(".main");
  }

  // creates posts for index
  setIndexPosts(data) {
    let posts = data.map((post) => {
      return(
        <Post
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
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <div>
        <Modal isOpen={this.state.newPost} style={customStyles}>
        <Create handleSubmit={this.createPost} handleNew={this.handleNew} editPost={this.editPost}/>
        </Modal>
        <Modal isOpen={this.state.editPost} style={customStyles}>
        <Create handleSubmit={this.patchPost} post={this.state.post} edit={this.state.editPost}  editPost={this.editPost}/>
        </Modal>
        <Modal isOpen={this.state.showPost} style={customStyles}>
        <Show post={this.state.post} editPost={this.editPost} showPost={this.showPost} />
        </Modal>

        <div className="main">
          <Header />
          <Posts posts={this.state.posts} />
          <button className="btn btn-primary" onClick={(e) => this.handleNew(e)}>New Post</button>
          <Search search={this.state.search} handleChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default App;
