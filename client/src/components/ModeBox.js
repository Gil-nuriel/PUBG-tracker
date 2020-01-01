import React, { Fragment, Component } from "react";

export default class ModeBox extends Component {
  getGameMode = i => {
    if (i === 0) return "Due";
    if (i === 1) return "FPP-Due";
    if (i === 2) return "Solo";
    if (i === 3) return "FPP-Solo";
    if (i === 4) return "Squed";
    if (i === 5) return "FPP-Squad";
  };

  render() {
    const { stats } = this.props;
    const { getGameMode } = this;
    return (
      <Fragment>
        {stats[0].map((mode, i) => (
          <ul className="list-group mr-2 ml-2" key={i}>
            <h5>{getGameMode(i)}</h5>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Kills
              <span className="badge badge-danger badge-pill ml-1">
                {mode.kills}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Most Kills
              <span className="badge badge-danger badge-pill ml-1">
                {mode.roundMostKills}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Wins
              <span className="badge badge-danger badge-pill ml-1">
                {mode.wins}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Losses
              <span className="badge badge-danger badge-pill ml-1">
                {" "}
                {mode.losses}
              </span>
            </li>
          </ul>
        ))}
      </Fragment>
    );
  }
}
