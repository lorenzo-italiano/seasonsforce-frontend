import React from 'react';
import {View, Text, Image, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

const OfferCard = ({ offer }) => {

	const navigation = useNavigation();

	const handleCardPress = () => {
		navigation.navigate('OfferDetail', { offer }); // Naviguer vers la page de détails avec l'offre sélectionnée
	};

	return (
		<TouchableOpacity className="flex w-full bg-accent-blue rounded-2xl mb-5" onPress={handleCardPress}>
			<View className="w-full flex p-4 gap-3">
				<View className="flex flex-row items-center justify-between">
					<Text className="text-xl font-bold">{offer.job_title}</Text>
					<Image className="w-20 h-20" source={{ uri: offer.company.logoUrl }} />
				</View>

				<Text className="font-bold">{offer.company.name}, {offer.address.city}, {offer.address.zipCode}</Text>

				<View className="flex flex-row flex-wrap items-center justify-between">
					<Text className="w-2/3 ">{offer.job_description.substring(0, 80)}..</Text>
					<Text className="text-2xl">{offer.salary}€</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}


export default OfferCard;