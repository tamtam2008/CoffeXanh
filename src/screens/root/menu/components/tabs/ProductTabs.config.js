import PopularTab from './PopularTab/PopularTab';
import DrinkTab from './DrinkTab/DrinkTab';
import FoodTab from './FoodTab/FoodTab';

const ProductTabsConfig = [
  {
    name: 'tab.popular',
    component: PopularTab,
    title: 'Menu.ProductTabs.popular',
  },
  {
    name: 'tab.drink',
    component: DrinkTab,
    title: 'Menu.ProductTabs.drink',
  },
  // {
  //   name: 'tab.food',
  //   component: FoodTab,
  //   title: 'Menu.ProductTabs.food',
  // }
];

export default ProductTabsConfig;
