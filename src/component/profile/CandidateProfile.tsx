import React, {useContext, useEffect, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import useFetchDetailedUserById from "../../rest/hook/user/useFetchDetailedUserById";
import useRemoveAvailabilityToUser from "../../rest/hook/availability/useRemoveAvailabilityToUser";
import LoadingSpinner from "../loading/LoadingSpinner";

const CandidateProfile = () => {

	const navigation = useNavigation()

	const { getUserId, getValidToken } = useContext(AuthContext)
	const [userId, setUserId] = useState<string>(null)

	const { data, isError, error, isLoading } = useFetchDetailedUserById(getValidToken, userId)
	const removeAvailability = useRemoveAvailabilityToUser(userId, getValidToken)

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

	return (
		<View className="w-full">
			<View>
				<View className="flex flex-row justify-between items-center w-full">
					<Text className="font-bold text-2xl">Vos disponibilités</Text>
					<Pressable onPress={() => navigation.navigate("AddOrModifyAvailability")}>
						<MaterialCommunityIcons name="plus-circle" size={32} />
					</Pressable>
				</View>

				<View>
					{ data?.availabilityList.map((availability) => {
						return(
							<View key={availability.id}>
								<Text>{availability.jobTitle}</Text>
								<Text>{availability.jobCategoryId}</Text>
								<Text>{availability.startDate}</Text>
								<Text>{availability.endDate}</Text>
								{ availability.placeList.map((place) => (<Text key={place}>{place}</Text>))}
								<Pressable onPress={async () => {
									try {
										await removeAvailability.mutateAsync({ id: availability.id})
									}
									catch (e) {
										console.error(e)
										return
									}
								}}>
									<MaterialCommunityIcons name="delete" size={32} />
								</Pressable>
							</View>
						)})
					}
				</View>
			</View>

			<View>
				<View className="flex flex-row justify-between items-center w-full">
					<Text className="font-bold text-2xl">Vos Avis</Text>
				</View>

				<View>
					{ data?.reviewList.map((review) => {
						return(
							<View>
								<Text>{review.grade}/5</Text>
								<Text>{review.message}</Text>
								<Text>{review.offerId}</Text>
								<Text>{review.senderId}</Text>
								<Text>{review.date}</Text>
								{ review.responseList.map((response) => (<Text key={response}>{response}</Text>))}
							</View>
						)})
					}
				</View>
			</View>

		</View>


	)


}

export default CandidateProfile;