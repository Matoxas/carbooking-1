import React from "react";

const Topbar = () => {
  return (
    <div className="topbar margin-bottom min-height">
      <div className="topbar-content">
        {/* <form class="form-inline"> */}
        <div class="form-group">
          <label for="inputState">Vieta: </label>
          <select id="inputState" class="form-control">
            <option selected>Vilnius</option>
            <option>...</option>
          </select>
        </div>
        {/* </form> */}

        {/* <form class="form-inline"> */}
        <div class="form-group">
          <label for="inputState">Rodyti</label>
          <select id="inputState" class="form-control">
            <option selected>Naujausi viršuje</option>
            <option>Seniausi viršuje</option>
            <option>Pigiausi viršuje</option>
            <option>Brangiausi viršuje</option>
          </select>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Topbar;
