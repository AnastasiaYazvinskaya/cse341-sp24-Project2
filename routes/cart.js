const routes = require('express').Router();

const controller = require('../controllers/cart');

routes.get('/', controller.getItems);
routes.get('/:id', controller.getItem);
routes.post('/', controller.addItem);
routes.put('/:id', controller.editItem);
routes.delete('/:id', controller.deleteItem);

module.exports = routes;