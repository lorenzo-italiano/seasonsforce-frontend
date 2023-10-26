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
import {getToken, storeToken} from "../auth/Auth";
import Logo from "../../assets/logo.png"
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

function Register({ onLogin }) {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();

	const navigation = useNavigation();

	const handleNavigateToLogin = () => {
		// Utilisez la fonction navigation.navigate pour naviguer vers la page d'inscription (Register)
		navigation.navigate('Login');
	}

	const onSubmit = async (data) => {
	};

	return (
		<SafeAreaView className="flex-col justify-center items-center w-full h-full">

			<View className="flex-col items-center mb-10">
				<Image source={Logo} className="w-40 h-40" />
				<Text className="text-4xl font-bold">Création de compte</Text>
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

				<Text className="font-bold text-lg">Confirmer le mot de passe</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Confirmer le mot de passe"
							secureTextEntry
						/>
					)}
					name="confirmPassword"
					rules={{ required: 'La confirmation du mot de passe est requis' }}
				/>
				{errors.confirmPassword && <Text className="text-red-800 font-bold">{errors.confirmPassword.message}</Text>}
			</View>

			<View>
				<Pressable className="mb-5" onPress={handleNavigateToLogin}>
					<Text className="text-sm text-blue-500">Vous avez déjà un compte ? Connectez vous !</Text>
				</Pressable>

				<TouchableOpacity className="border-b-blue-700 rounded-lg bg-blue-700 p-2" onPress={handleSubmit(onSubmit)}>
					<Text className="text-center text-white font-bold text-xl" >S'inscrire</Text>
				</TouchableOpacity>
			</View>

		</SafeAreaView>
	)
}

export default Register
