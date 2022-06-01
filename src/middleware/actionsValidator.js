function areBedIdsStrings(bedIds) {
  const nonStrings = bedIds.filter((bedId) => {
    return typeof bedId !== 'string';
  });
  return nonStrings.length === 0;
}

function validateActionData(req, res, next) {
  let messages = [];

  if (!req.body) {
    messages.push('body required for request');
  }

  if (!req.body.bedIds) {
    messages.push('bedIds is empty');
  } else if (!Array.isArray(req.body.bedIds)) {
    messages.push('bedIds must be an array');
  } else if (!areBedIdsStrings(req.body.bedIds)) {
    messages.push('bedId in bedIds array must be a string');
  }

  if (!req.body.actionType) {
    messages.push('actionType is empty');
  } else if (typeof req.body.actionType !== 'string') {
    messages.push('actionType must be a string');
  }

  if (!req.body.actionCompletedType) {
    messages.push('actionCompletedType is empty');
  } else if (typeof req.body.actionCompletedType !== 'string') {
    messages.push('actionCompletedType must be a string');
  }

  if (!req.body.actionCompleted) {
    messages.push('actionCompleted is empty');
  } else if (typeof req.body.actionCompleted !== 'number') {
    messages.push('actionCompleted must be a number');
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    res.status(400);
    throw error;
  } else {
    next();
  }
}

export { validateActionData };
