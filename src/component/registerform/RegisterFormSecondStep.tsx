import React, {forwardRef} from 'react';
import {Text, Platform, TextInput, TouchableOpacity, View} from "react-native";
import {useForm, Controller} from "react-hook-form";

const RegisterFormSecondStep = forwardRef(({ onSubmitSecondStep }, ref) => {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();

	React.useImperativeHandle(ref, () => ({
		setError,
	}));

	return (
		<View className="flex-col items-center justify-center w-screen bg-background">
			<View className={`flex-col ${Platform.OS === "web" ? "w-2/5" : "w-5/6"}`}>
				<Text className="font-bold text-lg">Prénom</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Prénom"
						/>
					)}
					name="firstName"
					rules={{ required: 'Le prénom est requis' }}
				/>
				{errors.firstName && <Text className="text-red-800 font-bold">{errors.firstName.message}</Text>}

				<Text className="font-bold text-lg">Nom</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Nom"
						/>
					)}
					name="lastName"
					rules={{ required: 'Le nom est requis' }}
				/>
				{errors.lastName && <Text className="text-red-800 font-bold">{errors.lastName.message}</Text>}

				<Text className="font-bold text-lg">Genre</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Genre"
						/>
					)}
					name="gender"
					rules={{ required: 'Le genre est requis' }}
				/>
				{errors.gender && <Text className="text-red-800 font-bold">{errors.gender.message}</Text>}

				<Text className="font-bold text-lg">Date de naissance</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Date de naissance"
						/>
					)}
					name="birthdate"
					rules={{ required: 'La date de naissance est requise' }}
				/>
				{errors.birthdate && <Text className="text-red-800 font-bold">{errors.birthdate.message}</Text>}

				<Text className="font-bold text-lg">Nationalité</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Nationalité"
						/>
					)}
					name="citizenship"
					rules={{ required: 'La nationalité est requise' }}
				/>
				{errors.citizenship && <Text className="text-red-800 font-bold">{errors.citizenship.message}</Text>}

				<Text className="font-bold text-lg">Numéro de téléphone</Text>
				<Controller
					defaultValue=""
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							className="border border-gray-400 rounded p-2 mb-4"
							onChangeText={field.onChange}
							value={field.value}
							placeholder="Numéro de téléphone"
						/>
					)}
					name="phone"
					rules={{ required: 'Le numéro de téléphone est requis' }}
				/>
				{errors.phone && <Text className="text-red-800 font-bold">{errors.phone.message}</Text>}

				<View className="flex-col items-center justify-center">
					<TouchableOpacity className="w-2/5 border-b-primary rounded-lg bg-primary p-2 mb-4" onPress={handleSubmit(onSubmitSecondStep)}>
						<Text className="text-center text-white font-bold text-xl" >S'inscrire</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
})

export default RegisterFormSecondStep;