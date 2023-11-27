import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Conversation from "../page/Conversation";
import Offer from "../page/Offer";
import Profile from "../page/Profile";
import Notification from "../page/Notification";
import Home from "../page/Home";
import React, {useContext, useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../context/AuthContext";
import Register from "../page/Register";
import Login from "../page/Login";
import {Pressable, Text, View} from "react-native";
import RegisterSpecificStep from "../component/registerform/RegisterSpecificStep";
import CreateOrUpdateOfferForm from "../page/form/offer/CreateOrUpdateOfferForm";
import OfferDetail from "../page/detail/OfferDetail";
import AdminPanel from "../page/AdminPanel";
import ProfilePage from "../page/detail/ProfilePage";
import AddOrModifyAvailability from "../page/form/availability/AddOrModifyAvailability";
import CreateReview from "../page/form/review/CreateReview";
import LoadingSpinner from "../component/loading/LoadingSpinner";
import AddOrModifyReference from "../page/form/reference/AddOrModifyReference";
import UpdateReview from "../page/form/review/UpdateReview";


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function Navigation() {
	const { isUserAuthenticated, isRegistered, userToken, getUserRole, logout } = useContext(AuthContext);
	const [isRegisteredVal, setIsRegisteredVal] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// TODO rajouter loading state

	useEffect(() => {
		async function checkIsRegistered() {
			setIsLoading(true)
			const result = await isRegistered();
			setIsRegisteredVal(result);
			setIsLoading(false)
		}

		checkIsRegistered();
	}, [userToken])

	if (isLoading) {
		return (
			<>
				<LoadingSpinner/>
				<Pressable onPress={logout}>
					<Text>logout</Text>
				</Pressable>
			</>
		)
	}

	return (
		<NavigationContainer className="bg-background">
			{ isUserAuthenticated && isRegisteredVal &&
				<Tab.Navigator
					screenOptions={{
						//TODO mettre une couleur de la palette
						tabBarActiveTintColor: '#a83232',
						headerShown: false,
					}}
					initialRouteName="Home"
				>
					<Tab.Screen
						name="Home"
						component={Home}
						options={{
							tabBarIcon: ({color, size}) => (
								<MaterialCommunityIcons name="home" color={color} size={size}/>
							),
						}}
					/>
					<Tab.Screen
						name="Messages"
						component={Conversation}
						options={{
							tabBarIcon: ({color, size}) => (
								<MaterialCommunityIcons name="message" color={color} size={size}/>
							),
						}}
					/>
					<Tab.Screen
						name="Offer"
						component={Offer}
						options={{
							tabBarIcon: ({color, size}) => (
								<MaterialIcons name="work" color={color} size={size}/>
							),
						}}
					/>
					<Tab.Screen
						name="OfferDetail"
						children={() => <OfferDetail />}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="CreateOfferForm"
						children={() => <CreateOrUpdateOfferForm/>}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="CreateReview"
						children={() => <CreateReview/>}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="UpdateReview"
						children={() => <UpdateReview/>}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="Notifications"
						component={Notification}
						options={{
							tabBarIcon: ({color, size}) => (
								<MaterialCommunityIcons name="bell" color={color} size={size}/>
							),
						}}
					/>
					<Tab.Screen
						name="Profile"
						children={() => <Profile/>}
						// initialParams={{ onLogout: handleLogout }}
						options={{
							tabBarIcon: ({color, size}) => (
								<FontAwesome name="user" color={color} size={size}/>
							),
						}}
					/>
					<Tab.Screen
						name="AdminPanel"
						children={() => <AdminPanel />}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="ProfilePage"
						children={() => <ProfilePage />}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="AddOrModifyAvailability"
						children={() => <AddOrModifyAvailability />}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="AddOrModifyReference"
						children={() => <AddOrModifyReference />}
						options={{
							tabBarButton: () => null
						}}
					/>
				</Tab.Navigator>
			}

			{ isUserAuthenticated && !isRegisteredVal &&
				<Stack.Navigator initialRouteName="FinishRegister" screenOptions={{headerShown: false}}>
					<Stack.Screen name="FinishRegister" component={RegisterSpecificStep} />
				</Stack.Navigator>
			}

			{ !isUserAuthenticated &&
				<Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
					<Stack.Screen name="Login" children={() => <Login />} />
					<Stack.Screen name="Register" component={Register} />
				</Stack.Navigator>
			}
		</NavigationContainer>
	);
}