import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {Picker} from "@react-native-picker/picker";
import useFetchAllCompaniesMinimized from "../../../rest/hook/company/useFetchAllCompaniesMinimized";
import { useQuery } from "@tanstack/react-query";
import {getAll} from "../../../rest/queries/QueryService";
import {AuthContext} from "../../../context/AuthContext";
import {Address} from "../../../model/Address";
import useFetchAllPlan from "../../../rest/hook/plan/useFetchAllPlan";
import Logo from "../../../../assets/logo.png";
import usePatchUser from "../../../rest/hook/user/usePatchUser";
import LoadingSpinner from "../../loading/LoadingSpinner";

const RegisterFormRecruiterStep = () => {

	const { control, handleSubmit, formState: { errors }, watch } = useForm();

	const { logout, getValidToken, getUserById } = useContext(AuthContext)

	const [selectedPlanId, setSelectedPlanId] = useState<string>(null)

	const allPlan = useFetchAllPlan(getValidToken)

	const patchUser = usePatchUser(getValidToken)

	const onSubmit = async (data) => {

		const obj = {
			"addressId": data.address,
			"companyId": data.company,
			"planId": selectedPlanId,
			"offerIdList": [],
			"paymentIdList": [],
			"isRegistered": true
		}

		const user = await getUserById()

		const param = {
			id: user.id,
			userPatch: obj
		}

		try{
			patchUser.mutate(param)
		}
		catch (error) {
			console.error("une erreur s'est produite lors de l'inscription de l'utilisateur")
			return
		}

		logout()
	}

	const companyMinimized = useFetchAllCompaniesMinimized(getValidToken)
	const selectedCompany: string = watch("company")
	const addressList = useQuery({
		queryKey: ["address-list-company", selectedCompany],
		queryFn: async (): Promise<Address[]> => {
			return await getAll("http://localhost:8090/api/v1/company/address-list/" + selectedCompany, getValidToken);
		},
		enabled: !!selectedCompany
	})

	useEffect(() => {
		console.log(addressList.data)
	}, [addressList])

	if (allPlan.isLoading) {
		return (
			<LoadingSpinner/>
		)
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

					<Text className="font-bold text-3xl mb-5">Completez votre profil recruteur</Text>



					<Text className="font-bold text-lg">Dans quelle entreprise travaillez-vous</Text>
					<Controller
						control={control}
						render={({ field }) => (
							<Picker
								style={{ borderWidth: 1, borderColor: "rgb(156 163 175)", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAF8F2" }}
								selectedValue={field.value}
								onValueChange={field.onChange}
							>
								<Picker.Item label="..." value=" " />
								{ companyMinimized.data?.map(data => <Picker.Item key={data.id} label={data.name} value={data.id} />)}
							</Picker>
						)}
						name="company"
						rules={{ required: 'Le champ de sélection est requis' }}
					/>
					{errors.selectField && <Text style={{ color: 'red' }}>{errors.selectField.message}</Text>}

					<Pressable>
						<Text className="underline text-accent-blue">Votre entreprise n'est pas dans la liste ? Créez là</Text>
					</Pressable>

					{ !addressList.isError && !addressList.isLoading &&
						<>
							<Text className="font-bold text-lg">A quelle adresse</Text>
							<Controller
								control={control}
								render={({ field }) => (
									<Picker
										style={{ borderWidth: 1, borderColor: "rgb(156 163 175)", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAF8F2" }}
										selectedValue={field.value}
										onValueChange={field.onChange}
									>
										<Picker.Item label="..." value=" " />
										{ addressList.data?.map(data => <Picker.Item key={data.id} label={data.number + " " + data.street + ", " + data.zipCode + " " + data.city + ", " + data.country} value={data.id} />)}
									</Picker>
								)}
								name="address"
								rules={{ required: 'Le champ de sélection est requis' }}
							/>
							{errors.address && <Text style={{ color: 'red' }}>{errors.address.message}</Text>}
						</>
					}

					{ !allPlan.isLoading && !allPlan.isError &&
						<View className="flex-row flex-wrap w-full my-10 items-center justify-center">
							{ allPlan.data?.map((plan) => {
								return(
									<View className={`flex-col mx-5 my-2 items-center justify-center border rounded-xl ${plan.id === selectedPlanId ? "bg-accent-orange border-accent-orange" : "border-gray-400"}`}>
										<Text className={`font-bold text-lg ${plan.id === selectedPlanId ? "text-background" : ""}`}>{plan.name}</Text>
										<Text className={`px-5 ${plan.id === selectedPlanId ? "text-background" : ""}`}>{plan.description}</Text>
										<Text className={`font-bold ${plan.id === selectedPlanId ? "text-background" : ""}`}>{plan.price} {plan.currency}</Text>
										<Pressable className="pb-2" onPress={() => {
											setSelectedPlanId(plan.id)
										}}>
											<Text className={`${plan.id === selectedPlanId ? "text-background" : ""}`}>Selectionner</Text>
										</Pressable>
									</View>
								)
							})}
						</View>
					}

					<TouchableOpacity className="border-primary rounded-lg bg-primary p-2 my-4" onPress={handleSubmit(onSubmit)}>
						<Text className="text-center text-background font-bold text-xl">S'inscrire</Text>
					</TouchableOpacity>

				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default RegisterFormRecruiterStep;