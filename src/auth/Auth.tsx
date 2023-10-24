import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Stocker le token d'authentification
export const storeToken = async (token) => {
	try {
		await AsyncStorage.setItem('authToken', token);
	} catch (error) {
		console.error('Erreur de stockage du token : ', error);
	}
};

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		return token;
	} catch (error) {
		console.error('Erreur lors de la récupération du token :', error);
		return null;
	}
}

// Supprimer le token d'authentification (déconnexion)
export const logout = async () => {

	try {
		await AsyncStorage.removeItem('authToken');
	} catch (error) {
		console.error('Erreur lors de la déconnexion : ', error);
	}
};
