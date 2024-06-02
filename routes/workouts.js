const routes = require('express').Router();
const {workoutValidationRules, validate } = require('../validation/workouts');
const { requiresAuth } = require('express-openid-connect');

const controller = require('../controllers/workouts');

routes.get('/:userId', requiresAuth(), controller.getWorkouts);
routes.get('/id/:id', requiresAuth(), controller.getWorkout);
routes.post('/', requiresAuth(), workoutValidationRules(), validate, controller.addWorkout);
routes.put('/:id', requiresAuth(), controller.editWorkout);
routes.delete('/:id', requiresAuth(), controller.deleteWorkout);

module.exports = routes;