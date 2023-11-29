import { NativeWindStyleSheet } from "nativewind";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'intl-pluralrules';
import 'core-js';
import AuthProvider from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";
import I18nProvider from "./src/context/I18nContext";
import Toast from "react-native-toast-message";
import React from "react";

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
			<I18nProvider>
				<AuthProvider>
					<Navigation />
					<Toast />
				</AuthProvider>
			</I18nProvider>
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
// 						name="Offer"
// 						component={Offer}
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