import React, { Component, Fragment } from "react";
import SearchBox from "./SearchBox";
import ModeBox from "./ModeBox";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: null,
      gamertag: null,
      stats: []
    };
  }

  handleChange = (input, e) => {
    this.setState({ [input]: e.target.value });
  };

  showStats = () => {
    axios
      .get(
        `http://localhost:8080/${this.state.platform}/${this.state.gamertag}`
      )
      .then(response => {
        console.log(response.data.data.attributes.gameModeStats);
        let arr = [response.data.data.attributes.gameModeStats],
          stats = arr.map(Object.values);
        this.setState({ stats });
      })
      .catch(error => {
        console.log(error);
        alert("Player not found");
      });
  };

  render() {
    const { stats } = this.state;
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="card border-warning m-auto">
            <div className="card-header">Search Player</div>
            <SearchBox
              handleChange={this.handleChange}
              showStats={this.showStats}
            />
            <hr />
            <Fragment>
              {stats.length <= 0 ? null : (
                <div className="row m-auto">
                  <ModeBox stats={stats} />
                </div>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}
