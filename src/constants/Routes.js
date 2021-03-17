class Routes {
  static ROOT = '/';
  static CATEGORIES = '/categories';
  static PLANTS = '/plants';
  static PLANTS_CREATE = Routes.PLANTS + '/create';
  static PLANTS_EDIT = Routes.PLANTS + '/:plantId/edit';
  static ROOMS = '/rooms';
  static USER_PLANTS = '/user-plants';
  static USER_PLANTS_ADD = Routes.USER_PLANTS + '/add';
  static USER_PLANTS_EDIT = Routes.USER_PLANTS + '/:userPlantId/edit';
}

export default Routes;