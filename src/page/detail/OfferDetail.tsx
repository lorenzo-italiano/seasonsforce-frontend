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

const OfferDetail = () => {
	const route = useRoute();
	const { offer } = route.params;

	const { getUserRole, getUserId, userToken, getValidToken } = useContext(AuthContext)

	const [role, setRole] = useState<string>(null)
	const [userId, setUserId] = useState<string>(null)

	const navigation = useNavigation()

	const deleteOffer = useDeleteOffer(getValidToken)

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
			initialValues: offer,
			isUpdate: true
		}

		navigation.navigate("CreateOfferForm", param)
	}

	return(
		<SafeAreaView className="flex flex-col items-center w-screen flex-1 bg-white gap-y-5">
			<ScrollView className="flex-1 w-full h-full gap-y-5" contentContainerStyle={{alignItems: "center"}}>
				<View className="flex w-full px-4 flex-row justify-between items-center">
					<Pressable onPress={handleGoBack}>
						<FontAwesome name="arrow-left" size="32"/>
					</Pressable>
					{ role === "recruiter" && offer.creatorId === userId &&
						<View className="flex flex-row">
							<Pressable onPress={handleUpdateRedirect}>
								<MaterialCommunityIcons name="pencil" size="32"/>
							</Pressable>
							<Pressable onPress={handleDeleteOffer}>
								<MaterialCommunityIcons name="delete" size="32"/>
							</Pressable>
						</View>
					}

				</View>

				<View className="flex flex-col items-center justify-start w-5/6 bg-accent-blue rounded-2xl p-4 gap-y-2">
					<View className="flex flex-row items-center justify-between w-full">
						<Text className="text-xl font-bold">{offer.job_title}</Text>
						<Image className="w-20 h-20" source={{ uri: offer.company.logoUrl }} />
					</View>
					<Text className="w-full">{offer.company.name}, {offer.address.city}, {offer.address.zipCode}</Text>
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
						<Text className="">{offer.company.employeesNumberRange} employés</Text>
					</View>

					<View className="flex flex-row gap-x-3 w-full items-center">
						<MaterialIcons name="location-on" size="20"/>
						<Text className="">{offer.address.number} {offer.address.street}, {offer.address.zipCode} {offer.address.city}</Text>
					</View>

					<View className="flex flex-row gap-x-3 w-full items-center">
						<FontAwesome name="flag" size="20"/>
						<Text className="">{offer.address.country}</Text>
					</View>
				</View>

				<View className="flex flex-col w-5/6 bg-accent-blue rounded-2xl p-4">
					<Text className="text-2xl font-bold">Informations sur l'offre</Text>
					<View className="flex flex-row gap-x-3 w-full items-center pt-3">
						<MaterialIcons name="attach-money" size="20"/>
						<Text className="">{offer.salary}€</Text>
					</View>

					<View className="flex flex-col w-full pt-3">
						<Text className="font-bold text-lg pb-3">Compétences requises</Text>
						{ offer.required_skills.map((skill) => <Text key={skill}>-{skill}</Text>) }
					</View>

				</View>

				<View className="flex flex-col w-5/6 bg-accent-blue rounded-2xl p-4" >
					<Text className="text-2xl font-bold">Description de l'offre</Text>
					<Text className="w-2/3 pt-5">{offer.job_description}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default OfferDetail;