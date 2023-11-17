import { View, Text, TextInput, SafeAreaView, Image, Pressable, TouchableOpacity} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import Logo from "../../assets/logo.png"
import {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {useTranslation} from "react-i18next";

function Login() {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();
	const { setUserToken, setRefreshToken } = useContext(AuthContext)

	const navigation = useNavigation();

	const { t } = useTranslation();

	const handleNavigateToRegister = () => {
		navigation.navigate('Register');
	}

	const onSubmit = async (data) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			};

			let details = {
				'username': data.email,
				'password': data.password
			};

			const url = 'http://localhost:8090/api/v1/user/auth/login';

			try {
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

				<View className="flex-col items-center mb-10">
					<Image source={Logo} className="w-40 h-40" />
					<Text className="text-4xl font-bold">{t('login.title')}</Text>
				</View>

				<View className="flex-col w-2/5">
					<Text className="font-bold text-lg">{t("login.fields.username.placeholder")}</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field , fieldState}) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-2"
								onChangeText={field.onChange}
								value={field.value}
								autoCapitalize="none"
								placeholder={t("login.fields.username.placeholder")}
							/>
						)}
						name="email"
						rules={{ required: t("login.fields.username.required") }}
					/>
					{errors.email && <Text className="text-red-800 font-bold">{errors.email.message}</Text>}


					<Text className="font-bold text-lg">{t("login.fields.password.placeholder")}</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder={t("login.fields.password.placeholder")}
								secureTextEntry
							/>
						)}
						name="password"
						rules={{ required: t("login.fields.password.required") }}
					/>
					{errors.password && <Text className="text-red-800 font-bold">{errors.password.message}</Text>}

					<Pressable className="mb-5" onPress={handleNavigateToRegister}>
						<Text className="text-sm text-accent-blue">{t("login.no-account")}</Text>
					</Pressable>

					{/*<Button title="Se connecter" onPress={handleSubmit(onSubmit)} />*/}
					<TouchableOpacity className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
						<Text className="text-center text-background font-bold text-xl" >Se connecter</Text>
					</TouchableOpacity>

					<Text className="text-sm mt-2 text-accent-blue">{t("login.forgot")}</Text>
				</View>

		</SafeAreaView>
	)
}

export default Login
