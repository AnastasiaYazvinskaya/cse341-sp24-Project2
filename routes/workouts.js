const routes = require('express').Router();
const {workoutValidationRules, validate } = require('../validation/workouts');

const controller = require('../controllers/workouts');

routes.get('/:userId', controller.getWorkouts);
routes.get('/id/:id', controller.getWorkout);
routes.post('/', workoutValidationRules(), validate, controller.addWorkout);
routes.put('/:id', controller.editWorkout);
routes.delete('/:id', controller.deleteWorkout);

module.exports = routes;