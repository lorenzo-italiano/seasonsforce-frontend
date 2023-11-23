import React, {useContext} from 'react';
import useFetchMatchedUserForOffer from "../../../rest/hook/user/useFetchMatchedUserForOffer";
import {AuthContext} from "../../../context/AuthContext";
import {Image, Pressable, Text, View} from "react-native";
import defaultProfilePicture from "../../../../assets/images/default-profile-picture.png";
import useAddRecruitedIdToOffer from "../../../rest/hook/offer/useAddRecruitedIdToOffer";

const OfferMatchingUserList = ( {offerId, companyId} ) => {

	const { getValidToken } = useContext(AuthContext)

	const { data, isLoading, isError, error } = useFetchMatchedUserForOffer(offerId, getValidToken)

	const addRecruitedIdToOffer = useAddRecruitedIdToOffer(getValidToken, companyId)

	const handleRecruit = async (userId: string) => {
		try {
			await addRecruitedIdToOffer.mutateAsync({offerId: offerId, recruitedId: userId})
		}
		catch (error) {
			console.error(error.message)
			return
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>{error.message}</div>
	}

	return (
		<>
			{data?.length > 0 &&
				<Text className="text-2xl font-bold my-10">Candidats recommandés pour cette offre</Text>
			}
			<View className="flex flex-row items-center justify-center flex-wrap mb-5">

				{ data &&
					data.map((user) => (
						<View key={user.id} className="bg-accent-blue flex flex-col items-center justify-center p-5 border-accent-blue rounded-lg">
							<Image className="mb-5" source={{uri: user.profilePictureUrl ?? defaultProfilePicture}} style={{width: 200, height: 200}} />
							<Text>{user.firstName} {user.lastName}</Text>
							<Text>{user.email}</Text>
							<Text>{user.phone}</Text>
							<Pressable className="border-primary rounded-lg bg-primary p-2 mt-2" onPress={async () => {
								console.log("trying to recruit")
								console.log(user.id)
								console.log(offerId)
								await handleRecruit(user.id)
								console.log("recruited")
							}}>
								<Text className="text-center text-background font-bold text-xl">Recruter</Text>
							</Pressable>
						</View>
					))
				}
			</View>
		</>
	)
}

export default OfferMatchingUserList;