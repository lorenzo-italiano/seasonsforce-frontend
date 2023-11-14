import {
	View,
	Text,
	TextInput,
	Button,
	SafeAreaView,
	Image,
	Modal,
	Alert,
	Pressable,
	TouchableOpacity
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
// import {getToken, storeRefreshToken, storeToken} from "../auth/Auth";
import Logo from "../../assets/logo.png"
import {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";

function Login() {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();
	const { setUserToken, setRefreshToken } = useContext(AuthContext)
	// const [modalVisible, setModalVisible] = useState(false);

	const navigation = useNavigation();

	const handleNavigateToRegister = () => {
		// Utilisez la fonction navigation.navigate pour naviguer vers la page d'inscription (Register)
		navigation.navigate('Register');
	}

	const onSubmit = async (data) => {
		try {
			// Configuration de l'en-tête pour le type x-www-form-urlencoded
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			};

			let details = {
				// 'grant_type': 'password',
				// 'client_id': 'seasonsforce-client',
				'username': data.email,
				'password': data.password,
			};

			// let formBody: [string] = [];
			// for (let property in details) {
			// 	let encodedKey = encodeURIComponent(property);
			// 	let encodedValue = encodeURIComponent(details[property]);
			// 	formBody.push(encodedKey + "=" + encodedValue);
			// }
			// let formBodyString : string = formBody.join("&");

			// URL de l'endpoint POST
			const url = 'http://localhost:8090/api/v1/user/auth/login';

			try {
				// Effectuer la requête POST
				const response = await axios.post(url, details, config);
				await setUserToken(response.data.access_token)
				await setRefreshToken(response.data.refresh_token)
			} catch (error) {
				console.log(error)
				setError('password', {
					type: 'manual',
					message: 'Mot de passe ou Email incorrect !',
				});
			}

		} catch (error) {
			// Gérez les erreurs ici
			console.error('Erreur lors de la requête POST :', error);
		}
	};

	return (
		<SafeAreaView className="flex-col justify-center items-center w-full h-full bg-background">

			{/*<Modal*/}
			{/*	// animationType="slide"*/}
			{/*	transparent={true}*/}
			{/*	visible={modalVisible}*/}
			{/*	onRequestClose={() => {*/}
			{/*		Alert.alert('Modal has been closed.');*/}
			{/*		setModalVisible(!modalVisible);*/}
			{/*	}}>*/}
			{/*	<SafeAreaView className="flex h-full w-full bg-gray-100 justify-center items-center">*/}
			{/*		<View className="flex justify-around items-center w-80 h-40 bg-white">*/}
			{/*			<Text>Mot de passe ou email erroné !</Text>*/}
			{/*			<Pressable*/}
			{/*				onPress={() => setModalVisible(!modalVisible)}>*/}
			{/*				<Text>Hide Modal</Text>*/}
			{/*			</Pressable>*/}
			{/*		</View>*/}
			{/*	</SafeAreaView>*/}
			{/*</Modal>*/}

				<View className="flex-col items-center mb-10">
					<Image source={Logo} className="w-40 h-40" />
					<Text className="text-4xl font-bold">Connexion</Text>
				</View>

				<View className="flex-col w-2/5">
					<Text className="font-bold text-lg">Email</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field , fieldState}) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-2"
								onChangeText={field.onChange}
								value={field.value}
								autoCapitalize="none"
								placeholder="Email"
							/>
						)}
						name="email"
						rules={{ required: "l'email est requis" }}
					/>
					{errors.email && <Text className="text-red-800 font-bold">{errors.email.message}</Text>}


					<Text className="font-bold text-lg">Mot de passe</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder="Mot de passe"
								secureTextEntry
							/>
						)}
						name="password"
						rules={{ required: 'Le mot de passe est requis' }}
					/>
					{errors.password && <Text className="text-red-800 font-bold">{errors.password.message}</Text>}

					<Pressable className="mb-5" onPress={handleNavigateToRegister}>
						<Text className="text-sm text-accent-blue">Pas de compte ? Inscrivez vous !</Text>
					</Pressable>

					{/*<Button title="Se connecter" onPress={handleSubmit(onSubmit)} />*/}
					<TouchableOpacity className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
						<Text className="text-center text-background font-bold text-xl" >Se connecter</Text>
					</TouchableOpacity>

					<Text className="text-sm mt-2 text-accent-blue">Mot de passe oublié ?</Text>
				</View>

		</SafeAreaView>
	)
}

export default Login
