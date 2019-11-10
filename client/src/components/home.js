import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: null,
      gamertag: null,
      stats: [],
      soloFP: [],
      solo: [],
      duoFP: [],
      duo: [],
      squadFP: [],
      squad: [],
      leaders: [],
      gameMode: "solo",
      loading: false,
      rerender: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`http://localhost:8080/leaders/${this.state.gameMode}`)
      .then(response => {
        console.log(response.data.data);
        for (let i = 0; i <= 9; i++) {
          this.setState({
            leaders: [
              ...this.state.leaders,
              response.data.included[i].attributes.name
            ]
          });
          this.setState({ loading: false });
        }
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.rerender === true) {
      axios
        .get(`http://localhost:8080/leaders/${this.state.gameMode}`)
        .then(response => {
          console.log(response.data.data);
          if (previousProps.data !== response.data) {
            this.setState({ rerender: false });
            this.setState({ leaders: [] });
            for (let i = 0; i <= 9; i++) {
              this.setState({
                leaders: [
                  ...this.state.leaders,
                  response.data.included[i].attributes.name
                ]
              });
            }
          }
        })
        .catch(error => console.log(error));
    }
  }

  showStats = (plat, tag) => {
    axios
      .get(`http://localhost:8080/${plat}/${tag}`)
      .then(response => {
        console.log(response.data.data.attributes.gameModeStats);
        let arr = [response.data.data.attributes.gameModeStats],
          stats = arr.map(Object.values);
        this.setState({ stats });
        this.setState({ duo: stats[0][0] });
        this.setState({ duoFP: stats[0][1] });
        this.setState({ solo: stats[0][2] });
        this.setState({ soloFP: stats[0][3] });
        this.setState({ squad: stats[0][4] });
        this.setState({ squadFP: stats[0][5] });
        console.log(this.state.stats[0]);
      })

      .catch(error => console.log(error));
  };

  handleLeaders = str => {
    if (this.state.loading === false) {
      this.setState({ gameMode: str });
      this.setState({ rerender: true });
    }
  };

  render() {
    const {
      leaders,
      stats,
      loading,
      duo,
      duoFP,
      solo,
      soloFP,
      squad,
      squadFP
    } = this.state;
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="card border-warning m-auto">
            <div className="card-header">Search Player</div>
            <div className="card-body">
              <div>
                <input
                  type="text"
                  placeholder="Insert Platform"
                  id="inputSmall"
                  className="ml-2 mr-2"
                  onChange={e => this.setState({ platform: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Insert Gamertag"
                  id="inputSmall"
                  className="ml-2 mr-2"
                  onChange={e => this.setState({ gamertag: e.target.value })}
                />

                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() =>
                    this.showStats(this.state.platform, this.state.gamertag)
                  }
                >
                  Search
                </button>
              </div>
              <hr />

              <div>
                {stats.length <= 0 ? (
                  "Player not found"
                ) : (
                  <div className="row m-auto">
                    <ul className="list-group mr-2 ml-2">
                      <h5>Solo</h5>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {solo.kills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Most Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {solo.roundMostKills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Wins
                        <span className="badge badge-danger badge-pill ml-1">
                          {solo.wins}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Losses
                        <span className="badge badge-danger badge-pill ml-1">
                          {" "}
                          {solo.losses}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-group mr-2 ml-2">
                      <h5>soloFPP</h5>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {soloFP.kills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Most Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {soloFP.roundMostKills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Wins
                        <span className="badge badge-danger badge-pill ml-1">
                          {soloFP.wins}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Losses
                        <span className="badge badge-danger badge-pill ml-1">
                          {" "}
                          {soloFP.losses}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-group mr-2 ml-2">
                      <h5>Duo</h5>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {duo.kills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Most Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {duo.roundMostKills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Wins
                        <span className="badge badge-danger badge-pill ml-1">
                          {duo.wins}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Losses
                        <span className="badge badge-danger badge-pill ml-1">
                          {" "}
                          {duo.losses}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-group mr-2 ml-2">
                      <h5>DuoFpp</h5>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {duoFP.kills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Most Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {duoFP.roundMostKills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Wins
                        <span className="badge badge-danger badge-pill ml-1">
                          {duoFP.wins}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Losses
                        <span className="badge badge-danger badge-pill ml-1">
                          {" "}
                          {duoFP.losses}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-group mr-2 ml-2">
                      <h5>Squad</h5>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {squad.kills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Most Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {squad.roundMostKills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Wins
                        <span className="badge badge-danger badge-pill ml-1">
                          {squad.wins}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Losses
                        <span className="badge badge-danger badge-pill ml-1">
                          {" "}
                          {squad.losses}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-group mr-2 ml-2">
                      <h5>SquadFPP</h5>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {squadFP.kills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Most Kills
                        <span className="badge badge-danger badge-pill ml-1">
                          {squadFP.roundMostKills}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Wins
                        <span className="badge badge-danger badge-pill ml-1">
                          {squadFP.wins}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Losses
                        <span className="badge badge-danger badge-pill ml-1">
                          {" "}
                          {squadFP.losses}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card border-warning" style={{ maxWidth: "20%" }}>
            <div className="card-header">Leaderboard</div>
            <div className="card-body">
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning mr-1"
                  onClick={() => this.handleLeaders("solo")}
                >
                  solo
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning mr-1"
                  onClick={() => this.handleLeaders("duo")}
                >
                  duo
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => this.handleLeaders("squad")}
                >
                  squad
                </button>
              </div>
              <hr />
              <div>
                {loading === true
                  ? "loading..."
                  : leaders.map((name, id) => <li key={id}>{name}</li>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default home;
