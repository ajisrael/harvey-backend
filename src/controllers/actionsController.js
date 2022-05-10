import {
  getActionData,
  getActionDataById,
  saveActionData,
} from '../services/actionsHelper.js';

// @desc    Return data for actions
// @route   GET /api/actions/data/
// @access  Private
const getData = (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  if (req.body.actionId) {
    const actionId = req.body.actionId;
    console.log(`Returning action data for bed ${actionId}`);
    const payload = getActionDataById(page, actionId);
    res.json(payload);
  } else {
    console.log(`Returning all action data`);
    const payload = getActionData(page);
    res.json(payload);
  }
};

// @desc    Save data from action
// @route   POST /api/actions/data
// @access  Private
const postData = (req, res) => {
  const actionId = req.body.actionId;
  console.log(`Data received from action ${actionId}:`);
  console.log(req.body);

  const actionData = {
    ...req.body,
  };

  const message = saveActionData(actionData);

  res.status(200).send('data received');
};

export { getData, postData };
