import serverConfig from '../config/serverConfig.js';
import {
  isSolenoidActive,
  updateSolenoidState,
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
      console.log(`Activating ${bedId} solenoid.`);
      updateSolenoidState(bedId, serverConfig.solenoidOn);
    } else if (
      shouldDeactivateSolenoid(moistureLevel) &&
      isSolenoidActive(bedId)
    ) {
      console.log(`Deactivating ${bedId} solenoid.`);
      updateSolenoidState(bedId, serverConfig.solenoidOff);
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
}

export { checkMoistureLevels };
