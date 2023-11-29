import React, {useContext} from 'react';
import {FlatList} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import useFetchOfferList from "../../../rest/hook/offer/useFetchOfferList";
import OfferCard from "../../card/OfferCard";
import LoadingSpinner from "../../loading/LoadingSpinner";
import ErrorMessage from "../../error/Error";

const AdminOfferList = () => {

	const { getValidToken } = useContext(AuthContext)

	const { data, isLoading, isError } = useFetchOfferList(getValidToken)

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

export default AdminOfferList;