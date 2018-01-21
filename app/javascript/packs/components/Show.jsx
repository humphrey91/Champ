import React, { Component } from 'react';


class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
      id: '',
      title: '',
      body: '',
      published: false,
      fact: '',
    },
    edit: false,
    };
  }

  componentDidMount() {
    this.setState({
      post: this.props.post,
    })
  }

  render() {
    return (
      <div className="col-10 col-mx-auto">
          <h1 className="card-title h1" style={{textAlign: "center"}}>Post</h1>
        <div className="col-10 col-mx-auto">
          <p>
            <strong>Title: </strong>
            {this.state.post.title}&nbsp;{this.state.post.fact}
          </p>
        </div>
        <div className="col-10 col-mx-auto">
            <p>
              <strong>Body: </strong>
              {this.state.post.body}
            </p>
        </div>
        <div className="col-10 col-mx-auto">
          <p>
            <strong>Published: </strong>
            {this.state.post.published.toString()}
          </p>
          <button className="btn btn-primary btn-md" title="edit" onClick={() => {this.props.showPost();this.props.editPost()}}>
            <i className="icon icon-edit"></i>
          </button>
          <button style={{marginLeft: "3px"}} className="btn btn-primary btn-md" onClick={() => this.props.showPost()}>
            <i className="form-icon icon icon-back"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Show;
