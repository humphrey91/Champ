import React from 'react';
import PropTypes from 'prop-types';

const Search = props => (
  <div className="input-group input-inline" style={{float:"right",marginRight:"10px"}}>
    <input name="search" value={props.search} style={{maxWidth:"200px"}} className="form-input" type="text" placeholder="search" onChange={(e) => props.handleChange(e)}/>
  </div>
)

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
}

export default Search;
