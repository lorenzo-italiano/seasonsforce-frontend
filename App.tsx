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
import Login from "./src/page/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {NavigationProvider} from "./src/NavigationProvider";
import {createStackNavigator} from "@react-navigation/stack";
import TabNavigator from "./src/TabNavigator";
import Register from "./src/page/Register";
import AuthProvider, {AuthContext} from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";

NativeWindStyleSheet.setOutput({
    default: "native",
});

const queryClient = new QueryClient()

export default function App() {

	// const handleLogin = async () => {
	// 	try {
	// 		// Effectuez la connexion, par exemple en appelant une API
	// 		// Si la connexion réussit, mettez à jour l'état d'authentification
	// 		setUserIsAuthenticated(true);
	// 	} catch (error) {
	// 		console.error('Erreur lors de la connexion : ', error);
	// 	}
	// };
	//
	// const handleLogout = async () => {
	// 	try {
	// 		setUserIsAuthenticated(false);
	// 	} catch (error) {
	// 		console.error('Erreur lors de la deconnexion : ', error);
	// 	}
	// }

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Navigation />
			</AuthProvider>
		</QueryClientProvider>
	);
}


// export default function App() {
//
// 	const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
//
// 	useEffect(() => {
// 		const checkAuthentication = async () => {
// 			const token = await AsyncStorage.getItem('authToken');
// 			if (token) {
// 				setUserIsAuthenticated(true);
// 			}
// 		};
//
// 		checkAuthentication();
// 	}, []);
//
// 	// Fonction pour gérer la connexion de l'utilisateur et mettre à jour l'état d'authentification
// 	const handleLogin = async () => {
// 		// Effectuez la connexion, par exemple en appelant une API
// 		try {
// 			// Remplacez ce code par la logique de connexion réelle
// 			// Si la connexion réussit, mettez à jour l'état d'authentification
// 			setUserIsAuthenticated(true);
// 		} catch (error) {
// 			console.error('Erreur lors de la connexion : ', error);
// 		}
// 	};
//
// 	const handleLogout = async () => {
// 		try {
// 			setUserIsAuthenticated(false)
// 		} catch (error) {
// 			console.error('Erreur lors de la deconnexion : ', error)
// 		}
// 	}
//
//     return (
// 		<QueryClientProvider client={queryClient}>
// 			<NavigationContainer>
// 				{userIsAuthenticated ? (
// 					<Tab.Navigator
// 					screenOptions={{
// 						//TODO mettre une couleur de la palette
// 						tabBarActiveTintColor: '#a83232',
// 					}}
// 				>
// 					<Tab.Screen
// 						name="Home"
// 						component={Home}
// 						options={{
// 							tabBarIcon: ({ color, size }) => (
// 								<MaterialCommunityIcons name="home" color={color} size={size} />
// 							),
// 						}}
// 					/>
// 					<Tab.Screen
// 						name="Messages"
// 						component={Conversation}
// 						options={{
// 							tabBarIcon: ({ color, size }) => (
// 								<MaterialCommunityIcons name="message" color={color} size={size} />
// 							),
// 						}}
// 					/>
// 					<Tab.Screen
// 						name="Jobs"
// 						component={Jobs}
// 						options={{
// 							tabBarIcon: ({ color, size }) => (
// 								<MaterialIcons name="work" color={color} size={size} />
// 							),
// 						}}
// 					/>
// 					<Tab.Screen
// 						name="Notifications"
// 						component={Notification}
// 						options={{
// 							tabBarIcon: ({ color, size }) => (
// 								<MaterialCommunityIcons name="bell" color={color} size={size} />
// 							),
// 						}}
// 					/>
// 					<Tab.Screen
// 						name="Profile"
// 						children={() => <Profile onLogout={handleLogout}/>}
// 						// initialParams={{ onLogout: handleLogout }}
// 						options={{
// 							tabBarIcon: ({ color, size }) => (
// 								<FontAwesome name="user" color={color} size={size} />
// 							),
// 						}}
// 					/>
// 				</Tab.Navigator>
// 				) : (
// 					<Login onLogin={handleLogin} />
// 				)}
// 			</NavigationContainer>
// 		</QueryClientProvider>
//     );
// }