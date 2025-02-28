import React, { Component } from "react";
import DataService from "../services/data.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.removeAllCustomers = this.removeAllCustomers.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      searchTitle: "",
      orders: [],
      notifications: [],
      message: "",
      isSubscribed: false
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }


  componentWillUnmount() {
    if (this.ws) {
        this.ws.close();
    }
  }

  connectWebSocket = () => {
    try {
        this.ws = new WebSocket('ws://localhost:8084');

        this.ws.onopen = () => {
            console.log('Connected to WebSocket server');
            this.setState({
                isSubscribed: true,
                error: ''
            });
        };

        this.ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.setState(prevState => ({
                    notifications: [...prevState.notifications, message]
                }));
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        this.ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
            this.setState({
                isSubscribed: false,
                error: 'WebSocket connection closed'
            });
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.setState({
                error: 'WebSocket connection error',
                isSubscribed: false
            });
        };
    } catch (error) {
        console.error('Error connecting to WebSocket:', error);
        this.setState({
            error: 'Failed to connect to WebSocket server',
            isSubscribed: false
        });
    }
  };

  showNotification = (message) => {
    // You can use browser notifications or a toast library
    if (Notification.permission === 'granted') {
        new Notification('New Customer Update', {
            body: message.content
        });
    }
  };

  handleSubscribe = () => {
    if (!this.state.isSubscribed) {
        this.connectWebSocket();
    } else {
        if (this.ws) {
            this.ws.close();
        }
        this.setState({
            isSubscribed: false,
            error: ''
        });
    }
  };


  handlePublish = () => {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.setState({ error: 'WebSocket connection is not open' });
        return;
    }

    if (!this.state.message.trim()) {
        this.setState({ error: 'Please enter a message' });
        return;
    }

    try {
        const messageData = {
            type: 'customer_update',
            content: this.state.message,
            timestamp: new Date().toISOString()
        };

        // Send the message
        this.ws.send(JSON.stringify(messageData));

        // Add the message to local notifications
        this.setState(prevState => ({
            notifications: [...prevState.notifications, messageData],
            message: '', // Clear the input
            error: ''
        }));
    } catch (error) {
        this.setState({ error: 'Failed to send message' });
        console.error('Error sending message:', error);
    }
  };

  // Handle Enter key press in message input
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.handlePublish();
    }
  };

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCustomers() {
    console.log("Get Customer was called");
    DataService.getAll()
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveOrders(customer) {
    console.log("GetOrders called for", customer);
    DataService.getOrders(customer.customer_id)
    .then(response => {
      this.setState({
        orders: response.data
      });
      console.log("Retrieved Orders", response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });
  }

  setActiveCustomer(customer, index) {
    this.retrieveOrders(customer);
    this.setState({
      currentCustomer: customer,
      currentIndex: index
    });
  }

  removeAllCustomers() {
    DataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });

    DataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePlaceOrder = () => {
    if (this.state.currentCustomer) {
        const customer = this.state.currentCustomer;
        const params = new URLSearchParams({
            'id': customer.customer_id
        });

        window.open(`/place-order?${params.toString()}`, '_blank');
    }
  };

  render() {
    const { searchTitle, customers, currentCustomer, currentIndex, orders, notifications = [] } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Customer List</h4>
          <ul className="list-group">
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                  {customer.first_name} {customer.middle_initial} {customer.last_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCustomers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer Detail</h4>
              <div>
                <label>
                  <strong>First name:</strong>
                </label>{" "}
                {currentCustomer.first_name}
              </div>
              <div>
                <label>
                  <strong>Middle name:</strong>
                </label>{" "}
                {currentCustomer.middle_initial}
              </div>
              <div>
                <label>
                  <strong>Last name:</strong>
                </label>{" "}
                {currentCustomer.last_name}
              </div>

              <div>
                <Link
                  to={"/customerOrderManager/" + currentCustomer.customer_id}
                  className="badge badge-warning"
                >
                  Edit Customer Detail
                </Link>
              </div>
              <br></br>
              <div>
                <label>
                  <strong>Order history:</strong>
                </label>
                <ul className="list-group">
                  {orders &&
                    orders.map((order, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        key={index}
                      >
                        OrderId: {order.order_id}, ProductId: {order.product_id}, Quantity: {order.quantity}
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                  {/* <Link
                    to={"/place-order/" + currentCustomer.customer_id}
                    className="badge badge-success"
                  >
                    Place New Order
                  </Link> */}
                  <button
                      className="btn btn-success"
                      onClick={this.handlePlaceOrder}
                  >
                      Place Order
                  </button>

                </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Customer, to view details...</p>
            </div>
          )}
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4>Employee Updates</h4>

                            {/* Error message display */}
                            {this.state.error && (
                                <div className="alert alert-danger">
                                    {this.state.error}
                                </div>
                            )}

                            <div className="mb-3">
                                <button
                                    className={`btn ${this.state.isSubscribed ? 'btn-danger' : 'btn-success'} me-2`}
                                    onClick={this.handleSubscribe}
                                >
                                    {this.state.isSubscribed ? 'Unsubscribe' : 'Subscribe to Updates'}
                                </button>
                            </div>

                            {this.state.isSubscribed && (
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your message"
                                            value={this.state.message}
                                            onChange={(e) => this.setState({
                                                message: e.target.value,
                                                error: ''
                                            })}
                                            onKeyPress={this.handleKeyPress}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handlePublish}
                                            disabled={!this.state.message}
                                        >
                                            Publish
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="notifications-container">
                                <h5>Recent Updates:</h5>
                                {notifications && notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <div key={index} className="alert alert-info">
                                            <small>{new Date(notification.timestamp).toLocaleString()}</small>
                                            <p className="mb-0">{notification.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="alert alert-light">
                                        No notifications yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
