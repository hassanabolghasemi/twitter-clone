const validator = require('validator')

exports.signupValidation = (data) => {
  let errors = []
  let input = {
    username: data.username.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
  }

  if (validator.isLength(input.username, { min: 0, max: 3 })) {
    errors.push('Your username must be longer than 4 characters.')
  } else if (validator.isLength(input.username, { min: 16 })) {
    errors.push('Your username must be shorter than 15 characters.')
  }

  if (input.email === '') {
    errors.push('Please enter your email.')
  } else if (!validator.isEmail(input.email)) {
    errors.push('Please enter a valid email.')
  }

  if (input.password === '') {
    errors.push('Please enter your password.')
  } else if (!validator.isLength(input.password, { min: 6 })) {
    errors.push('Your Password must be longer than 6 characters')
  }

  return {
    errors,
    isValid: errors.length === 0,
  }
}
