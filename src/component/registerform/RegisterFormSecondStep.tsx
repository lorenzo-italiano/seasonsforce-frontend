import React, {forwardRef} from 'react';
import {Text, Platform, TextInput, TouchableOpacity, View} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {Picker} from "@react-native-picker/picker";

const RegisterFormSecondStep = forwardRef(({ onSubmitSecondStep }, ref) => {
	const { control, handleSubmit, formState: { errors }, setError } = useForm();

	React.useImperativeHandle(ref, () => ({
		setError,
	}));

	const countries: string[] = [
		"Afghanistan",
		"Afrique du Sud",
		"Albanie",
		"Algérie",
		"Allemagne",
		"Andorre",
		"Angola",
		"Antigua-et-Barbuda",
		"Arabie saoudite",
		"Argentine",
		"Arménie",
		"Australie",
		"Autriche",
		"Azerbaïdjan",
		"Bahamas",
		"Bahreïn",
		"Bangladesh",
		"Barbade",
		"Belgique",
		"Belize",
		"Bénin",
		"Bhoutan",
		"Biélorussie",
		"Birmanie",
		"Bolivie",
		"Bosnie-Herzégovine",
		"Botswana",
		"Brésil",
		"Brunei",
		"Bulgarie",
		"Burkina Faso",
		"Burundi",
		"Cambodge",
		"Cameroun",
		"Canada",
		"Cap-Vert",
		"Centrafrique",
		"Chili",
		"Chine",
		"Chypre",
		"Colombie",
		"Comores",
		"Corée du Nord",
		"Corée du Sud",
		"Costa Rica",
		"Côte d'Ivoire",
		"Croatie",
		"Cuba",
		"Danemark",
		"Djibouti",
		"Dominique",
		"Égypte",
		"Émirats arabes unis",
		"Équateur",
		"Érythrée",
		"Espagne",
		"Estonie",
		"États-Unis",
		"Éthiopie",
		"Fidji",
		"Finlande",
		"France",
		"Gabon",
		"Gambie",
		"Géorgie",
		"Ghana",
		"Grèce",
		"Grenade",
		"Guatemala",
		"Guinée",
		"Guinée-Bissau",
		"Guinée équatoriale",
		"Guyana",
		"Haïti",
		"Honduras",
		"Hongrie",
		"Îles Marshall",
		"Îles Salomon",
		"Inde",
		"Indonésie",
		"Irak",
		"Iran",
		"Irlande",
		"Islande",
		"Israël",
		"Italie",
		"Jamaïque",
		"Japon",
		"Jordanie",
		"Kazakhstan",
		"Kenya",
		"Kirghizistan",
		"Kiribati",
		"Koweït",
		"Laos",
		"Lesotho",
		"Lettonie",
		"Liban",
		"Libéria",
		"Libye",
		"Liechtenstein",
		"Lituanie",
		"Luxembourg",
		"Macédoine du Nord",
		"Madagascar",
		"Malaisie",
		"Malawi",
		"Maldives",
		"Mali",
		"Malte",
		"Maroc",
		"Maurice",
		"Mauritanie",
		"Mexique",
		"Micronésie",
		"Moldavie",
		"Monaco",
		"Mongolie",
		"Monténégro",
		"Mozambique",
		"Namibie",
		"Nauru",
		"Népal",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Niue",
		"Norvège",
		"Nouvelle-Zélande",
		"Oman",
		"Ouganda",
		"Ouzbékistan",
		"Pakistan",
		"Palaos",
		"Palestine",
		"Panama",
		"Papouasie-Nouvelle-Guinée",
		"Paraguay",
		"Pays-Bas",
		"Pérou",
		"Philippines",
		"Pologne",
		"Portugal",
		"Qatar",
		"République centrafricaine",
		"République démocratique du Congo",
		"République dominicaine",
		"République du Congo",
		"République tchèque",
		"Roumanie",
		"Royaume-Uni",
		"Russie",
		"Rwanda",
		"Saint-Christophe-et-Niévès",
		"Sainte-Lucie",
		"Saint-Marin",
		"Saint-Vincent-et-les-Grenadines",
		"Salvador",
		"Samoa",
		"Sao Tomé-et-Principe",
		"Sénégal",
		"Serbie",
		"Seychelles",
		"Sierra Leone",
		"Singapour",
		"Slovaquie",
		"Slovénie",
		"Somalie",
		"Soudan",
		"Soudan du Sud",
		"Sri Lanka",
		"Suède",
		"Suisse",
		"Suriname",
		"Syrie",
		"Tadjikistan",
		"Tanzanie",
		"Tchad",
		"Thaïlande",
		"Timor oriental",
		"Togo",
		"Tonga",
		"Trinité-et-Tobago",
		"Tunisie",
		"Turkménistan",
		"Turquie",
		"Tuvalu",
		"Ukraine",
		"Uruguay",
		"Vanuatu",
		"Vatican",
		"Venezuela",
		"Viêt Nam",
		"Yémen",
		"Zambie",
		"Zimbabwe"
	]

	return (
		<View className="flex-col items-center justify-center w-screen bg-background">
			<View className={`flex-col ${Platform.OS === "web" ? "w-2/5" : "w-5/6"}`}>

				<View className="w-full h-2 border rounded-lg border-primary my-4">
					<View className="w-2/3 h-full rounded-lg bg-primary" />
				</View>

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
					rules={
							{
								required: 'Le prénom est requis',
								pattern: {
									value: /^[A-Za-zÀ-ÖØ-öø-ÿ -]{2,40}$/,
									message: 'Le prénom ne doit être constitué uniquement de lettres, espaces ou de tiret et doit faire au maximum 40 caractères',
								},
							}
						}
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
					rules={
							{
								required: 'Le nom est requis',
								pattern: {
									value: /^[A-Za-zÀ-ÖØ-öø-ÿ '-]{2,40}$/,
									message: 'Le nom ne doit être constitué uniquement de lettres, espaces ou de tiret ou d\'apostrophe et doit faire au maximum 40 caractères',
								},
							}
						}
				/>
				{errors.lastName && <Text className="text-red-800 font-bold">{errors.lastName.message}</Text>}

				<Text className="font-bold text-lg">Genre</Text>
				<Controller
					control={control}
					render={({ field }) => (
						<Picker
							style={{ borderWidth: 1, borderColor: "rgb(156 163 175)", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAF8F2" }}
							selectedValue={field.value}
							onValueChange={field.onChange}
						>
							<Picker.Item label="..." value=" " />
							<Picker.Item label="Femme" value="0" />
							<Picker.Item label="Homme" value="1" />
							<Picker.Item label="Autre" value="2" />
						</Picker>
					)}
					name="gender"
					rules={
							{
								required: 'Le genre est requis',
								pattern: {
									value: /^[012]$/,
									message: 'Vous devez sélectionner une des trois possibilité: Femme, Homme ou Autre',
								},
							}
				}
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
					rules={
							{
								required: 'La date de naissance est requise',
								pattern: {
									value: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
									message: 'La date de naissance doit être au format JJ/MM/AAAA',
								},
							}
						}
				/>
				{errors.birthdate && <Text className="text-red-800 font-bold">{errors.birthdate.message}</Text>}

				<Text className="font-bold text-lg">Nationalité</Text>
				<Controller
					control={control}
					render={({ field }) => (
						<Picker
							style={{ borderWidth: 1, borderColor: "rgb(156 163 175)", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAF8F2" }}
							selectedValue={field.value}
							onValueChange={field.onChange}
						>
							{countries.map((country, index) => (
								<Picker.Item key={index} label={country} value={country} />
							))}
						</Picker>
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
					rules={
							{
								required: 'Le numéro de téléphone est requis',
								pattern: {
									value: /^[\d\s()+-]+$/,
									message: 'Le numéro de téléphone doit contenir uniquement des chiffres, des parenthèses, le signe + ou un tiret',
								},
							}
						}
				/>
				{errors.phone && <Text className="text-red-800 font-bold">{errors.phone.message}</Text>}

				<TouchableOpacity className="w-full border-b-primary rounded-lg bg-primary p-2 mb-4" onPress={handleSubmit(onSubmitSecondStep)}>
					<Text className="text-center text-background font-bold text-xl" >S'inscrire</Text>
				</TouchableOpacity>

			</View>
		</View>
	)
})

export default RegisterFormSecondStep;