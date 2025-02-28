module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
    
    router.post("/", employees.create);
      
    app.use("/api/employees", router);
  };
  