import React, { Component } from 'react';


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      body: '',
      published: false,
      edit: false,
    };
  }

  componentDidMount() {

    if(this.props.edit) {
      this.setState({
        id: this.props.post.id,
        title: this.props.post.title,
        body: this.props.post.body,
        published: this.props.post.published,
        edit: true,
      })
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name

    this.setState({[name]:value});
  }

  render() {
    return (
      <div className="container col-mx-auto">
        <div className="columns">
          <div className="col-12 col-mx-auto">
            <h1 style={{textAlign: "center"}}>New Post</h1>
          </div>
          <div className="col-mx-auto">

            <form>
              <div className="form-group">
                  <div className="has-icon-left">
                    <input name="title" type="text" value={this.state.title} onChange={(e) => this.handleInputChange(e)} placeholder="Title" className="form-input input-md"/>
                    <i className="form-icon icon icon-arrow-right"></i>
                  </div>
              </div>
              <div className="form-group">
                  <div className="has-icon-left">
                    <textarea name="body" value={this.state.body} onChange={(e) => this.handleInputChange(e)} placeholder="Body" className="form-input input-md"/>
                    <i className="form-icon icon icon-arrow-right"></i>
                  </div>
              </div>
              <div className="form-group">
                  <label className="form-checkbox">
                    <input name="published" value={this.state.published} type="checkbox" onChange={(e) => this.handleInputChange(e)}/>
                    <i className="form-icon"></i> Published
                  </label>
              </div>
              <div className="actions">
                <button className="btn btn-primary btn-sm" type="button" onClick={(e) => this.props.handleSubmit(e, this.state)}>{this.state.edit ? 'Submit' : 'Creat Post'}</button>
                <button style={{marginLeft: "3px"}} type="button" className="btn btn-primary btn-sm" onClick={(e) => {this.state.edit ? this.props.editPost() : this.props.handleNew()} } >
                  <i className="form-icon icon icon-back"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
