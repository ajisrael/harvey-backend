function validateLoginData(req, res, next) {
  let messages = [];

  if (Object.keys(req.body).length === 0) {
    messages.push('body required for request');
  } else {
    if (!req.body.email) {
      messages.push('email is empty');
    } else if (typeof req.body.email !== 'string') {
      messages.push('email must be a string');
    }

    if (!req.body.password) {
      messages.push('password is empty');
    } else if (typeof req.body.password !== 'string') {
      messages.push('password must be a string');
    }
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    res.status(400);
    throw error;
  } else {
    next();
  }
}

function validateRegistrationData(req, res, next) {
  let messages = [];

  if (Object.keys(req.body).length === 0 || !req.body) {
    messages.push('body required for request');
  } else {
    if (!req.body.name) {
      messages.push('name is empty');
    } else if (typeof req.body.name !== 'string') {
      messages.push('name must be a string');
    }

    if (!req.body.email) {
      messages.push('email is empty');
    } else if (typeof req.body.email !== 'string') {
      messages.push('email must be a string');
    }

    if (!req.body.password) {
      messages.push('password is empty');
    } else if (typeof req.body.password !== 'string') {
      messages.push('password must be a string');
    }
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    res.status(400);
    throw error;
  } else {
    next();
  }
}

export { validateLoginData, validateRegistrationData };
