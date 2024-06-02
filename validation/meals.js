const { body, validationResult } = require('express-validator')
const mealValidationRules = () => {
  return [
    body('userId').notEmpty().isLength({ min: 24, max: 24 }).withMessage('User ID should be 24 characters long'),
    body('date').notEmpty().isISO8601().withMessage('Date must be in YYYY-MM-DD format'),
    body('time').matches(/^([01]\d|2[0-3]):?([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
    body('mealType').isIn(['breakfast', 'lunch', 'dinner', 'snack']).withMessage('Meal type must be one of the following: breakfast, lunch, dinner, snack'),
    //body('notes')
    body('caloriesIntake').isInt({ min: 0 }).withMessage('Callories intake must be a non-negative integer'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  mealValidationRules,
  validate,
}