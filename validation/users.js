const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('username').notEmpty().isLength({ min: 5 }).withMessage('Username should be at least 5 characters long'),
    body('email').notEmpty().isEmail().withMessage('The email must be a valid email address and match the template: some@mail.com'),
    body('password').notEmpty().isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
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
  userValidationRules,
  validate,
}