function areBedIdsStrings(bedIds) {
  const nonStrings = bedIds.filter((bedId) => {
    return typeof bedId !== 'string';
  });
  return nonStrings.length === 0;
}

function validateActionGet(req, res, next) {
  let messages = [];

  if (Object.keys(req.body).length !== 0) {
    if (!req.body.actionId) {
      messages.push('actionId is empty');
    } else if (typeof req.body.actionId !== 'number') {
      messages.push('actionId must be a number');
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

function validateActionPost(req, res, next) {
  let messages = [];

  if (Object.keys(req.body).length === 0) {
    messages.push('body required for request');
  } else {
    if (!req.body.bedIds) {
      messages.push('bedIds is empty');
    } else if (!Array.isArray(req.body.bedIds)) {
      messages.push('bedIds must be an array');
    } else if (req.body.bedIds.length === 0) {
      messages.push('bedIds must contain at least one bedId');
    } else if (!areBedIdsStrings(req.body.bedIds)) {
      messages.push('bedId in bedIds array must be a string');
    }

    if (!req.body.actionCompleted) {
      messages.push('actionCompleted is empty');
    } else if (typeof req.body.actionCompleted !== 'number') {
      messages.push('actionCompleted must be a number');
    }

    if (!req.body.actionCompletedType) {
      messages.push('actionCompletedType is empty');
    } else if (typeof req.body.actionCompletedType !== 'string') {
      messages.push('actionCompletedType must be a string');
    }

    if (!req.body.actionName) {
      messages.push('actionName is empty');
    } else if (typeof req.body.actionName !== 'string') {
      messages.push('actionName must be a string');
    }

    if (!req.body.actionType) {
      messages.push('actionType is empty');
    } else if (typeof req.body.actionType !== 'string') {
      messages.push('actionType must be a string');
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

export { validateActionGet, validateActionPost };
