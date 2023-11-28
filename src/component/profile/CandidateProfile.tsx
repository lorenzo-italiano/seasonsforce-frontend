import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, ScrollViewComponent, Text, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import useFetchDetailedUserById from "../../rest/hook/user/useFetchDetailedUserById";
import useRemoveAvailabilityToUser from "../../rest/hook/availability/useRemoveAvailabilityToUser";
import LoadingSpinner from "../loading/LoadingSpinner";
import defaultProfilePicture from "../../../assets/images/default-profile-picture.png";
import {formatIsoToSimpleDate} from "../../utils/DateHelper";
import useRemoveReferenceToUser from "../../rest/hook/reference/useRemoveReferenceToUser";
import ReviewList from "../list/ReviewList";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CandidateProfile = () => {

	const navigation = useNavigation()

	const { getUserId, getValidToken } = useContext(AuthContext)
	const [userId, setUserId] = useState<string>(null)

	const { data, isError, error, isLoading } = useFetchDetailedUserById(getValidToken, userId)
	const removeAvailability = useRemoveAvailabilityToUser(userId, getValidToken)
	const removeReference = useRemoveReferenceToUser(userId, getValidToken)

	const getUserInfos = async () => {
		setUserId(getUserId())
	}

	useEffect(() => {
		getUserInfos()
	}, [])

	if(isLoading) {
		return (
			<LoadingSpinner/>
		)
	}

	if(isError) {
		return (
			<Text>Error: {error.message}</Text>
		)
	}

	function capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<ScrollView className="flex-1 w-full">
			<View className="absolute top-0 left-0 w-screen h-56 bg-accent-blue" />
			<Pressable className="w-screen flex items-end justify-end mt-1 mr-5" onPress={() => navigation.navigate("UserSettings")}>
				<MaterialIcons name="settings" size={32} />
			</Pressable>
			<View className="flex flex-col w-full items-center mt-14">
				{/*<Image source={{uri: profilePicture}} style={{width: 250, height: 250}} />*/}
				{ data?.profilePictureUrl &&
					<Image source={{uri: user.profilePictureUrl}} style={{width: 200, height: 200}} />
				}
				{ data?.profilePictureUrl === null &&
					<Image source={defaultProfilePicture} style={{width: 200, height: 200}} />
				}
				<Text className="font-bold text-4xl mt-2">{capitalizeFirstLetter(data?.firstName)} {capitalizeFirstLetter(data?.lastName)}</Text>
			</View>

			<View className="flex flex-row justify-between items-center w-full px-10 mt-5 mb-2">
				<Text className="font-bold text-xl">Vos disponibilités</Text>
				<Pressable onPress={() => navigation.navigate("AddOrModifyAvailability")}>
					<MaterialCommunityIcons name="plus-circle" size={32} />
				</Pressable>
			</View>

			<View className="flex flex-col px-10 gap-y-1">
				{ data?.availabilityList.map((availability) => {
					return(
						<View key={availability.id} className="flex flex-col p-3 border-2 border-primary rounded-lg">
							<View className="flex flex-row justify-between items-end">
								{/*<Text><b>Poste:</b> {availability.jobTitle}</Text>*/}
								<Text className="font-bold text-lg">Poste: {availability.jobTitle}</Text>
								<Pressable onPress={async () => {
									try {
										await removeAvailability.mutateAsync({ id: availability.id})
									}
									catch (e) {
										console.error(e)
										return
									}
								}}>
									<MaterialCommunityIcons name="delete" size={20} />
								</Pressable>
							</View>
							{/*<Text><b>Domaine:</b> {availability.jobCategory.name}</Text>*/}
							<Text>Domaine: {availability.jobCategory.name}</Text>
							<Text>Période: {formatIsoToSimpleDate(availability.startDate)} - {formatIsoToSimpleDate(availability.endDate)}</Text>
							{/*<Text><b>Période:</b> {formatIsoToSimpleDate(availability.startDate)} - {formatIsoToSimpleDate(availability.endDate)}</Text>*/}
							<Text className="font-bold">Lieux</Text>
							<View className="flex flex-row flex-wrap items-center gap-x-2">
								{ availability.placeList.map((place) => (<Text className="border border-accent-blue rounded-sm p-1 bg-accent-blue text-background" key={place}>{place}</Text>))}
							</View>
						</View>
					)})
				}
			</View>

			<View className="px-10 my-5">
				<View className="flex flex-row justify-between items-center w-full mb-2">
					<Text className="font-bold text-xl">Vos experiences professionnelles</Text>
				</View>

				<View>
					{ data?.experienceList.map((experience) => {
						return(
							<View className="flex flex-row justify-between items-center p-3 border-2 border-primary rounded-lg" key={experience.id}>
								<View>
									<Text className="font-bold text-lg">Poste: {experience.jobTitle}</Text>
									<Text>Secteur: {experience.jobCategory.name}</Text>
									<Text>{formatIsoToSimpleDate(experience.startDate)} - {formatIsoToSimpleDate(experience.endDate)}</Text>
								</View>
								<View className="flex flex-col justify-center items-center">
									{ experience.company.logoUrl &&
										<Image source={{uri: experience.company.logoUrl}} style={{width: 50, height: 50}} />
									}
									{ experience.company.logoUrl === null &&
										<Image source={defaultProfilePicture} style={{width: 50, height: 50}} />

									}
									<Text className="font-bold">{experience.company.name}</Text>
								</View>

							</View>
						)})
					}
				</View>
			</View>

			<View className="px-10">
				<View className="flex flex-row justify-between items-center w-full">
					<Text className="font-bold text-xl">Vos références professionnelles</Text>
					<Pressable onPress={() => navigation.navigate("AddOrModifyReference")}>
						<MaterialCommunityIcons name="plus-circle" size={32} />
					</Pressable>
				</View>

				<View className="mt-2">
					{ data?.referenceList.map((reference) => {
						return(
							<View key={reference.id} className="border-2 border-primary flex flex-row rounded-lg p-2">
								<View className="flex items-center justify-center">
									{ reference.contact.profilePictureUrl &&
										<Image source={{uri: reference.contact.profilePictureUrl}} style={{width: 100, height: 100}} />
									}
									{ reference.contact.profilePictureUrl === null &&
										<Image source={defaultProfilePicture} style={{width: 100, height: 100}} />
									}
								</View>
								<View className="flex flex-col flex-1">
									<Pressable onPress={async () => {
										try {
											await removeReference.mutateAsync({ id: reference.id })
										}
										catch (e) {
											console.error(e)
											return
										}
									}} className="items-end">
										<MaterialCommunityIcons name="delete" size={20} />
									</Pressable>
									<View className="flex flex-col justify-center pl-10">
										<Text className="font-bold text-lg">{reference.contactName}</Text>
										<Text>{reference.contactJobTitle}</Text>
										<Text>{reference.company.name}</Text>
									</View>

								</View>

							</View>
						)})
					}
				</View>
			</View>

			<View className="w-full flex flex-col px-10">
				<View className="flex flex-row justify-between items-center w-full">
					<Text className="font-bold text-xl">Ce que les recruteurs pensent de vous</Text>
				</View>

				<View className="w-full">
					<ReviewList reviewList={data?.reviewList} />
				</View>
			</View>

		</ScrollView>
	)


}

export default CandidateProfile;