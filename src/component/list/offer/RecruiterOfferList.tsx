import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import OfferCard from "../../card/OfferCard";
import useFetchCompanyOfferList from "../../../rest/hook/offer/useFetchCompanyOfferList";
import LoadingSpinner from "../../loading/LoadingSpinner";
import ErrorMessage from "../../error/Error"

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
			<LoadingSpinner/>
		)
	}

	if (isError) {
		return (
			<ErrorMessage message={"Une erreur est survenue !"}></ErrorMessage>
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