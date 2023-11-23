import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Text} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {AuthContext} from "../../context/AuthContext";
import useDeleteOffer from "../../rest/hook/offer/useDeleteOffer";
import {OfferDetailRouteParams} from "../../model/create/OfferDetailRouteParams";
import OfferMatchingUserList from "../../component/list/offer/OfferMatchingUserList";
import useRemoveRecruitedIdToOffer from "../../rest/hook/offer/useRemoveRecruitedIdToOffer";
import useFetchOfferById from "../../rest/hook/offer/useFetchOfferById";
import LoadingSpinner from "../../component/loading/LoadingSpinner";

const OfferDetail = () => {
	const route = useRoute();
	const { offer } = route.params;

	const { getUserRole, getUserId, userToken, getValidToken } = useContext(AuthContext)

	const [role, setRole] = useState<string>(null)
	const [userId, setUserId] = useState<string>(null)

	const navigation = useNavigation()

	const deleteOffer = useDeleteOffer(getValidToken)
	const removeRecruitedIdFromOffer = useRemoveRecruitedIdToOffer(getValidToken, offer.company.id)

	const [recruiterUserId, setRecruiterUserId] = useState<string>("")

	const offerObject = useFetchOfferById(getValidToken, offer.id)

	useEffect(() => {
		const getUserInfos = () => {
			setRole(getUserRole())
			setUserId(getUserId())
		}

		getUserInfos()
	}, [])

	useEffect(() => {
		const getUserInfos = () => {
			setRole(getUserRole())
			setUserId(getUserId())
		}

		getUserInfos()
	}, [userToken])

	useEffect(() => {
		if (!offerObject.isLoading && !offerObject.isError) {
			setRecruiterUserId(offerObject.data.recruitedId ?? "")
		}
	},[offerObject.data])

	const handleGoBack = () => {
		navigation.navigate("Offer")
	}

	const handleDeleteOffer = async () => {
		try {
			await deleteOffer.mutateAsync(offer)
			navigation.navigate("Offer")
		}
		catch (e) {
			console.error(e)
			return
		}

	}

	const handleUpdateRedirect = () => {
		const param: OfferDetailRouteParams = {
			initialValues: offerObject?.data,
			isUpdate: true
		}

		navigation.navigate("CreateOfferForm", param)
	}

	const handleRemoveRecruitedId = async () => {
		try {
			await removeRecruitedIdFromOffer.mutateAsync(offerObject.data.id)
		}
		catch (e) {
			console.error(e)
			return
		}
	}

	if (offerObject.isLoading) {
		return <LoadingSpinner/>
	}

	if (offerObject.isError) {
		return <Text>{offerObject.error.message}</Text>
	}


	return(
		<SafeAreaView className="flex flex-col items-center w-screen flex-1 bg-white gap-y-5">
			<ScrollView className="flex-1 w-full h-full gap-y-5" contentContainerStyle={{alignItems: "center"}}>
				<View className="flex w-full px-4 flex-row justify-between items-center">
					<Pressable onPress={handleGoBack}>
						<FontAwesome name="arrow-left" size="32"/>
					</Pressable>
					{ role === "recruiter" && offerObject.data.creatorId === userId &&
						<View className="flex flex-row">
							{ new Date(offerObject.data.startDate) > Date.now() && (offerObject.data.offer_status !== "COMPLETED" || offerObject.data.offer_status !== "REVIEWED") &&
								<Pressable onPress={handleUpdateRedirect}>
									<MaterialCommunityIcons name="pencil" size="32"/>
								</Pressable>
							}
							<Pressable onPress={handleDeleteOffer}>
								<MaterialCommunityIcons name="delete" size="32"/>
							</Pressable>
						</View>
					}



				</View>

				{ role === "recruiter" && offerObject.data.creatorId === userId &&
					<Text className="text-center font-bold text-2xl">{offerObject.data.offer_status}</Text>
				}

				<View className="flex flex-col items-center justify-start w-5/6 bg-accent-blue rounded-2xl p-4 gap-y-2">
					<View className="flex flex-row items-center justify-between w-full">
						<Text className="text-xl font-bold">{offerObject.data.job_title}</Text>
						<Image className="w-20 h-20" source={{ uri: offerObject.data.company.logoUrl }} />
					</View>
					<Text className="w-full">{offerObject.data.company.name}, {offerObject.data.address.city}, {offerObject.data.address.zipCode}</Text>
				</View>


				<View className="flex flex-col items-center w-5/6 bg-accent-blue rounded-2xl p-4 gap-y-3">
					<View className="flex flex-row items-center justify-between w-full">
						<Text className="text-2xl font-bold">Informations entreprise</Text>
						{/*		// TODO on press redirect to company details*/}
						<Pressable>
							<FontAwesome name="arrow-right" size="30"/>
						</Pressable>
					</View>

					<View className="flex flex-row gap-x-3 w-full items-center">
						<FontAwesome name="building" size="20"/>
						<Text className="">{offerObject.data.company.employeesNumberRange} employés</Text>
					</View>

					<View className="flex flex-row gap-x-3 w-full items-center">
						<MaterialIcons name="location-on" size="20"/>
						<Text className="">{offerObject.data.address.number} {offerObject.data.address.street}, {offerObject.data.address.zipCode} {offerObject.data.address.city}</Text>
					</View>

					<View className="flex flex-row gap-x-3 w-full items-center">
						<FontAwesome name="flag" size="20"/>
						<Text className="">{offerObject.data.address.country}</Text>
					</View>
				</View>

				<View className="flex flex-col w-5/6 bg-accent-blue rounded-2xl p-4">
					<Text className="text-2xl font-bold">Informations sur l'offre</Text>
					<View className="flex flex-row gap-x-3 w-full items-center pt-3">
						<MaterialIcons name="attach-money" size="20"/>
						<Text className="">{offerObject.data.salary}€</Text>
					</View>

					<View className="flex flex-col w-full pt-3">
						<Text className="font-bold text-lg pb-3">Compétences requises</Text>
						{ offerObject.data.required_skills.map((skill) => <Text key={skill}>-{skill}</Text>) }
					</View>

				</View>

				<View className="flex flex-col w-5/6 bg-accent-blue rounded-2xl p-4 mb-4" >
					<Text className="text-2xl font-bold">Description de l'offre</Text>
					<Text className="w-2/3 pt-5">{offerObject.data.job_description}</Text>
				</View>

				{ recruiterUserId !== "" && offerObject.data.offer_status !== "COMPLETED" && offerObject.data.offer_status !== "REVIEWED" &&
					<Text className="mt-5 font-bold text-2xl mb-2">Un candidat a déjà été recruté pour cette offre !</Text>
				}

				{ offerObject.data.offer_status === "REVIEWED" &&
					<Text className="mt-5 font-bold text-2xl mb-2">Cette offre est clôturé et un avis sur le candidat a été formulé.</Text>
				}

				{ recruiterUserId !== "" && offerObject.data.offer_status !== "COMPLETED" && new Date(offerObject.data.startDate) > Date.now() && role === "recruiter" &&
					<Pressable className="border-accent-blue rounded-lg bg-accent-blue p-3 my-2" onPress={handleRemoveRecruitedId}>
						<Text className="text-center font-bold text-xl">Invalider le choix</Text>
					</Pressable>
				}

				{ recruiterUserId === "" && role === "recruiter" && offerObject.data.creatorId === userId &&
					<OfferMatchingUserList offerId={offerObject.data.id} companyId={offerObject.data.company.id} />
				}

				{ role === "recruiter" && offerObject.data.creatorId === userId && offerObject.data.offer_status === "COMPLETED" &&
					<>
						<Text className="my-5 font-bold text-2xl">Cette offre est terminée ! Vous pouvez faire une review pour votre employé !</Text>
						<Pressable className="border-accent-blue rounded-lg bg-accent-blue p-3 my-2" onPress={() => navigation.navigate("CreateReview", {offer: offerObject.data})}>
							<Text className="text-center font-bold text-xl">Faire une review</Text>
						</Pressable>
					</>
				}
			</ScrollView>
		</SafeAreaView>
	)
}

export default OfferDetail;