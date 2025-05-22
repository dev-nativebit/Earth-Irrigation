import { Images } from '@/assets';
import {  Home ,Visit} from '../screens/Tab';
import {ExpenseScreen, ProfileScreen} from "@/screens";


const TabNavigationData = [
	{
		name: 'Home',
		component: Home, // Will add respective component when designed
		icon: Images.home,
	},
	{
		name: 'Visit',
		component: Visit, // Will add respective component when designed
		icon: Images.lead,
	},
	{
		name: 'Expense',
		component: ExpenseScreen,
		icon: Images.orders,
	},
	{
		name: 'Profile',
		component: ProfileScreen, // Will add respective component when designed
		icon: Images.visit,

	}
];

export default TabNavigationData;
