const routes = require('express').Router();
const {userValidationRules, validate } = require('../validation/users');

const controller = require('../controllers/users');

routes.get('/', controller.getUsers);
routes.get('/:id', controller.getUser);
routes.post('/', userValidationRules(), validate, controller.addUser);
routes.put('/:id', userValidationRules(), validate, controller.editUser);
routes.delete('/:id', controller.deleteUser);

module.exports = routes;