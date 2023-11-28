import { View, Text, SafeAreaView, Image, Pressable, TouchableOpacity} from 'react-native';
import { useForm } from 'react-hook-form';
import axios from "axios";
import Logo from "../../assets/logo.png"
import React, {useContext, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
// import {useTranslation} from "react-i18next";
// import { I18n } from "i18n-js";
import TextInputForm from "../component/form/input/TextInputForm";
import {I18nContext} from "../context/I18nContext";

function Login() {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();
	const { setUserToken, setRefreshToken } = useContext(AuthContext)

	const navigation = useNavigation();

	const { i18n } = useContext(I18nContext)

	// const { t } = useTranslation();

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

			const hash = require('object-hash');
			const hashedPassword = hash.sha1(data.password);

			let details = {
				'username': data.email,
				'password': hashedPassword
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
			console.error('Erreur lors de la requête POST :', error);
		}
	};

	return (
		<SafeAreaView className="flex-col justify-center items-center w-full h-full bg-background">

				<View className="flex-col items-center mb-10">
					<Image source={Logo} className="w-40 h-40" />
					<Text className="text-4xl font-bold">{i18n.t('login.title')}</Text>
				</View>

				<View className="flex-col w-3/5">
					<TextInputForm
						label={i18n.t("login.fields.username.placeholder")}
						name="email"
						control={control}
						rules={{ required: i18n.t("login.fields.username.required") }}
						placeholder={i18n.t("login.fields.username.placeholder")}
					/>

					<TextInputForm
						label={i18n.t("login.fields.password.placeholder")}
						name="password"
						control={control}
						rules={{ required: i18n.t("login.fields.password.required") }}
						placeholder={i18n.t("login.fields.password.placeholder")}
						secureTextEntry
					/>

					<Pressable className="mb-5" onPress={handleNavigateToRegister}>
						<Text className="text-sm text-accent-blue">{i18n.t("login.no-account")}</Text>
					</Pressable>

					<TouchableOpacity className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
						<Text className="text-center text-background font-bold text-xl" >Se connecter</Text>
					</TouchableOpacity>

					<Text className="text-sm mt-2 text-accent-blue">{i18n.t("login.forgot")}</Text>
				</View>

		</SafeAreaView>
	)
}

export default Login
