import React, {useContext, useEffect, useState} from 'react';
import {Pressable, Text} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import TextInputForm from "../../../component/form/input/TextInputForm";
import {useForm} from "react-hook-form";
import useCreateReview from "../../../rest/hook/user/useCreateReview";
import {useNavigation, useRoute} from "@react-navigation/native";

const CreateReview = () => {
	const route = useRoute();
	const { offer } = route.params;

	const { getValidToken } = useContext(AuthContext)

	const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();

	const createReview = useCreateReview(getValidToken)
	const navigation = useNavigation()

	const onSubmit = async (data) => {

		const obj = {
			grade: data.grade,
			message: data.message,
			offerId: offer.id,
			senderId: offer.creatorId,
		}

		try {
			await createReview.mutateAsync({review: obj, userId: offer.recruitedId})
			navigation.navigate("Offer")
		}
		catch (error) {
			console.error(error.message)
			return
		}

	}

	return (
		<>
			<Text>Form to create a review</Text>

			<TextInputForm
				label="Note"
				name="grade"
				control={control}
				rules={{
					required: "La note est requise",
					pattern: {
						value: /^[0-5]$/i,
						message: 'La note doit être comprise entre 0 et 5',
					}
				}}
				placeholder="Note"
			/>

			<TextInputForm
				label="Message"
				name="message"
				control={control}
				rules={{
					required: "le message est requis",
					// pattern: {
					// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					// 	message: 'L\'e-mail n\'est pas valide',
					// }
				}}
				placeholder="Message"
			/>

			<Pressable onPress={handleSubmit(onSubmit)}>
				<Text>Créer</Text>
			</Pressable>

		</>
	)
}

export default CreateReview;