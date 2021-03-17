import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'formik';
import PlantasticSelect from 'components/shared/form/PlantasticSelect';
import UserPlantFormFields from "components/user-plants/userPlant-form/constants/UserPlantFormFields";
import { roomsPropType } from 'proptypes/RoomsPropTypes';
import OptionPleaseSelect from 'components/shared/form/OptionPleaseSelect';

const PlantFormPlant = ({ plants }) => {
  const id = 'plantPlant';
  return (
    <FormGroup>
      <Label for={ id }>Plant:</Label>
      <Field
        component={ PlantasticSelect }
        required
        id={ id }
        items={ plants }
        name={ UserPlantFormFields.PLANT }
      >
        <OptionPleaseSelect />
      </Field>
    </FormGroup>
  );
};

// PlantFormPlant.propTypes = {
//   rooms: roomsPropType
// };

export default PlantFormPlant;
