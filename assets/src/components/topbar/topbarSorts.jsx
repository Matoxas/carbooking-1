import React from "react";
import "./topbar.css";

const TopbarSorts = props => {
  return (
    <div className="form-group">
      <label className="d-md-none" htmlFor="inputState">
        Rodoma:
      </label>
      <div className="relative">
        <select
          onChange={props.handleSortChange}
          className="form-control"
          id="inputState"
          value={props.sort_filter}
        >
          <option value="naujausi">Naujausi viršuje</option>
          <option value="seniausi">Seniausi viršuje</option>
          <option value="pigiausi">Pigiausi viršuje</option>
          <option value="brangiausi">Brangiausi viršuje</option>
        </select>
        <i className="fa fa-caret-down" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TopbarSorts;
