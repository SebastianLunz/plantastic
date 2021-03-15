import React from 'react';
import 'components/plants/Plant.scss';
import find from 'lodash-es/find';
import moment from 'moment-es6';
import {
  plantDifficultyOptions,
  plantExposureOptions,
  plantExposureUnknown,
  plantHumidityOptions,
  plantHumidityUnknown,
  plantTemperatureOptions,
} from 'constants/PlantConstants';
// import { plantPropTypes } from 'proptypes/PlantsPropTypes';
import PlantExposureIcon from 'components/plants/icons/PlantExposureIcon';
import PlantHumidityIcon from 'components/plants/icons/PlantHumidityIcon';
import PlantBloomingIcon from 'components/plants/icons/PlantBloomingIcon';
import UserPlantFormFields from 'components/user-plants/userPlant-form/constants/UserPlantFormFields';

const UserPlant = ({ categories, onEdit, userPlant, rooms, plants }) => {

  const findValueByKey = (options, valueToFind) => {
    const id = options.findIndex((propValue) => propValue.id === valueToFind);
    return (id !== -1 ? options[id].name : '¯\\_(ツ)_/¯');
  };

  const asYmd = UserPlantFormFields.getDateAsYMD;
  const asAgo = (value) => moment.isMoment(value) ? value.fromNow() : '';

  const userPlantRoom = findValueByKey(rooms, userPlant.room);

  const userPlantWateringInterval = userPlant.wateringInterval;
  const userPlantFertilizingInterval = userPlant.fertilizingInterval;

  const userPlantDifficulty = findValueByKey(plantDifficultyOptions, userPlant.difficulty);
  /**
   * @type PlantExposure
   */
  const userPlantExposure = find(plantExposureOptions, { id: userPlant.requiredExposure }) || plantExposureUnknown;
  /**
   * @type PlantHumidity
   */
  const userPlantHumidity = find(plantHumidityOptions, { id: userPlant.requiredHumidity }) || plantHumidityUnknown;
  const userPlantLastFertilized = asYmd(userPlant.lastFertilized);
  const userPlantLastWatered = asAgo(userPlant.lastWatered);
  const userPlantTemperature = findValueByKey(plantTemperatureOptions, userPlant.requiredTemperature);

  return (
    <tr key={ userPlant.id } onClick={ () => onEdit(userPlant.id) }>
      <td className="text-center">{ userPlant.name }</td>
      <td className="text-center">{ userPlantWateringInterval }</td>
      <td className="text-center">{ userPlantFertilizingInterval }</td>
      <td className="text-center">{ userPlantRoom }</td>
      <td className="plant-attribute-icon text-center" title={ userPlantExposure.name }>
        <PlantExposureIcon plantExposure={ userPlantExposure } />
      </td>
      <td className="plant-attribute-icon-sm text-center">
        <PlantHumidityIcon plantHumidity={ userPlantHumidity } />
      </td>
      <td className="text-center">{ userPlantTemperature }</td>
      <td className="plant-attribute-icon text-center">
        <PlantBloomingIcon plantBlooming={ userPlant.blooming } />
      </td>
      <td className="text-center">{ userPlantDifficulty }</td>
      <td className="text-center">{ userPlantLastFertilized }</td>
      <td className="text-center">{ userPlantLastWatered }</td>
    </tr>
  );
};

// UserPlant.propTypes = plantPropTypes;

export default UserPlant;

