function validateActionData(req, res, next) {
  let messages = [];

  if (!req.body) {
    messages.push('No object is provided');
  }

  if (!req.body.bedIds) {
    messages.push('Bed IDs is empty');
  }

  if (!req.body.actionType) {
    messages.push('Action Type is empty');
  }

  if (!req.body.actionCompletedType) {
    messages.push('Action Completed Type is empty');
  }

  if (!req.body.actionCompleted) {
    messages.push('Action Completed is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    error.statusCode = 400;
    throw error;
  } else {
    next();
  }
}

export { validateActionData };
