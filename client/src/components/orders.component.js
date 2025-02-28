import React, { Component } from "react";
import DataService from "../services/data.service";

export default class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.getProduct = this.getProduct.bind(this);
        console.log("Props are:", props);

        // Get customer data from URL parameters
        const params = new URLSearchParams(window.location.search);
        console.log("Printing params!!", params.get('id'));
        this.state = {
            sales_person: '',
            quantity: '',
            submitted: false,
            isValid: true,
            customer_id: params.get('id'),
            errorMessage: '',
            selectedProduct: '',
            selectedProductId: '',
            products: []
        };
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct() {
        DataService.getProducts()
        .then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    placeOrder() {
        console.log("Selected_product:", this.state.selectedProduct);
        var new_order = {
            "salesPersonId": parseInt(this.state.sales_person),
            "customerId": parseInt(this.state.customer_id),
            "productId": parseInt(this.state.selectedProductId),
            "quantity": parseInt(this.state.quantity)
        };

        DataService.insertOrder(new_order)
        .then(response => {
            console.log("Order success", response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    handleSubmitOrder() {
        if (!this.state.sales_person.trim() || !this.state.quantity.trim() || !this.state.selectedProduct) {
            this.setState({
                isValid: false,
                errorMessage: 'All fields including product selection are required!'
            });
            return;
        }
        console.log("Selected Product id is:", this.state.selectedProduct.product_id)

        this.placeOrder();
        this.setState({ submitted: true });
        // window.close();
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        if(name === "selectedProduct"){
            const selectedProduct = this.state.products.find(
                product => product.name === value
            );
            console.log("settings product:", selectedProduct);
            this.setState({
                [name]: value,
                selectedProductId: selectedProduct.product_id,
                isValid: true,
                errorMessage: ''
            });

        } else {
            this.setState({
                [name]: value,
                isValid: true,
                errorMessage: ''
            });
    }
    }

    render() {
        return (
            <div className="container">
                {!this.state.submitted ? (
                    <div>
                        <h2 className="text-center">Order Details</h2>
                        <div className="card">
                            <div className="card-body">
                                {!this.state.isValid && (
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorMessage}
                                    </div>
                                )}

                                <div className="form-group mb-3">
                                    <label><strong>Product:</strong></label>
                                    <select
                                        className="form-control"
                                        name="selectedProduct"
                                        value={this.state.selectedProduct}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">Select a product</option>
                                        {this.state.products.map(product => (
                                            <option key={product.product_id} value={product.name}>
                                                {product.name} - ${product.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label><strong>SalesPersonId:</strong></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sales_person"
                                        value={this.state.sales_person}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Sales personId"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label><strong>quantity:</strong></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter quantity"
                                    />
                                </div>

                                <div className="text-center mt-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={this.handleSubmitOrder}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card mt-4">
                        <div className="card-body text-center">
                            <div className="alert alert-success" role="alert">
                                <h4 className="alert-heading">Order Submitted Successfully!</h4>
                            </div>
                            <div>
                                <h5>Order Details:</h5>
                                <p><strong>Product:</strong> {this.state.selectedProduct}</p>
                                <p><strong>sales_person:</strong> {this.state.sales_person}</p>
                                <p><strong>quantity:</strong> {this.state.quantity}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// export default withRouter(PlaceOrder);