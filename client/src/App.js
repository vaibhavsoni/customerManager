import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCustomer from "./components/add-customer.component";
import Customer from "./components/customer.component";
import CustomersList from "./components/customers-list.component";
import PlaceOrder from "./components/orders.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/customerOrderManager"} className="navbar-brand">
            Customer Order manager
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/customerOrderManager"} className="nav-link">
                View Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Customer
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CustomersList/>} />
            <Route path="/customerOrderManager" element={<CustomersList/>} />
            <Route path="/add" element={<AddCustomer/>} />
            <Route path="/customerOrderManager/:id" element={<Customer/>} />
            <Route path="/place-order" element={<PlaceOrder/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
