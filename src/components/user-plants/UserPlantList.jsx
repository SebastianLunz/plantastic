import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import InProgress from 'components/shared/InProgress';
import OperationFailed from 'components/shared/OperationFailed';
import UserPlants from "components/user-plants/UserPlants";
import { plantListPropTypes } from 'proptypes/PlantListPropTypes';
import UserPlantAddButton from 'components/user-plants/UserPlantAddButton';

/**
 * This is an example of JSDoc comment.
 *
 * @param {UserPlant[]} userPlants Array of userPlants
 * @param {Plant[]} plants Array of plants
 * @param {Category[]} categories Array of categories
 * @param {Room[]} rooms Array of categories
 * @param {string} userPlantsErrorMessage
 * @param {boolean} userPlantsInProgress
 * @param {boolean} userPlantsSuccess
 * @param {boolean} success
 * @returns {*}
 * @constructor
 */
const UserPlantList = ({ userPlants, userPlantsErrorMessage, userPlantsInProgress, userPlantsSuccess, success, ...rest }) => {
  const totalUserPlants = userPlants.length;
  return (
    <Card className="mb-4">
      <CardBody>
        <Row>
          <Col xs={ 12 } sm={ 6 }>
            <h3 className="mb-3">List of my plants</h3>
          </Col>
          <Col xs={ 12 } sm={ 6 } className="text-sm-right mb-3 mb-sm-0">
            <UserPlantAddButton />
          </Col>
        </Row>
        <p>You have { totalUserPlants } plants in all your rooms.</p>

        <InProgress inProgress={ userPlantsInProgress } />

        <OperationFailed isFailed={ userPlantsSuccess === false }>
          <strong>Failed to fetch user plants.</strong>
          { ' Reason: ' }
          { userPlantsErrorMessage }
        </OperationFailed>

        {
          success &&
          <UserPlants
            userPlants={ userPlants }
            { ...rest }
          />
        }
      </CardBody>
    </Card>
  );
};

// UserPlantList.propTypes = plantListPropTypes;

export default React.memo(UserPlantList);
