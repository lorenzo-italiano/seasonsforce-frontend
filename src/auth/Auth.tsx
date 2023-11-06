import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import decode, {jwtDecode} from "jwt-decode";

// Stocker le token d'authentification
// export const storeToken = async (token) => {
// 	try {
// 		await AsyncStorage.setItem('authToken', token);
// 	} catch (error) {
// 		console.error('Erreur de stockage du token : ', error);
// 	}
// };

// export const getToken = async () => {
// 	try {
// 		const token = await AsyncStorage.getItem('authToken');
// 		return token;
// 	} catch (error) {
// 		console.error('Erreur lors de la récupération du token :', error);
// 		return null;
// 	}
// }

// export const storeRefreshToken = async (refreshToken) => {
// 	try {
// 		await AsyncStorage.setItem('refreshToken', refreshToken);
// 	} catch (error) {
// 		console.error('Erreur de stockage du refresh token : ', error);
// 	}
// };

// export const getRefreshToken = async () => {
// 	try {
// 		const token = await AsyncStorage.getItem('refreshToken');
// 		return token;
// 	} catch (error) {
// 		console.error('Erreur lors de la récupération du token :', error);
// 		return null;
// 	}
// }

// export const isTokenExpired = async () => {
// 	const token = await AsyncStorage.getItem('authToken');
//
// 	const decodedToken = jwtDecode(token?.toString(), {})
//
// 	let currentDate = new Date();
//
// 	// JWT exp is in seconds
// 	if (decodedToken.exp * 1000 < currentDate.getTime()) {
// 		console.log("Token expired.");
// 		return true
// 	} else {
// 		console.log("Valid token");
// 		return false
// 	}
//
// }

// Supprimer le token d'authentification (déconnexion)
// export const logout = async () => {
// 	try {
// 		await AsyncStorage.removeItem('authToken');
// 	} catch (error) {
// 		console.error('Erreur lors de la déconnexion : ', error);
// 	}
// };
