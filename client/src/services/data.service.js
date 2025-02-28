import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }

  create(data) {
    return http.post("/customers", data);
  }

  update(id, data) {
    console.log("update data:", data);
    return http.put(`/customers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/customers/${id}`);
  }

  deleteAll() {
    return http.delete(`/customers`);
  }

  findByTitle(title) {
    return http.get(`/customers?title=${title}`);
  }

  getOrders(id) {
    return http.get(`/orders/${id}`);
  }

  getProducts() {
    return http.get(`/products/all`);
  }

  insertOrder(data) {
    console.log("Adding new Order", data);
    return http.post(`/orders/`, data);
  }
}

export default new DataService();