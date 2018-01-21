import React from 'react';
import PropTypes from 'prop-types';


const CreateForm = (props) => (
  <div className="container col-mx-auto">
    <div className="columns">
      <div className="col-12 col-mx-auto">
        <h1 style={{textAlign: "center"}}>New Post</h1>
      </div>
      <div className="col-mx-auto">

        <form>
          <div className="form-group">
              <div className="has-icon-left">
                <input name="title" type="text" value={props.post.title} onChange={(e) => props.handleInputChange(e)} placeholder="Title" className="form-input input-md"/>
                <i className="form-icon icon icon-arrow-right"></i>
              </div>
          </div>
          <div className="form-group">
              <div className="has-icon-left">
                <textarea name="body" value={props.post.body} onChange={(e) => props.handleInputChange(e)} placeholder="Body" className="form-input input-md"/>
                <i className="form-icon icon icon-arrow-right"></i>
              </div>
          </div>
          <div className="form-group">
              <label className="form-checkbox">
                <input name="published" value={props.post.published} type="checkbox" onChange={(e) => props.handleInputChange(e)}/>
                <i className="form-icon"></i> Published
              </label>
          </div>
          <div className="actions">
            <button className="btn btn-primary btn-sm" type="button" onClick={(e) => {props.handleSubmit(e, props)}}>{props.edit ? 'Submit' : 'Creat Post'}</button>
            <button style={{marginLeft: "3px"}} type="button" className="btn btn-primary btn-sm" onClick={(e) => {props.edit ? props.editPost() : props.handleNew()} } >
              <i className="form-icon icon icon-back"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

CreateForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  handleNew: PropTypes.func,
  edit: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  fact: PropTypes.number,
}

export default CreateForm;
