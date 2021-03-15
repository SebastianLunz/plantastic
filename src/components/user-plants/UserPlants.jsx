import React from "react";
import { Table } from "reactstrap";
import UserPlant from "components/user-plants/UserPlant";
// import { plantsPropTypes } from 'proptypes/PlantsPropTypes';

/**
 * This is an example of JSDoc comment.
 *
 * @param {UserPlant[]} userPlants Array of userPlants
 * @param {Plant[]} plants Array of plants
 * @param {Category[]} categories Array of categories
 * @param {Room[]} categories Array of categories
 * @param {function} onEdit Callback invoked on row click
 * @returns {*}
 */
const UserPlants = ({ userPlants, ...rest }) => {
  console.log(userPlants);
  return (
    <Table hover striped responsive>
      <thead className="thead-dark">
      <tr>
        <th className="text-center">Name</th>
        <th className="text-center">Watering Interval</th>
        <th className="text-center">Fertilizing Interval</th>
        <th className="text-center">Room</th>
        <th className="text-center">Exposure</th>
        <th className="text-center">Humidity</th>
        <th className="text-center">Temperature</th>
        <th className="text-center">Blooming</th>
        <th className="text-center">Difficulty</th>
        <th className="text-center">Last Fertilized</th>
        <th className="text-center">Last Watered</th>
      </tr>
      </thead>
      <tbody>
      {
        userPlants.map((userPlant) => (
          <UserPlant
            key={ userPlant.id }
            userPlant={ userPlant }
            { ...rest }
          />
        ))
      }
      </tbody>
    </Table>
  );
};

// UserPlants.propTypes = plantsPropTypes;

export default UserPlants;
