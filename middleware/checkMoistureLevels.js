import serverConfig from '../config/serverConfig.js';
import {
  activateSolenoid,
  deactivateSolenoid,
  isSolenoidActive,
} from '../services/solenoidHelper.js';

function shouldActivateSolenoid(moistureLevel) {
  return moistureLevel < serverConfig.waterOnThreshold;
}

function shouldDeactivateSolenoid(moistureLevel) {
  return moistureLevel > serverConfig.waterOffThreshold;
}

function checkMoistureLevels(req, res, next) {
  const moistureLevel = req.body.moisture;
  const bedId = req.body.bedId;

  try {
    if (shouldActivateSolenoid(moistureLevel) && !isSolenoidActive(bedId)) {
      activateSolenoid(bedId);
    } else if (
      shouldDeactivateSolenoid(moistureLevel) &&
      isSolenoidActive(bedId)
    ) {
      deactivateSolenoid(bedId);
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
}

export { checkMoistureLevels };
