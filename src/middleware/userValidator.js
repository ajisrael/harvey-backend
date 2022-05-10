function validateLoginData(req, res, next) {
  let messages = [];

  if (!req.body) {
    messages.push('No object is provided');
  }

  if (!req.body.email) {
    messages.push('Email is empty');
  }

  if (!req.body.password) {
    messages.push('Password is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    error.statusCode = 400;
    throw error;
  } else {
    next();
  }
}

function validateRegistrationData(req, res, next) {
  let messages = [];

  if (!req.body) {
    messages.push('No object is provided');
  }

  if (!req.body.name) {
    messages.push('Name is empty');
  }

  if (!req.body.email) {
    messages.push('Email is empty');
  }

  if (!req.body.password) {
    messages.push('Password is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    error.statusCode = 400;
    throw error;
  } else {
    next();
  }
}

export { validateLoginData, validateRegistrationData };
