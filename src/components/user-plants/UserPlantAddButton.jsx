import React from 'react';
import { Button } from 'reactstrap';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routes from 'constants/Routes';
import { Link } from 'react-router-dom';

const UserPlantAddButton = () => {
  return (
    <Button color="primary" tag={ Link } to={ Routes.USER_PLANTS_ADD }>
      <FontAwesomeIcon icon={ faPlusCircle } />
      { ' ' }
      Add new plant
    </Button>
  );
};

// UserPlantAddButton.propTypes = {};

export default UserPlantAddButton;
