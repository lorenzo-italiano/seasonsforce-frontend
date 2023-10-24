import {View, Text, TextInput, Button, SafeAreaView, Image, Modal, Alert, Pressable} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import {getToken, storeToken} from "../auth/Auth";
import Logo from "../../assets/logo.png"
import {useState} from "react";

function Login({ onLogin }) {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();
	// const [modalVisible, setModalVisible] = useState(false);

	const onSubmit = async (data) => {
		try {
			// Configuration de l'en-tête pour le type x-www-form-urlencoded
			const config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
			};

			let details = {
				'grant_type': 'password',
				'client_id': 'seasonsforce-client',
				'username': data.email,
				'password': data.password,
			};

			let formBody: [string] = [];
			for (let property in details) {
				let encodedKey = encodeURIComponent(property);
				let encodedValue = encodeURIComponent(details[property]);
				formBody.push(encodedKey + "=" + encodedValue);
			}
			let formBodyString : string = formBody.join("&");

			// URL de l'endpoint POST
			const url = 'http://localhost:8090/api/v1/user/auth/login';

			try {
				// Effectuer la requête POST
				const response = await axios.post(url, formBodyString, config);
				await storeToken(JSON.parse(response.data + "\"}").access_token)
				onLogin()
			} catch (error) {
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
		<SafeAreaView className="flex flex-col w-full items-center justify-center h-screen">

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

			<View className="flex w-1/2 items-center justify-center gap-5">
				<Image source={Logo} className="w-40 h-40" />
				<Text className="text-lg font-bold mb-2 text-center text-4xl">Connexion</Text>
			</View>

			<View className="flex gap-y-2 w-2/3">
				<View>
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
				</View>

				<View className="mb-10">
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
				</View>

				<Button title="Se connecter" onPress={handleSubmit(onSubmit)} />
				<Text className="text-sm mt-2 text-blue-500">Forgot Password?</Text>
			</View>
		</SafeAreaView>
	)
}

export default Login
