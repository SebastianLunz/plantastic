import React from 'react';
import { Col, Row } from 'reactstrap';
import PlantFormSectionHeader from 'components/plants/plant-form/PlantFormSectionHeader';
import PlantFormName from 'components/plants/plant-form/fields/PlantFormName';
import PlantFormSection from 'components/plants/plant-form/PlantFormSection';
import PlantFormRoom from 'components/plants/plant-form/fields/PlantFormRoom';
import PlantFormPlant from "components/plants/plant-form/fields/PlantFormPlant";
import { plantFormInformationPropTypes } from 'proptypes/PlantFormPropTypes';

const UserPlantFormInformation = ({ categories, rooms, plants }) => {
  return (
    <PlantFormSection>
      <PlantFormSectionHeader>Basic information</PlantFormSectionHeader>
      <Row>
        <Col xs={ 12 } lg={ 4 }>
          <PlantFormName />
        </Col>
        <Col xs={ 12 } lg={ 4 }>
          <PlantFormRoom rooms={ rooms } />
        </Col>
        <Col xs={ 12 } lg={ 4 }>
          <PlantFormPlant plants={ plants } />
        </Col>
      </Row>
    </PlantFormSection>
  );
};

UserPlantFormInformation.propTypes = plantFormInformationPropTypes;

export default React.memo(UserPlantFormInformation);
