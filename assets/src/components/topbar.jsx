import React from "react";

const Topbar = () => {
  return (
    <div className="topbar margin-bottom min-height">
      <div className="topbar-content">
        <div className="form-group">
          <label htmlFor="inputState">Vieta: </label>
          <select id="inputState" className="form-control">
            <option defaultValue>Vilnius</option>
            <option>...</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputState">Rodyti</label>
          <select id="inputState" className="form-control">
            <option defaultValue>Naujausi viršuje</option>
            <option>Seniausi viršuje</option>
            <option>Pigiausi viršuje</option>
            <option>Brangiausi viršuje</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
