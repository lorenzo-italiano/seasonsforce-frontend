import React, {useContext, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import TextInputForm from "../../../component/form/input/TextInputForm";
import {Picker} from "@react-native-picker/picker";
import useFetchAllJobCategory from "../../../rest/hook/jobcategory/useFetchAllJobCategory";
import {AuthContext} from "../../../context/AuthContext";
import DynamicTextInputForm from "../../../component/form/input/DynamicTextInputForm";
import useAddAvailabilityToUser from "../../../rest/hook/availability/useAddAvailabilityToUser";
import {useNavigation} from "@react-navigation/native";
import {formatDateToISO} from "../../../utils/DateHelper";

const AddOrModifyAvailability = () => {

	const { getValidToken, getUserId } = useContext(AuthContext)

	const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();
	const [currentUserId, setCurrentUserId] = useState(null)

	const jobCategoryList = useFetchAllJobCategory(getValidToken)

	const addAvailability = useAddAvailabilityToUser(currentUserId, getValidToken)
	const navigation = useNavigation()

	useEffect(() => {
		setCurrentUserId(getUserId())
	})

	const onSubmit = async (data) => {

		const obj = {
			"jobTitle": data.jobTitle,
			"jobCategoryId": data.jobCategoryId,
			"startDate": formatDateToISO(data.startDate),
			"endDate": formatDateToISO(data.endDate),
			"placeList": data.placeList
		}

		try {
			await addAvailability.mutateAsync(obj)
			navigation.navigate("ProfilePage")
		}
		catch (error) {
			console.error(error.message)
			return
		}
	}

	return (
		<SafeAreaView className="bg-background h-full flex justify-center items-center">
			<View>
				<Text className="font-bold text-3xl">Ajouter une disponibilité</Text>

				<TextInputForm
					label="Intitulé du poste visé"
					name="jobTitle"
					control={control}
					rules={{
						required: 'L\'intitulé du poste visé est requis',

					}}
					placeholder="Intitulé du poste visé"
				/>

				<TextInputForm
					label="Date de début de disponibilité"
					name="startDate"
					control={control}
					rules={{
						required: 'La date de début de disponibilité est requise',
						pattern: {
							value: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
							message: 'La date de début de disponibilité doit être au format JJ/MM/AAAA',
						},
					}}
					placeholder="Date de début de votre disponibilité"
				/>

				<TextInputForm
					label="Date de fin de disponibilité"
					name="endDate"
					control={control}
					rules={{
						required: 'La date de fin de disponibilité est requise',
						pattern: {
							value: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
							message: 'La date de fin de disponibilité doit être au format JJ/MM/AAAA',
						},
					}}
					placeholder="Date de fin de votre disponibilité"
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

						<DynamicTextInputForm
							name="placeList"
							label="Disponibilités Géographiques"
							control={control}
							getValues={getValues}
							setValue={setValue}
							isUpdate={false}
							rules={{}}
						/>

						<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
							<Text className="text-center text-background font-bold text-xl">Créer</Text>
						</Pressable>
					</>
				}
			</View>
		</SafeAreaView>
	)
}

export default AddOrModifyAvailability;