import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import useFetchOfferList from "../../../rest/hook/offer/useFetchOfferList";
import OfferCard from "../../card/OfferCard";
import useFetchCompanyOfferList from "../../../rest/hook/offer/useFetchCompanyOfferList";

const RecruiterOfferList = () => {

	const { getValidToken, getUserCompanyId } = useContext(AuthContext)

	const [companyId, setCompanyId] = useState<string>(null)

	const { data, isLoading, isError } = useFetchCompanyOfferList(companyId, getValidToken)

	useEffect(() => {
		const getCompanyId = async () => {
			setCompanyId(await getUserCompanyId())
		}

		getCompanyId()
	}, [])

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

export default RecruiterOfferList;