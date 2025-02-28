import React, { Component } from "react";
import DataService from "../services/data.service";
import { withRouter } from '../common/with-router';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeMiddleInitial = this.onChangeMiddleInitial.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);

    this.state = {
      currentCustomer: {
        customer_id: null,
        first_name: "",
        middle_initial: "",
        last_name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.router.params.id);
  }

  onChangeFirstName(e) {
    const first_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          first_name: first_name
        }
      };
    });
  }

  onChangeMiddleInitial(e) {
    const middle_initial = e.target.value;
    
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        middle_initial: middle_initial
      }
    }));
  }

  onChangeLastName(e) {
    const last_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          last_name: last_name
        }
      };
    });
  }

  getCustomer(id) {
    DataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      customer_id: this.state.currentCustomer.customer_id,
      first_name: this.state.currentCustomer.first_name,
      last_name: this.state.currentCustomer.last_name,
      published: status
    };

    DataService.update(this.state.currentCustomer.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCustomer: {
            ...prevState.currentCustomer,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCustomer() {
    DataService.update(
      this.state.currentCustomer.customer_id,
      this.state.currentCustomer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The customer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCustomer() {
    DataService.delete(this.state.currentCustomer.customer_id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/customerOrderManager');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Edit Customer Detail</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCustomer.first_name}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Middle initial</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCustomer.middle_initial}
                  onChange={this.onChangeMiddleInitial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCustomer.last_name}
                  onChange={this.onChangeLastName}
                />
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCustomer}
            >
              Update
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Customer);