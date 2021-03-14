import React from "react";
import { Button, FormGroup, Row, Col } from "reactstrap";
import PropTypes from 'prop-types';

/**
 * @component
 */
const PlantFormButtons = (props) => {
  const {
    cancelLabel,
    submitDisabled,
    submitLabel,
    deleteLabel,
    onDelete,
    onBackToList } = props;

  return (
    <React.Fragment>
      <hr className="mb-4 mt-4" />
      <Row form className="mb-2">
        <Col xs={ 4 }>
          <Button color="secondary" type="button" onClick={ onBackToList }>
            { cancelLabel }
          </Button>
        </Col>
        <Col xs={ 8 } className="mb-0 d-flex flex-row-reverse">
          <Button color="primary" type="submit" className="ml-0 ml-md-2" disabled={ submitDisabled }>
            { submitLabel }
          </Button>
          {
            onDelete &&
            <Button color="danger" type="button" className="ml-0 ml-md-2" onClick={ onDelete }>
              { deleteLabel }
            </Button>
          }
        </Col>
      </Row>
    </React.Fragment>
  );
};

PlantFormButtons.propTypes = {
  cancelLabel: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  submitDisabled: PropTypes.bool.isRequired,
};

export default React.memo(PlantFormButtons);
