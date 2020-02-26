import React, { Component } from "react";
import "./App.css";

import ResultTable from "./components/ResultTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      optionValue: "fullName",
      error: null,
      responseReceived: false,
      results: []
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      responseReceived: false
    });
  }

  handleSubmit(event) {
    // fetch php API method: POST

    fetch("http://localhost:8000/", {
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        searchVal: this.state.searchValue,
        optionVal: this.state.optionValue
      })
    })
      .then(response => response.json())
      .then(response => {
        this.handleResult(response);
      })
      .catch(error => {
        console.log("search error", error);
        alert("search failed!");
      });

    event.preventDefault(); // prevents page from reloading after form submission
  }

  handleResult(response) {
    this.setState({ results: response, responseReceived: true });
  }

  render() {
    return (
      <div>
        <h1>Country search</h1>
        <form action="index.php" method="post">
          <label>
            Search value:
            <input
              name="searchValue"
              type="text"
              value={this.state.searchValue}
              placeholder="ie. 'col' or 'Columbia'"
              onChange={e => this.handleChange(e)}
            />
          </label>
          <label>
            <select
              name="optionValue"
              value={this.state.optionValue}
              onChange={e => this.handleChange(e)}
            >
              <option value="fullName">Full Name</option>
              <option value="partialName">Partial Name</option>
              <option value="alpha">Alpha Code</option>
            </select>
          </label>
          <input
            type="submit"
            onClick={e => this.handleSubmit(e)}
            value="Search"
          />
        </form>
        <div className="resultsTable">
          {this.state.responseReceived && (
            <ResultTable
              data={this.state.results}
              param={this.state.optionValue}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
