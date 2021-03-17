import React, { useState } from 'react';
import UserPlantForm from "components/user-plants/userPlant-form/UserPlantForm";
import { Card, CardBody } from 'reactstrap';
import UserPlantFormFields from "components/user-plants/userPlant-form/constants/UserPlantFormFields";
import get from 'lodash-es/get';

/**
 * We assume certain simplification here by ignoring
 * changes other than categories, rooms, plants or initialValues.
 *
 * @param prevProps
 * @param nextProps
 * @return {boolean}
 */
const propsAreEqual = function (prevProps, nextProps) {
  const areValuesEqual = UserPlantFormFields.areValuesEqual(
    prevProps.initialValues,
    nextProps.initialValues
  );

  const propList = [ 'categories', 'rooms', 'plants', 'userPlants'];
  const isPropEqual = (prop) => prevProps[prop] === nextProps[prop];

  return areValuesEqual && propList.every(isPropEqual);
};

const UserPlantFormCard = ({ formLabel, initialValues, ...rest }) => {
  const defaultUserPlantName = get(initialValues, UserPlantFormFields.NAME, '');
  const [ userPlantName, setUserPlantName ] = useState(defaultUserPlantName);
  const cardHeaderLabel = get(initialValues, 'id') ? userPlantName || '…' : formLabel;
  return initialValues ? (
    <Card className="mb-4" color="light">
      <CardBody>
        <h3 className="mb-4">{ cardHeaderLabel }</h3>
        <UserPlantForm
          onPlantNameChange={ setUserPlantName }
          initialValues={ initialValues }
          { ...rest }
        />
      </CardBody>
    </Card>
  ) : null;
};

// UserPlantFormCard.propTypes = plantFormCardPropTypes;

export default React.memo(UserPlantFormCard, propsAreEqual);
