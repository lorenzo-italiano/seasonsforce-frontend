import * as React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { decode, encode } from 'base-64';
import {getAll, post} from "../rest/queries/QueryService";

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

type AuthContextType = {
	userToken: string | null
	refreshToken: string | null
	setUserToken: (string) => Promise<void>
	setRefreshToken: (string) => Promise<void>
	logout: () => Promise<void>
	isTokenExpired: () => Promise<boolean>
	isUserAuthenticated: boolean
	getValidToken: () => Promise<string>
	getUserById: () => Promise<void>
	isRegistered: () => Promise<boolean>
	getUserRole: () => string
	getUserCompanyId: () => Promise<string>
	getUserId: () => string
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
	const [userToken, setUserToken] = React.useState<string | null>(null)
	const [refreshToken, setRefreshToken] = React.useState<string | null>(null)

	useEffect(() => {
		const fetchInitialState = async () => {
			const initialToken = await AsyncStorage.getItem("authToken")
			const refreshToken = await AsyncStorage.getItem("refreshToken")
			if (initialToken !== null) {
				setUserToken(initialToken)
			}
			if (refreshToken !== null) {
				setRefreshToken(refreshToken)
			}
		}

		fetchInitialState()
	}, []);

	const isUserAuthenticated: boolean = userToken !== null

	const setUserTokenAndStore = async (newUserToken: string) => {
		try {
			await AsyncStorage.setItem("authToken", newUserToken);
			setUserToken(newUserToken);
		} catch (error) {
			// console.error('Erreur lors de la mise à jour de l\'état du User Token et du stockage dans AsyncStorage', error);
			return
		}
	}

	const setRefreshTokenAndStore = async (newRefreshToken: string) => {
		try {
			await AsyncStorage.setItem("refreshToken", newRefreshToken);
			setRefreshToken(newRefreshToken);
		} catch (error) {
			// console.error('Erreur lors de la mise à jour de l\'état du Refresh Token et du stockage dans AsyncStorage', error);
			return
		}
	}

	const logout = async () => {
		const decodedToken = jwtDecode(userToken?.toString(), {body: true})

		try {
			const body = {}

			const token = "Bearer " + userToken

			const config = {
				headers: {
					Authorization: token
				}
			}
			const resp = await axios.post("http://localhost:8090/api/v1/user/logout/" + decodedToken.sub, body, config)

			await AsyncStorage.removeItem('authToken');
			setUserToken(null)

			await AsyncStorage.removeItem('refreshToken');
			setRefreshToken(null)

		} catch (error) {
			// console.error('Erreur lors de la déconnexion : ', error);

			await AsyncStorage.removeItem('authToken');
			setUserToken(null)

			await AsyncStorage.removeItem('refreshToken');
			setRefreshToken(null)
		}
	};

	const getUserById: () => Promise<void> = async () => {
		if (userToken === null) {
			return
		}

		try {
			const decodedToken = jwtDecode(userToken?.toString(), {body: true})

			const config = {
				headers: {
					Authorization: "Bearer " + userToken
				}
			}

			const resp = await axios.get("http://localhost:8090/api/v1/user/" + decodedToken.sub, config)
			return resp.data
		} catch (error) {
			// console.error('Erreur lors de la récupération du User : ', error);
			return
		}
	}

	const isRegistered: () => Promise<boolean> = async () => {
		if (userToken === null) {
			return
		}

		const decodedToken = jwtDecode(userToken?.toString(), {body: true})

		const config = {
			headers: {
				Authorization: "Bearer " + userToken
			}
		}

		const resp = await axios.get("http://localhost:8090/api/v1/user/" + decodedToken.sub, config)

		if (getUserRole() === "admin") {
			return true
		}

		return resp.data.isRegistered
	}

	const getUserRole: () => string = () => {
		const decodedToken = jwtDecode(userToken?.toString(), {body: true})

		return decodedToken.resource_access["seasonsforce-client"].roles[0].split("_")[1]
	}

	const getUserCompanyId: () => Promise<string> = async () => {
		const user = await getUserById()

		return user.companyId
	}

	const getUserId: () => string = () => {
		const decodedToken = jwtDecode(userToken?.toString(), {body: true})

		return decodedToken.sub
	}

	const isTokenExpired: () => Promise<boolean> = async () => {
		const decodedToken = jwtDecode(userToken?.toString(), {body: true})

		let currentDate = new Date();

		return decodedToken.exp * 1000 < currentDate.getTime();
	}

	const getValidToken: () => Promise<string> = async () => {
		if(await isTokenExpired()){

			const refreshTokenObj = {
				refresh_token: refreshToken
			}

			try {
				const newToken = await axios.post("http://localhost:8090/api/v1/user/auth/refresh", refreshTokenObj)

				await setUserToken(newToken.data.access_token)
				return newToken.data.access_token
			} catch (error) {
				if (error.request.status === 400) {
					await logout()
				}
			}
		}
		return userToken
	}

	return (
		<AuthContext.Provider value={{ userToken, refreshToken, setUserToken: setUserTokenAndStore, setRefreshToken: setRefreshTokenAndStore, logout, isTokenExpired, isUserAuthenticated, getValidToken, getUserById, isRegistered, getUserRole, getUserCompanyId, getUserId }}>
			{children}
		</AuthContext.Provider>
	)
};

export default AuthProvider;
