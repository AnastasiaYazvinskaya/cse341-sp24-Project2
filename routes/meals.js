const routes = require('express').Router();
const {mealValidationRules, validate } = require('../validation/meals');
const { requiresAuth } = require('express-openid-connect');

const controller = require('../controllers/meals');

routes.get('/:userId', requiresAuth(), controller.getMeals);
routes.get('/id/:id', requiresAuth(), controller.getMeal);
routes.post('/', requiresAuth(), mealValidationRules(), validate, controller.addMeal);
routes.put('/:id', requiresAuth(), controller.editMeal);
routes.delete('/:id', requiresAuth(), controller.deleteMeal);

module.exports = routes;