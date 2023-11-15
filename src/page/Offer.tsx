import {SafeAreaView, Text} from "react-native";
import React, {useContext} from "react";
import useFetchOfferList from "../rest/hook/useFetchOfferList";
import {AuthContext} from "../context/AuthContext";
import OfferCard from "../component/card/OfferCard";

const Offer = () => {

	const { getValidToken } = useContext(AuthContext)

	const offerList = useFetchOfferList(getValidToken)

	if (offerList.isLoading) {
		return (
			<Text>Loading</Text>
		)
	}

    return(
        <SafeAreaView className="w-screen flex-1 items-center justify-center bg-white">
			<Text className="w-5/6 text-4xl font-bold mb-5">Offres d'emploi</Text>
			{
				offerList.data?.map((offer) => {return <OfferCard key={offer.id} offer={offer} />})
			}
        </SafeAreaView>
    )
}

export default Offer;

