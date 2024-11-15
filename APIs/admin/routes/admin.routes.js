const RegisterEmployee = require('../controller/admin.controller');

module.exports = app => {
    app.post("/api/v1/login", RegisterEmployee.login);
    app.post("/api/v1/createEmployee", RegisterEmployee.createEmployee);
}