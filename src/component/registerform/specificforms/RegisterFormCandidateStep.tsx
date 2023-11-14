import React, { useContext } from 'react';
import {Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext";
import {Picker} from "@react-native-picker/picker";
import useCreateAddress from "../../../rest/hook/address/useCreateAddress";
import usePatchUser from "../../../rest/hook/user/usePatchUser";
import Logo from "../../../../assets/logo.png";

const RegisterFormCandidateStep = () => {

	const { control, handleSubmit, formState: { errors } } = useForm();

	const { logout, getValidToken, getUserById } = useContext(AuthContext)

	const createAddress = useCreateAddress(getValidToken)
	const patchUser = usePatchUser(getValidToken)

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

	const onSubmit = async (data) => {

		try {
			const address = {
				city: data.city,
				country: data.country,
				number: data.number,
				street: data.street,
				zipCode: data.zipCode
			}

			const createdAddressId = await createAddress.mutateAsync(address)

			const user = await getUserById()

			const obj = {
				addressId: createdAddressId,
				shortBio: data.shortBio,
				isRegistered: true
			}

			const param = {
				id: user.id,
				userPatch: obj
			}

			await patchUser.mutateAsync(param)

			logout()
		}
		catch (error) {
			console.error(error);
			return
		}

	}

	return (
		<SafeAreaView className="w-screen h-screen bg-background">
			<ScrollView className="flex-col w-full h-full" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>

				<View className="flex-col w-2/3 mt-10">
					<View className="flex-col items-center mb-10">
						<Image source={Logo} className="w-40 h-40" />
						<Text className="text-4xl font-bold">Création de compte</Text>
					</View>

					<View className="w-full h-2 border rounded-lg border-primary my-4">
						<View className="w-full h-full rounded-lg bg-primary" />
					</View>

					<Text className="font-bold text-3xl mb-5">Completez votre profil candidat</Text>

					<Text className="font-bold text-lg">Décrivez-vous en quelques mots / phrases</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder="Biographie"
							/>
						)}
						name="shortBio"
						rules={{ required: 'La description est requise' }}
					/>
					{errors.shortBio && <Text className="text-red-800 font-bold">{errors.shortBio.message}</Text>}

					<Text className="font-bold text-lg">Rue</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder="Rue"
							/>
						)}
						name="street"
						rules={
								{
									required: 'La rue est requise',
									pattern: {
										value: /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
										message: 'Le nom de la rue ne doit être constitué uniquement de lettres, espaces et caractères spéciaux',
									},
								}
							}
					/>
					{errors.street && <Text className="text-red-800 font-bold">{errors.street.message}</Text>}

					<Text className="font-bold text-lg">Numéro de rue</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder="Numéro"
							/>
						)}
						name="number"
						rules={
								{
									required: 'Le numéro est requis',
									pattern: {
										value: /^[0-9A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
										message: 'Le numéro de la rue ne doit être constitué uniquement de lettres, chiffres, espaces et caractères spéciaux',
									},
								}
							}
					/>
					{errors.number && <Text className="text-red-800 font-bold">{errors.number.message}</Text>}

					<Text className="font-bold text-lg">Code Postal</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder="Code postal"
							/>
						)}
						name="zipCode"
						rules={
								{
									required: 'Le code postal est requis',
									pattern: {
										value: /^[0-9]{5}$/,
										message: 'Le code postal doit être constitué de 10 chiffres consécutifs maximum, ex: 34090',
									},
								}
							}
					/>
					{errors.zipCode && <Text className="text-red-800 font-bold">{errors.zipCode.message}</Text>}

					<Text className="font-bold text-lg">Ville</Text>
					<Controller
						defaultValue=""
						control={control}
						render={({ field, fieldState }) => (
							<TextInput
								className="border border-gray-400 rounded p-2 mb-4"
								onChangeText={field.onChange}
								value={field.value}
								placeholder="Ville"
							/>
						)}
						name="city"
						rules={
								{
									required: 'La ville est requise',
									pattern: {
										value: /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
										message: 'La ville doit être constitué de 10 chiffres consécutifs maximum, ex: 34090',
									},
								}
							}
					/>
					{errors.city && <Text className="text-red-800 font-bold">{errors.city.message}</Text>}

					<Text className="font-bold text-lg">Pays</Text>
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
						name="country"
						rules={{ required: 'Le pays est requis' }}
					/>
					{errors.country && <Text className="text-red-800 font-bold">{errors.country.message}</Text>}

					<TouchableOpacity className="border-primary rounded-lg bg-primary p-2 my-4" onPress={handleSubmit(onSubmit)}>
						<Text className="text-center text-background font-bold text-xl">S'inscrire</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>

		</SafeAreaView>
	)
}

export default RegisterFormCandidateStep;