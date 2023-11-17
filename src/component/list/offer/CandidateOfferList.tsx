import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import useFetchOfferList from "../../../rest/hook/offer/useFetchOfferList";
import OfferCard from "../../card/OfferCard";

const CandidateOfferList = () => {

	const { getValidToken } = useContext(AuthContext)

	const { data, isLoading, isError } = useFetchOfferList(getValidToken)

	if (isLoading) {
		return (
			<Text>Loading</Text>
		)
	}

	if (isError) {
		return (
			<Text>Error</Text>
		)
	}

	return (
		<FlatList
			className="px-16"
			data={data}
			renderItem={({item}) => <OfferCard key={item.id} offer={item}/>}
		/>
	)

}

export default CandidateOfferList;