import { NativeWindStyleSheet } from "nativewind";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Conversation from "@screen/Conversation";
import Jobs from "@screen/Jobs";
import Profile from "@screen/Profile";
import Notification from "@screen/Notification";
import Home from "@screen/Home";
import {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {NavigationProvider} from "./src/NavigationProvider";
import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../context/AuthContext";
import Register from "../page/Register";
import Login from "../page/Login";
import OfferDetail from "../component/detail/OfferDetail";


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function Navigation() {
	const { isUserAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		console.log(isUserAuthenticated)
	}, [isUserAuthenticated]);


	return (
		<NavigationContainer>
			{ isUserAuthenticated ? (
				<Tab.Navigator
					screenOptions={{
						//TODO mettre une couleur de la palette
						tabBarActiveTintColor: '#a83232',
						headerShown: false
					}}
					initialRouteName="Home"
				>
					<Tab.Screen
						name="Home"
						component={Home}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="home" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Messages"
						component={Conversation}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="message" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Jobs"
						component={Jobs}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialIcons name="work" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="OfferDetail"
						children={() => <OfferDetail/>}
						// initialParams={{ onLogout: handleLogout }}
						options={{
							tabBarButton: () => null
						}}
					/>
					<Tab.Screen
						name="Notifications"
						component={Notification}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="bell" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Profile"
						children={() => <Profile/>}
						// initialParams={{ onLogout: handleLogout }}
						options={{
							tabBarIcon: ({ color, size }) => (
								<FontAwesome name="user" color={color} size={size} />
							),
						}}
					/>
				</Tab.Navigator>
			) : (
				<Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
					<Stack.Screen name="Login" children={() => <Login />} />
					<Stack.Screen name="Register" component={Register} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
}