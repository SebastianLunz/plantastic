import React from "react";
import axios from "axios";
import {PLANTS_FETCH_DELAY, delay} from "shared/Debug";
import {plainToClass} from 'serializers/Serializer';
import {Api} from "services/Api";
import Plant from 'models/Plant';


const withPlants = (WrappedComponent) => {
  return class extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        plants: [],
        plantsErrorMessage: undefined,
        plantsSuccess: undefined,
        plantsInProgress: false,
        createPlantErrorMessage: "",
        updatePlantErrorMessage: "",
        deletePlantErrorMessage: "",
      };
    }

    handlePlantListUpdate = (plants) => {
      this.setState({plants: plants});
    };

    handlePlantsInProgress = (plantsInProgress) => {
      this.setState({plantsInProgress: plantsInProgress});
    }

    handleCreatePlantErrorMessage = (createPlantErrorMessage) => {
      this.setState({createPlantErrorMessage: createPlantErrorMessage});
    };

    handleUpdatePlantErrorMessage = (updatePlantErrorMessage) => {
      this.setState({updatePlantErrorMessage: updatePlantErrorMessage});
    };

    handleDeletePlantErrorMessage = (deletePlantErrorMessage) => {
      this.setState({deletePlantErrorMessage: deletePlantErrorMessage});
    };

    /**
     *
     * @param {function} resolve
     * @param {function} reject
     * @returns {Promise}
     */
    fetchPlants = (resolve, reject) => {
      return axios.get(Api.PLANTS)
        .then((response) => this.fetchPlantsSuccess(response, resolve))
        .catch((error) => this.fetchPlantsFailure(error, reject));
    };

    /**
     * Fetch Plants with some predefined delay.
     * @returns {Promise<TimerHandler>}
     */
    fetchPlantsDelayed = () => {
      console.log('Method Plants.fetchPlantsDelayed() fired');

      const plantsInProgress = true;
      this.setState({plantsInProgress});

      return delay(PLANTS_FETCH_DELAY, this.fetchPlants)
        .finally(this.fetchPlantsFinally);
    };

    fetchPlantsFailure = (error, reject) => {
      const plantsSuccess = false;
      const plantsErrorMessage = error.message;

      this.setState({
        plantsErrorMessage,
        plantsSuccess,
      });

      reject();
    };

    fetchPlantsFinally = () => {
      console.log('Plants finally');
      const plantsInProgress = false;
      this.setState({plantsInProgress});
    };

    fetchPlantsSuccess = (response, resolve) => {
      const data = response.data;

      const plants = data.map(item => plainToClass(Plant, item));
      const plantsSuccess = true;
      const plantsErrorMessage = '';

      this.setState({
        plants,
        plantsSuccess,
        plantsErrorMessage,
      });

      console.log('Fetched plants');

      resolve();
    };


    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          fetchPlants={ this.fetchPlantsDelayed }
          handlePlantListUpdate={ this.handlePlantListUpdate }
          handlePlantsInProgress={ this.handlePlantsInProgress }
          handleCreatePlantErrorMessage={ this.handleCreatePlantErrorMessage }
          handleUpdatePlantErrorMessage={ this.handleUpdatePlantErrorMessage }
          handleDeletePlantErrorMessage={ this.handleDeletePlantErrorMessage }
        />
      );
    }
  }
}
export default withPlants;
