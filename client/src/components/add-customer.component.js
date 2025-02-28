import React, { Component } from "react";
import DataService from "../services/data.service";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeMiddleInitial = this.onChangeMiddleInitial.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      id: null,
      first_name: "",
      middle_initial: "",
      last_name: "",
      published: false,

      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangeMiddleInitial(e) {
    this.setState({
      middle_initial: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  saveCustomer() {
    var data = {
      firstName: this.state.first_name,
      middleInitial: this.state.middle_initial,
      lastName: this.state.last_name
    };

    DataService.create(data)
      .then(response => {
        this.setState({
          first_name: response.data.first_name,
          middle_initial: response.data.middle_initial,
          last_name: response.data.last_name,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCustomer() {
    this.setState({
      id: null,
      first_name: "",
      middle_initial: "",
      last_name: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">First Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.first_name}
                onChange={this.onChangeFirstName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Middle initial</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.middle_initial}
                onChange={this.onChangeMiddleInitial}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Last name</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.last_name}
                onChange={this.onChangeLastName}
                name="description_two"
              />
            </div>

            <button onClick={this.saveCustomer} className="btn btn-success">
              Add New Customer
            </button>
          </div>
        )}
      </div>
    );
  }
}
