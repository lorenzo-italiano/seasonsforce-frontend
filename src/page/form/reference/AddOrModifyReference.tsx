import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useForm} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import TextInputForm from "../../../component/form/input/TextInputForm";
import useFetchUserIdByFirstnameLastname from "../../../rest/hook/user/useFetchUserIdByFirstnameLastname";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import defaultProfilePicture from "../../../../assets/images/default-profile-picture.png";
import useAddReferenceToUser from "../../../rest/hook/reference/useAddReferenceToUser";

const AddOrModifyReference = () => {

	const { getValidToken, getUserId } = useContext(AuthContext)

	const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();
	const [currentUserId, setCurrentUserId] = useState(null)

	const [resultList, setResultList] = useState(null)
	const [selectedRecruiter, setSelectedRecruiter] = useState(null)

	const userByFirstnameLastname = useFetchUserIdByFirstnameLastname(getValidToken)

	const addReference = useAddReferenceToUser(currentUserId, getValidToken)
	const navigation = useNavigation()

	useEffect(() => {
		setCurrentUserId(getUserId())
	})

	const handleSearchContact = async () => {
		const firstname = getValues("firstname")
		const lastname = getValues("lastname")

		if (firstname && !lastname) {
			try {
				const resp = await userByFirstnameLastname.searchByFirstname.mutateAsync(firstname)
				setResultList(resp)
			}
			catch (error) {
				console.error(error.message)
				return
			}
		}

		if (!firstname && lastname) {
			try {
				const resp = await userByFirstnameLastname.searchByLastname.mutateAsync(lastname)
				setResultList(resp)
			}
			catch (error) {
				console.error(error.message)
				return
			}
		}

		if (firstname && lastname) {
			try {
				const resp = await userByFirstnameLastname.searchByFirstnameAndLastname.mutateAsync({firstname, lastname})
				setResultList(resp)
			}
			catch (error) {
				console.error(error.message)
				return
			}
		}
	}


	const onSubmit = async (data) => {

		if (!selectedRecruiter) {
			// TODO replace by react-hook-form error
			console.error("No recruiter selected")
			return
		}

		const obj = {
			"contact": selectedRecruiter.firstName + " " + selectedRecruiter.lastName,
			"companyId": selectedRecruiter.company.id,
			"contactId": selectedRecruiter.recruiterId,
			"contactJobTitle": data.jobTitle
		}

		try {
			await addReference.mutateAsync(obj)
			reset()
			navigation.navigate("ProfilePage")
		}
		catch (e) {
			console.error(e)
			reset()
			return
		}
	}

	return (
		<SafeAreaView>
			<ScrollView className="px-10">
				<Text className="font-bold text-3xl mb-5">Ajouter une référence</Text>

				<View className="flex flex-row justify-center items-center gap-x-2">
					<View className="flex flex-col">
						<TextInputForm
							label="Prénom du contact"
							name="firstname"
							control={control}
							rules={{}}
							placeholder="Prénom du contact"
						/>
					</View>

					<View className="flex flex-col">
						<TextInputForm
							label="Nom du contact"
							name="lastname"
							control={control}
							rules={{}}
							placeholder="Nom du contact"
						/>
					</View>

					<Pressable onPress={handleSearchContact}>
						<MaterialCommunityIcons name="magnify" size={32} />
					</Pressable>
				</View>

				{ resultList &&
					<View className="flex flex-col w-full">
						{
							resultList.map((recruiter) => {

								return(
									<View key={recruiter.id} className={`flex flex-row w-full border-2 border-primary ${ selectedRecruiter?.id === recruiter.id ? "bg-accent-blue" : "bg-background" } justify-between p-2 rounded-lg`}>
										{ recruiter.profilePictureUrl &&
											<Image source={{uri: recruiter.profilePictureUrl}} style={{width: 100, height: 100}} />
										}
										{ recruiter.profilePictureUrl === null &&
											<Image source={defaultProfilePicture} style={{width: 100, height: 100}} />
										}
										<View className="flex flex-col justify-between items-end">
											<Text className="font-bold text-2xl">{recruiter.firstName} {recruiter.lastName}</Text>
											<Pressable onPress={() => setSelectedRecruiter(recruiter)}>
												<Text>Selectionner</Text>
											</Pressable>
										</View>
									</View>
								)

							})
						}
					</View>
				}


				<TextInputForm
					label="Poste lors de la collaboration"
					name="jobTitle"
					control={control}
					rules={{
						required: 'Le poste lors de la collaboration est requis',
					}}
					placeholder="Poste lors de la collaboration"
				/>

				<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
					<Text className="text-center text-background font-bold text-xl">Créer</Text>
				</Pressable>
			</ScrollView>

		</SafeAreaView>
	)
}

export default AddOrModifyReference;