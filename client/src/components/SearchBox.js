import React, { Fragment, Component } from "react";

export default class SearchBox extends Component {
  render() {
    const { handleChange, showStats } = this.props;
    return (
      <div className="card-body">
        <Fragment>
          <input
            type="text"
            placeholder="Insert Platform"
            className="ml-2 mr-2"
            onChange={e => handleChange("platform", e)}
          />
          <input
            type="text"
            placeholder="Insert Gamertag"
            className="ml-2 mr-2"
            onChange={e => handleChange("gamertag", e)}
          />

          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => showStats()}
          >
            Search
          </button>
        </Fragment>
      </div>
    );
  }
}
