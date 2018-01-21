import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => (
  <div className="">
    <header className="navbar" style={{marginTop:"10px"}}>
      <section className="navbar-center">
         <img src="Stukent_Signature_BlueBlue2751.png"></img>
      </section>
    </header>
    <div style={{height: "30px"}}></div>
    <h1 style={{textAlign: "center"}}>Posts</h1>
    <div className="">
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Published</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.posts}
      </tbody>
    </table>
    </div>
    <br/>
  </div>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
}
export default Posts;
