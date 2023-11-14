import React, {forwardRef} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Controller, useForm} from "react-hook-form";
import {Platform, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";

const RegisterFormFirstStep = forwardRef(({ onSubmitFirstStep }, ref) => {
	const { control, handleSubmit, formState: { errors }, setError, setValue } = useForm();

	const navigation = useNavigation();

	const handleNavigateToLogin = () => {
		// Utilisez la fonction navigation.navigate pour naviguer vers la page d'inscription (Register)
		navigation.navigate('Login');
	}

	React.useImperativeHandle(ref, () => ({
		setError
	}));

	return (
		<View className="flex-col items-center justify-center w-screen bg-background">
			<View className={`flex-col ${Platform.OS === "web" ? "w-2/5" : "w-5/6"}`}>

				<View className="w-full h-2 border rounded-lg border-primary my-4">
					<View className="w-1/3 h-full rounded-lg bg-primary" />
				</View>

				<Text className="font-bold text-lg">Email</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({field , fieldState}) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-2"
							onChangeText={field.onChange}
							value={field.value}
							autoCapitalize="none"
							placeholder="Email"
						/>
					)}
					name="email"
					rules={
							{
								required: "l'email est requis",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'L\'e-mail n\'est pas valide',
								}
							}
						}
				/>
				{errors.email && <Text className="text-red-800 font-bold">{errors.email.message}</Text>}

				<Text className="font-bold text-lg">Mot de passe</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({field, fieldState}) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Mot de passe"
							secureTextEntry
						/>
					)}
					name="password"
					rules={
						{
							required: 'La confirmation du mot de passe est requis',
							pattern: {
								value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[A-Za-z0-9!@#\$%\^&\*]{12,}$/,
								message: 'Le mot de passe doit comporter au moins 12 caractères alphanumériques avec au moins une majuscule et un caractère spécial',
							},
						}
					}
				/>
				{errors.password && <Text className="text-red-800 font-bold">{errors.password.message}</Text>}

				<Text className="font-bold text-lg">Confirmer le mot de passe</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({field, fieldState}) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Confirmer le mot de passe"
							secureTextEntry
						/>
					)}
					name="confirmPassword"
					rules={
							{
								required: 'La confirmation du mot de passe est requis',
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[A-Za-z0-9!@#\$%\^&\*]{12,}$/,
									message: 'Le mot de passe doit comporter au moins 12 caractères alphanumériques avec au moins une majuscule et un caractère spécial',
								},
							}
						}
				/>
				{errors.confirmPassword && <Text className="text-red-800 font-bold">{errors.confirmPassword.message}</Text>}

				<View>
					<Pressable className="mb-5" onPress={handleNavigateToLogin}>
						<Text className="text-sm text-blue-500">Vous avez déjà un compte ? Connectez vous !</Text>
					</Pressable>

					<TouchableOpacity className="border-b-blue-700 rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmitFirstStep)}>
						<Text className="text-center text-white font-bold text-xl">Suivant</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
})

export default RegisterFormFirstStep;