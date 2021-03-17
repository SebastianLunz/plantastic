import React from 'react';
import { Form, Formik } from 'formik';
import UserPlantFormInformation from 'components/user-plants/userPlant-form/sections/UserPlantFormInformation';
import UserPlantFormMaintenance from 'components/user-plants/userPlant-form/sections/UserPlantFormMaintenance';
import Effect from 'components/shared/form/Effect';
import UserPlantFormFields from "components/user-plants/userPlant-form/constants/UserPlantFormFields";
import { plantFormPropTypes } from 'proptypes/PlantFormPropTypes';
import PlantFormButtons from 'components/plants/plant-form/sections/PlantFormButtons';


const UserPlantForm = (props) => {

  const onChange = (currentState) => {
    const { name } = currentState.values;
    props.onPlantNameChange(name);
  };

  const onSubmit = (values) => {
    const userPlant = UserPlantFormFields.toModel(values);
    console.log(props.onSubmit);
    props.onSubmit(userPlant);
  };

  const {
    initialValues,
    rooms,
    plants,
    userPlants,
    onDelete,
  } = props;

  const key = initialValues.id + Date.now();

  const formikProps = {
    key,
    initialValues,
    onSubmit,
  };

  return (
    <Formik { ...formikProps }>
      { ({ isValid }) => (
        <Form className="plant-form">
          <Effect onChange={ onChange } />
          <UserPlantFormInformation
            rooms={ rooms }
            plants={ plants }
            userPlants={ userPlants }
          />
          <UserPlantFormMaintenance />
          <PlantFormButtons
            cancelLabel="Cancel"
            submitDisabled={ !isValid }
            submitLabel={ key ? 'Save changes' : 'Add new plant' }
            deleteLabel="Delete plant"
            onDelete={onDelete}
            key={key}
          />
        </Form>
      ) }
    </Formik>
  );

};

// UserPlantForm.propTypes = plantFormPropTypes;

export default React.memo(UserPlantForm);
