import React, { Component } from 'react';
import CreateForm from './CreateForm';


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: "",
        title: "",
        body: "",
        published: false,
        fact: "",
      },
      edit: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // set form state if edit
  componentDidMount() {
    if(this.props.edit) {
      this.setState({
        edit: true,
        post: this.props.post,
      })
    }
  }

  // handle for changes
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
    const newPost = Object.assign({}, this.state.post)
    newPost[name] = value
    this.setState({
      post: newPost
    });
  }
  
  render() {
    return (
      <CreateForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.props.handleSubmit}
        editPost={this.props.editPost}
        handleNew={this.props.handleNew}
        edit={this.state.edit}
        post={this.state.post}
      />
    );
  }
}

export default Create;
