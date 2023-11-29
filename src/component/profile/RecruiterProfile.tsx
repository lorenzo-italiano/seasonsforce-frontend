import React, {useContext} from 'react';
import {FlatList, Image, ScrollView, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import useFetchDetailedUserById from "../../rest/hook/user/useFetchDetailedUserById";
import LoadingSpinner from "../loading/LoadingSpinner";
import defaultProfilePicture from "../../../assets/images/default-profile-picture.png";
import useFetchAllReviewByRecruiterId from "../../rest/hook/review/useFetchAllReviewByRecruiterId";
import ReviewList from "../list/ReviewList";
import useFetchOfferListByCreatorId from "../../rest/hook/offer/useFetchOfferListByCreatorId";
import OfferCard from "../card/OfferCard";

const RecruiterProfile = () => {

	const navigation = useNavigation()

	const { getUserId, getValidToken } = useContext(AuthContext)

	const { data, isError, error, isLoading } = useFetchDetailedUserById(getValidToken, getUserId())

	const reviewList = useFetchAllReviewByRecruiterId(getUserId(), getValidToken)

	const offerList = useFetchOfferListByCreatorId(getUserId(), getValidToken)

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
			<View className="flex flex-col w-full items-center mt-20">
				{ data?.profilePictureUrl &&
					<Image source={{uri: user.profilePictureUrl}} style={{width: 200, height: 200}} />
				}
				{ data?.profilePictureUrl === null &&
					<Image source={defaultProfilePicture} style={{width: 200, height: 200}} />
				}
				<Text className="font-bold text-4xl mt-2">{capitalizeFirstLetter(data?.firstName)} {capitalizeFirstLetter(data?.lastName)}</Text>
			</View>

			<View className="w-full flex flex-col">
				<View className="flex flex-row justify-between items-center w-full px-10">
					<Text className="font-bold text-xl">Vos offres</Text>
				</View>

				<View className="w-full flex mt-2">
					{ offerList.isLoading &&
						<LoadingSpinner />
					}

					{ !offerList.isError && !offerList.isLoading &&
						<FlatList
							className="px-16"
							data={offerList.data}
							renderItem={({item}) => <OfferCard key={item.id} offer={item}/>}
						/>
					}
				</View>
			</View>

			<View className="w-full flex flex-col px-10">
				<View className="flex flex-row justify-between items-center w-full">
					<Text className="font-bold text-xl">Les avis que vous avez donné</Text>
				</View>

				<View className="w-full flex mt-2">
					{ reviewList.isLoading &&
						<LoadingSpinner />
					}

					{ !reviewList.isError && !reviewList.isLoading &&
						<ReviewList reviewList={reviewList.data} />
					}
				</View>
			</View>

		</ScrollView>
	)
}

export default RecruiterProfile;