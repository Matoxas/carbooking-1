import React from "react";

const Topbar = () => {
  return (
    <div className="topbar margin-bottom min-height">
      <div className="topbar-content">
        <div className="form-group">
          <label htmlFor="inputState">Miestas:</label>
          <div className="relative">
            <select className="form-control" id="inputState">
              <option>Vilnius</option>
              <option>Klaipėda</option>
              <option defaultValue>Šiauliai</option>
              <option>Alytus</option>
            </select>
            <i className="fa fa-caret-down" aria-hidden="true" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputState">Rodoma:</label>
          <div className="relative">
            <select className="form-control" id="inputState">
              <option defaultValue>Naujausi viršuje</option>
              <option>Seniausi viršuje</option>
              <option>Pigiausi viršuje</option>
              <option>Brangiausi viršuje</option>
            </select>
            <i className="fa fa-caret-down" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

{
  /* <i class="fa fa-caret-down" aria-hidden="true"></i> */
}
