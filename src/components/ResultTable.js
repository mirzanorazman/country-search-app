import React, { Component } from "react";

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data["results"]
    };
  }

  // return the list of headings
  getKeys() {
    if (this.props.param === "alpha") {
      return Object.keys(this.props.data["results"]);
    } else if (this.props.param === "fullName") {
      return Object.keys(this.props.data["results"][0]);
    } else return Object.keys(this.props.data["results"][0]);
  }

  getValues() {
    if (this.props.param === "alpha") {
      return Object.values(this.props.data["results"]);
    } else if (this.props.param === "fullName") {
      return Object.values(this.props.data["results"][0]);
    } else return Object.values(this.props.data["results"][0]);
  }

  // return the header from keys
  getHeader() {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  }

  // return body part of the table
  getRowsData() {
    var items = this.getValues();
    if (this.props.param === "partialName") {
      return Object.values(this.state.data).forEach(entry => {
        return (
          <tr>
            {Object.values(entry).forEach(rowData => {
              console.log(rowData);
              return <td>N/A</td>;
            })}
          </tr>
        );
      });
    } else {
      return (
        <tr>
          {items.map((row, index) => {
            return <td>{row.toString()}</td>;
          })}
        </tr>
      );
    }
  }

  render() {
    if (this.props.data.length !== 0) {
      return (
        <div>
          <h3>Results</h3>
          <table>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>{this.getRowsData()}</tbody>
          </table>
        </div>
      );
    } else {
      return <p>No data found</p>;
    }
  }
}

export default ResultTable;
