import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useForm} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {Image, Pressable, SafeAreaView, Text, View} from "react-native";
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

	useEffect(() => {
		console.log(selectedRecruiter)
	}, [selectedRecruiter])

	const handleSearchContact = async () => {
		const firstname = getValues("firstname")
		const lastname = getValues("lastname")

		if (firstname && !lastname) {
			try {
				const resp = await userByFirstnameLastname.searchByFirstname.mutateAsync(firstname)
				setResultList(resp)
				console.log(resp)
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
				console.log(resp)
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
				console.log(resp)
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

		console.log(selectedRecruiter)
		console.log(data)

		const obj = {
			"contact": selectedRecruiter.firstName + " " + selectedRecruiter.lastName,
			"companyId": selectedRecruiter.company.id,
			"contactId": selectedRecruiter.recruiterId,
			"contactJobTitle": data.jobTitle
		}

		console.log(obj)

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
			<Text>Form to add or modify availability</Text>

			<View className="flex flex-row justify-center items-center gap-x-2">
				<TextInputForm
					label="Prénom du contact"
					name="firstname"
					control={control}
					rules={{}}
					placeholder="Prénom du contact"
				/>

				<TextInputForm
					label="Nom du contact"
					name="lastname"
					control={control}
					rules={{}}
					placeholder="Nom du contact"
				/>

				<Pressable onPress={handleSearchContact}>
					<MaterialCommunityIcons name="magnify" size={32} />
				</Pressable>
			</View>

			{ resultList &&
				<View className="flex flex-col w-full px-28 gap-y-2">
					{
						resultList.map((recruiter) => {
							const profilePicture = recruiter.profilePictureUrl ? recruiter.profilePictureUrl : defaultProfilePicture

							return(
								<View key={recruiter.id} className={`flex flex-row w-full border-2 border-primary ${ selectedRecruiter?.id === recruiter.id ? "bg-primary" : "bg-accent-blue" } justify-between p-2 rounded-lg`}>
									<Image source={{uri: profilePicture}} style={{width: 100, height: 100}} />
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

			<Pressable onPress={handleSubmit(onSubmit)}>
				<Text>Créer</Text>
			</Pressable>
		</SafeAreaView>
	)
}

export default AddOrModifyReference;