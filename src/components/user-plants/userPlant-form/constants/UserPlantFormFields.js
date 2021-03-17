import UserPlant from 'models/UserPlant';
import pick from 'lodash-es/pick';
import moment from 'moment';

class UserPlantFormFields {
  static ID = 'id';
  static LAST_FERTILIZED = 'lastFertilized';
  static LAST_WATERED = 'lastWatered';
  static NAME = 'name';
  static ROOM = 'room';
  static PLANT = 'plant';

  /**
   *
   * @param {UserPlant} userPlant
   * @return {*}
   */
  static getInitialValues(userPlant) {
    const firstOf = (arr) => arr[0].id;

    const fieldNames = Object.values(UserPlantFormFields);
    const initialValues = pick(userPlant, fieldNames);

    return userPlant.id ? initialValues : Object.assign(initialValues, {
      [UserPlantFormFields.LAST_FERTILIZED]: moment(),
      [UserPlantFormFields.LAST_WATERED]: moment(),
    });
  }

  static getDateAsYMD(value) {
    return moment.isMoment(value) ? value.format('YYYY-MM-DD') : '';
  }

  static areValuesEqual(prevValues, nextValues) {
    const prev = prevValues || {};
    const next = nextValues || {};

    const simpleTypeFields = [
      [ UserPlantFormFields.ID ],
      [ UserPlantFormFields.NAME ],
      [ UserPlantFormFields.ROOM ],
      [ UserPlantFormFields.PLANT ],
    ];

    const simpleTypeDiff = (key) => prev[key] !== next[key];

    if (simpleTypeFields.some(simpleTypeDiff)) {
      return false;
    }

    const dateTimeFields = [
      [ UserPlantFormFields.LAST_FERTILIZED ],
      [ UserPlantFormFields.LAST_WATERED ],
    ];

    const dateDiff = (key) => {
      const firstDateTime = prev[key];
      const secondDateTime = next[key];
      const asYmd = UserPlantFormFields.getDateAsYMD;
      return asYmd(firstDateTime) !== asYmd(secondDateTime);
    };

    if (dateTimeFields.some(dateDiff)) {
      return false;
    }

    return true;
  }

  /**
   *
   * @param {Object} values
   * @returns {UserPlant}
   */
  static toModel(values) {
    const userPlant = new UserPlant();
    return Object.assign(userPlant, values);
  }
}

export default UserPlantFormFields;