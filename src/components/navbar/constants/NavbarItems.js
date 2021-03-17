import Routes from 'constants/Routes';
import { faColumns, faHome, faLeaf, faSeedling } from '@fortawesome/free-solid-svg-icons';

const navbarItems = [
  { path: Routes.ROOT, icon: faHome, name: 'Dashboard', exact: true },
  { path: Routes.PLANTS, icon: faSeedling, name: 'Plants' },
  { path: Routes.CATEGORIES, icon: faLeaf, name: 'Categories' },
  { path: Routes.ROOMS, icon: faColumns, name: 'Rooms' },
  { path: Routes.USER_PLANTS, icon: faSeedling, name: 'User Plants' },
];

export default navbarItems;