import React, {useContext, useEffect, useState} from 'react';
import {Platform, Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import TextInputForm from "../../../component/form/input/TextInputForm";
import {AuthContext} from "../../../context/AuthContext";
import useFetchCompanyAddressList from "../../../rest/hook/company/useFetchCompanyAddressList";
import {Picker} from "@react-native-picker/picker";
import DynamicTextInputForm from "../../../component/form/input/DynamicTextInputForm";
import useFetchAllJobCategory from "../../../rest/hook/jobcategory/useFetchAllJobCategory";
import {formatDateToISO, formatIsoToSimpleDate} from "../../../utils/DateHelper";
import useCreateOffer from "../../../rest/hook/offer/useCreateOffer";
import {CreateOffer} from "../../../model/create/CreateOffer";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Offer} from "../../../model/create/Offer";
import {OfferDetailRouteParams} from "../../../model/create/OfferDetailRouteParams";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import usePutOffer from "../../../rest/hook/offer/usePutOffer";

const CreateOrUpdateOfferForm = () => {
	const route = useRoute();
	const params: OfferDetailRouteParams = route.params;

	const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();

	const { getUserCompanyId, getValidToken, getUserId } = useContext(AuthContext)

	const [companyId, setCompanyId] = useState<string>(null)

	const addressList = useFetchCompanyAddressList(companyId, getValidToken);

	const jobCategoryList = useFetchAllJobCategory(getValidToken)

	const createOffer = useCreateOffer(getValidToken)
	const updateOffer = usePutOffer(getValidToken)

	const navigation = useNavigation()

	useEffect(() => {
		const getCompanyId = async () => {
			setCompanyId(await getUserCompanyId())
		}

		getCompanyId()
	}, [])

	useEffect(() => {
		if (params.initialValues !== undefined) {
			console.log(params.initialValues)

			setValue("job_title", params.initialValues.job_title)
			setValue("job_description", params.initialValues.job_description)
			setValue("contract_type", params.initialValues.contract_type)
			setValue("hours_per_week", params.initialValues.hours_per_week)
			setValue("salary", params.initialValues.salary)
			setValue("addressId", params.initialValues.address.id)
			setValue("required_skills", params.initialValues.required_skills)
			setValue("benefits", params.initialValues.benefits)
			setValue("offer_language", params.initialValues.offer_language)
			setValue("contact_information", params.initialValues.contact_information)
			setValue("required_degree", params.initialValues.required_degree)
			setValue("required_experience", params.initialValues.required_experience)
			setValue("required_skills", params.initialValues.required_skills)
			setValue("jobCategoryId", params.initialValues.jobCategory.id)
			setValue("startDate", formatIsoToSimpleDate(params.initialValues.startDate))
			setValue("endDate", formatIsoToSimpleDate(params.initialValues.endDate))
		}
		else {
			reset()
			setValue("jobCategoryId", "")
			setValue("addressId", "")
			setValue("required_skills", [""])
			setValue("benefits", [""])
		}

	}, [params])

	const onSubmit = async (data) => {

		if(params.isUpdate && params.initialValues != undefined) {
			const obj: Offer = {
				"id": params.initialValues.id,
				"job_title": data.job_title,
				"job_description": data.job_description,
				"contract_type": data.contract_type,
				"companyId": companyId,
				"hours_per_week": data.hours_per_week,
				"salary": data.salary,
				"addressId": data.addressId,
				"benefits": data.benefits,
				"offer_language": data.offer_language,
				"publication_date": params.initialValues.publication_date,
				"offer_status": params.initialValues.offer_status,
				"contact_information": data.contact_information,
				"required_degree": data.required_degree,
				"required_experience": data.required_experience,
				"required_skills": data.required_skills,
				"jobCategoryId": data.jobCategoryId,
				"creatorId": params.initialValues.creatorId,
				"recruitedId": params.initialValues.recruitedId,
				"startDate": formatDateToISO(data.startDate) ?? "",
				"endDate": formatDateToISO(data.endDate) ?? ""
			}
			console.log("to update")
			console.log(obj)

			try{
				const res = await updateOffer.mutateAsync(obj)
				reset()
				setValue("jobCategoryId", "")
				setValue("addressId", "")
				setValue("required_skills", [""])
				setValue("benefits", [""])
				navigation.navigate("Offer")
			}
			catch (e) {
				console.error(e)
				return
			}
		}
		else {
			const obj: CreateOffer = {
				"job_title": data.job_title,
				"job_description": data.job_description,
				"contract_type": data.contract_type,
				"companyId": companyId,
				"hours_per_week": data.hours_per_week,
				"salary": data.salary,
				"addressId": data.addressId,
				"benefits": data.benefits,
				"offer_language": data.offer_language,
				"publication_date": new Date().toISOString(),
				"offer_status": "IN_PROGRESS",
				"contact_information": data.contact_information,
				"required_degree": data.required_degree,
				"required_experience": data.required_experience,
				"required_skills": data.required_skills,
				"jobCategoryId": data.jobCategoryId,
				"creatorId": getUserId(),
				"recruitedId": "",
				"startDate": formatDateToISO(data.startDate) ?? "",
				"endDate": formatDateToISO(data.endDate) ?? ""
			}

			console.log(obj)

			try{
				const res = await createOffer.mutateAsync(obj)
				reset()
				setValue("jobCategoryId", "")
				setValue("addressId", "")
				setValue("required_skills", [""])
				setValue("benefits", [""])
				navigation.navigate("Offer")
			}
			catch (e) {
				console.error(e)
				return
			}
		}

	}

	const handleGoBack = () => {
		reset()
		setValue("jobCategoryId", "")
		setValue("addressId", "")
		setValue("required_skills", [""])
		setValue("benefits", [""])
		navigation.navigate("Offer")
	}

	return (
		<SafeAreaView className="flex flex-1 w-screen bg-background">
			<ScrollView className="flex-col w-full h-full" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
				<View className="flex-col items-center justify-center w-screen bg-background">
					<Pressable className="flex w-full items-start justify-start px-5 mb-5" onPress={handleGoBack}>
						<FontAwesome name="arrow-left" size="32"/>
					</Pressable>

					{ params.isUpdate &&
						<Text className="font-bold text-3xl mb-5">Modifier une offre</Text>
					}

					{ !params.isUpdate &&
						<Text className="font-bold text-3xl mb-5">Créer une offre</Text>
					}

					<View className={`flex-col ${Platform.OS === "web" ? "w-2/5" : "w-5/6"}`}>

						{/*TODO add tous les patterns*/}

						<TextInputForm
							label="Intitulé de l'offre"
							name="job_title"
							control={control}
							rules={{
								required: "l'intitulé est requis",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Intitulé de l'offre"
						/>

						<TextInputForm
							label="Description de l'offre"
							name="job_description"
							control={control}
							rules={{
								required: "la description est requise",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Description de l'offre"
						/>

						<TextInputForm
							label="Type de contrat"
							name="contract_type"
							control={control}
							rules={{
								required: "le type de contrat est requis",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Type de contrat"
						/>

						<TextInputForm
							label="Nombre d'heures par semaine"
							name="hours_per_week"
							control={control}
							rules={{
								required: "le nombre d'heures par semaine est requis",
								pattern: {
									value: /^\d*[,.]?\d+$/,
									message: 'Le nombre d\'heures doit être composé de chiffres et éventuellement une virgule ou un point suivi de chiffres',
								}
							}}
							placeholder="Nombre d'heures par semaine"
						/>

						<TextInputForm
							label="Salaire"
							name="salary"
							control={control}
							rules={{
								required: "le salaire est requis",
								pattern: {
									value: /^\d*[.,]?\d{2}$/,
									message: 'Le salaire ne doit contenir que des chiffres et éventuellement une virgule ou un point suivi de 2 chiffres après la virgule',
								}
							}}
							placeholder="Salaire"
						/>

						<TextInputForm
							label="Langue de l'offre"
							name="offer_language"
							control={control}
							rules={{
								required: "la langue de l'offre est requise",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Langue de l'offre"
						/>

						<TextInputForm
							label="Informations de contact"
							name="contact_information"
							control={control}
							rules={{
								required: "les informations de contact sont requises",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Informations de contact"
						/>

						<TextInputForm
							label="Formation requise"
							name="required_degree"
							control={control}
							rules={{
								required: "la formation requise est obligatoire",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Formation requise"
						/>

						<TextInputForm
							label="Expérience requise"
							name="required_experience"
							control={control}
							rules={{
								required: "l'expérience requise est obligatoire",
								// pattern: {
								// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// 	message: 'L\'e-mail n\'est pas valide',
								// }
							}}
							placeholder="Expérience requise"
						/>

						{ !addressList.isError && !addressList.isLoading &&
							<>
								<Text className="font-bold text-lg">A quelle adresse</Text>
								<Controller
									control={control}
									render={({ field }) => (
										<Picker
											style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAF8F2" }}
											selectedValue={field.value}
											onValueChange={field.onChange}
										>
											<Picker.Item label="..." value=" " />
											{ addressList.data?.map(data => <Picker.Item key={data.id} label={data.number + " " + data.street + ", " + data.zipCode + " " + data.city + ", " + data.country} value={data.id} />)}
										</Picker>
									)}
									name="addressId"
									rules={{ required: 'Le champ de sélection est requis' }}
								/>
								{errors.addressId && <Text style={{ color: 'red' }}>{errors.addressId.message}</Text>}
							</>
						}

						<DynamicTextInputForm
							name="benefits"
							label="Avantages"
							control={control}
							getValues={getValues}
							setValue={setValue}
							isUpdate={params.isUpdate}
							rules={{}}
						/>

						<DynamicTextInputForm
							name="required_skills"
							label="Compétences requises"
							control={control}
							getValues={getValues}
							setValue={setValue}
							isUpdate={params.isUpdate}
							rules={{}}
						/>

						<TextInputForm
							label="Date de début de contrat"
							name="startDate"
							control={control}
							rules={{
								required: 'La date de début de contrat est requise',
								pattern: {
									value: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
									message: 'La date de début de contrat doit être au format JJ/MM/AAAA',
								},
							}}
							placeholder="Date de début"
						/>

						<TextInputForm
							label="Date de fin de contrat"
							name="endDate"
							control={control}
							rules={{
								required: 'La date de fin de contrat est requise',
								pattern: {
									value: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
									message: 'La date de fin de contrat doit être au format JJ/MM/AAAA',
								},
							}}
							placeholder="Date de fin"
						/>

						{ !jobCategoryList.isError && !jobCategoryList.isLoading &&
							<>
								<Text className="font-bold text-lg">Catégorie de l'emploi</Text>
								<Controller
									control={control}
									render={({ field }) => (
										<Picker
											style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAF8F2" }}
											selectedValue={field.value}
											onValueChange={field.onChange}
										>
											<Picker.Item label="..." value=" " />
											{ jobCategoryList.data?.map(data => <Picker.Item key={data.id} label={data.name} value={data.id} />)}
										</Picker>
									)}
									name="jobCategoryId"
									rules={{ required: 'La catégorie de l\'emploi est requise' }}
								/>
								{errors.jobCategoryId && <Text style={{ color: 'red' }}>{errors.jobCategoryId.message}</Text>}
							</>
						}

						{ params.isUpdate &&
							<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
								<Text className="text-center text-background font-bold text-xl">Modifier</Text>
							</Pressable>
						}

						{ !params.isUpdate &&
							<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
								<Text className="text-center text-background font-bold text-xl">Créer</Text>
							</Pressable>
						}

					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateOrUpdateOfferForm;