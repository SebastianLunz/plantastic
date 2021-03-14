import React from "react";
import axios from "axios";
import {delay, USER_PLANTS_FETCH_DELAY} from "shared/Debug";
import UserPlant from 'models/UserPlant';
import {classToPlain, plainToClass} from 'serializers/Serializer';
import withCategories from 'components/categories/Categories';
import withRooms from 'components/rooms/Rooms';
import withPlants from "components/plants/PlantsContainer";
import UserPlantFormCard from 'components/user-plants/UserPlantFormCard';
import {Api} from 'services/Api';
import UserPlantFormFields from "components/user-plants/userPlant-form/constants/UserPlantFormFields";
import {generatePath, matchPath, Route, Switch, withRouter} from 'react-router-dom';
import Routes from 'constants/Routes';
import UserPlantList from "components/user-plants/UserPlantList";
import memoize from 'lodash-es/memoize';


class UserPlantsPage extends React.PureComponent {
  state = {
    userPlants: [],
    userPlantsErrorMessage: undefined,
    userPlantsSuccess: undefined,
    userPlantsInProgress: false,
    addUserPlantErrorMessage: "",
    updateUserPlantErrorMessage: "",
    deleteUserPlantErrorMessage: "",
  };

  componentDidMount() {
    const roomsPromise = this.props.fetchRooms();
    const categoriesPromise = this.props.fetchCategories();
    const plantsPromise = this.props.fetchPlants();
    const userPlantsPromise = this.fetchUserPlantsDelayed();

    userPlantsPromise
      .then(() => this.updateInitialValuesFromLocation(this.props.location));

    this.setState({userPlantsInProgress: true});

    const additionalPromises = Promise.all([
      roomsPromise,
      categoriesPromise,
      plantsPromise,
      userPlantsPromise,
    ]);

    additionalPromises
      .finally(() => this.setState({userPlantsInProgress: false}));

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {location} = this.props;
    if (prevProps.location !== location) {
      this.updateInitialValuesFromLocation(location);
    }
  }

  updateInitialValuesFromLocation = (location) => {
    const options = {
      exact: false,
      strict: false
    };

    const {pathname} = location;

    const editPath = matchPath(pathname, {...options, path: Routes.USER_PLANTS_EDIT});
    const createPath = matchPath(pathname, {...options, path: Routes.USER_PLANTS_ADD});

    const getInitialValues = memoize(UserPlantFormFields.getInitialValues);

    if (editPath !== null) {
      const userPlantId = +editPath.params.userPlantId;
      const userPlants = this.state.userPlants;
      const userPlant = userPlants.find((item) => item.id === userPlantId);
      const initialValues = getInitialValues(userPlant);
      this.setState({initialValues});
    }

    if (createPath !== null) {
      const userPlant = new UserPlant();
      const initialValues = getInitialValues(userPlant);
      this.setState({initialValues});
    }

  };

  fetchUserPlants = (resolve, reject) => {
    return axios.get(Api.USER_PLANTS)
      .then((response) => {
        const data = response.data;

        const userPlants = data
          .map(item => plainToClass(UserPlant, item));

        const userPlantsErrorMessage = '';
        const userPlantsSuccess = true;
        this.setState({
          userPlants,
          userPlantsSuccess,
          userPlantsErrorMessage,
        });
        console.log('Fetched user plants');
        resolve();
      })
      .catch((error) => {
        const userPlantsErrorMessage = error.message;
        const userPlantsSuccess = false;
        this.setState({
          userPlantsErrorMessage,
          userPlantsSuccess,
        });
        console.log('nie udało się');
        reject();
      });
  };

  fetchUserPlantsDelayed() {
    console.log('Method PlantsContainer.fetchPlantsDelayed() fired');
    return delay(USER_PLANTS_FETCH_DELAY, this.fetchUserPlants);
  }

  navigateToPlantList = () => {
    this.props.history.push(Routes.USER_PLANTS);

  };

  onSubmitPlantCreateSuccess = () => {
    this.navigateToPlantList();
  }

  /**
   * @param {UserPlant} userPlant
   */
  onSubmitPlantAdd = (userPlant) => {
    console.warn('Add plant:');
    console.log(userPlant);
    const path = generatePath(Routes.USER_PLANTS);

    axios.post(Api.USER_PLANTS, classToPlain(userPlant))
      .then((response) => {
        const data = response.data;
        const userPlant = plainToClass(UserPlant, data);
        const userPlants = [...this.state.userPlants]
        userPlants.push(userPlant);
        this.setState({userPlants: userPlants});
        this.props.history.push(path);
      })
      .catch((error) => {
        const userPlantsErrorMessage = "Error adding plant";
        this.props.history.push(path);
        this.setState({
          addUserPlantErrorMessage: userPlantsErrorMessage,
        });
      });
  };

  /**
   * @param {UserPlant} userPlant
   */
  onSubmitPlantUpdate = (userPlant) => {
    console.warn('Edited user plant:');
    console.log(userPlant);
    const path = generatePath(Routes.USER_PLANTS);

    axios.put(Api.USER_PLANTS + userPlant.id + '/', classToPlain(userPlant))
      .then((response) => {
        const data = response.data;
        const userPlant = plainToClass(UserPlant, data);
        const userPlants = [...this.state.userPlants];
        const getIndex = userPlants.findIndex(item => item.id === userPlant.id);
        userPlants[getIndex] = userPlant;
        this.setState({userPlants: userPlants});
        this.props.history.push(path);
      })
      .catch((error) => {
        const plantsErrorMessage = "Error updating user plant";
        this.props.history.push(path);
        this.setState({
          updateUserPlantErrorMessage: plantsErrorMessage,
        });
      });
    console.log(userPlant);
  };

  /**
   * @param {UserPlant} userPlant
   */
  onPlantDelete = (userPlant) => {
    console.warn('Edited user plant to delete:');
    const path = generatePath(Routes.USER_PLANTS);
    const userPlantId = this.state.initialValues.id;

    axios.delete(Api.USER_PLANTS + userPlantId + '/', userPlant)
      .then((response) => {
        const userPlants = [...this.state.userPlants];
        const userPlantToDelete = userPlants.findIndex(item => item.id === userPlantId);
        userPlants.splice(userPlantToDelete, 1);
        this.setState({userPlants: userPlants});
        this.props.history.push(path);
      })
      .catch((error) => {
        const plantsErrorMessage = "Error deleting user plant";
        this.props.history.push(path);
        this.setState({
          deleteUserPlantErrorMessage: plantsErrorMessage,
        });
      });
  }

  onSubmit = (userPlant, routeProps) => {
    debugger;
  };

  onEdit = (userPlantId) => {
    const path = generatePath(Routes.USER_PLANTS_EDIT, {userPlantId});
    this.props.history.push(path);
  };

  render() {
    const {
      initialValues,
      userPlants,
      userPlantsErrorMessage,
      userPlantsInProgress,
      userPlantsSuccess,
      addUserPlantErrorMessage,
      updateUserPlantErrorMessage,
    } = this.state;

    const {
      categories,
      categoriesSuccess,
      rooms,
      roomsSuccess,
      plants,
      plantsSuccess
    } = this.props;

    const success = categoriesSuccess && plantsSuccess && roomsSuccess && userPlantsSuccess;

    return (
      <Switch>
        <Route
          exact
          path={Routes.USER_PLANTS}
          render={() =>
            <React.Fragment>
              {
                addUserPlantErrorMessage !== "" && <p>{addUserPlantErrorMessage}</p>
              }
              {
                updateUserPlantErrorMessage !== "" && <p>{updateUserPlantErrorMessage}</p>
              }
              <UserPlantList
                categories={categories}
                onEdit={this.onEdit}
                plants={plants}
                userPlantsErrorMessage={userPlantsErrorMessage}
                userPlantsInProgress={userPlantsInProgress}
                userPlantsSuccess={userPlantsSuccess}
                rooms={rooms}
                userPlants={userPlants}
                success={success}
              />

            </React.Fragment>
          }
        />
        <Route
          path={[Routes.USER_PLANTS_ADD]}
          render={() => (
            <UserPlantFormCard
              categories={categories}
              formLabel="Add new plant"
              initialValues={initialValues}
              onSubmit={this.onSubmitPlantAdd}
              onBackToList={this.navigateToPlantList}
              rooms={rooms}
              plants={plants}
            />
          )}
        />
        <Route
          path={Routes.USER_PLANTS_EDIT}
          render={() => (
            <UserPlantFormCard
              categories={categories}
              formLabel="Edit user plant"
              initialValues={initialValues}
              onSubmit={this.onSubmitPlantUpdate}
              onDelete={this.onPlantDelete}
              onBackToList={this.navigateToPlantList}
              rooms={rooms}
              plants={plants}
            />
          )}
        />
      </Switch>
    );
  }
}

// PlantsPage.propTypes = {
//   ...withRoomsPropTypes,
//   ...withCategoriesPropTypes,
// };

export default withRooms(withCategories(withPlants(withRouter(UserPlantsPage))));
