import React, {useContext, useEffect, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {formatIsoToSimpleDate} from "../../utils/DateHelper";
import {useForm} from "react-hook-form";
import TextInputForm from "../form/input/TextInputForm";
import {AuthContext} from "../../context/AuthContext";
import useAddResponseToReview from "../../rest/hook/review/useAddResponseToReview";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useRemoveResponseToReview from "../../rest/hook/review/useRemoveResponseToReview";

const ReviewCard = ({review}) => {

	const { getUserId, getValidToken } = useContext(AuthContext)

	const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();

	const sendResponse = useAddResponseToReview(getUserId(), review.id, getValidToken)
	const deleteResponse = useRemoveResponseToReview(getUserId(), review.id, getValidToken)

	const handleDeleteResponse = async (response) => {
		try {
			await deleteResponse.mutateAsync(response)
		}
		catch (error) {
			console.error(error.message)
			return
		}

	}

	const onSubmit = async (data) => {
		console.log(data)
		const obj = {
			"message": data.message,
			"senderId": getUserId()
		}

		try {
			await sendResponse.mutateAsync(obj)
			reset()
		}
		catch (error) {
			console.error(error.message)
			return
		}
	}

	return (
		<View className="w-full flex flex-col border-2 border-primary rounded-lg p-2 mb-2">
			<View className="flex-row">
				<View className="flex flex-col justify-center">
					<Text className="font-bold text-lg">{review.sender.firstName} {review.sender.lastName}</Text>
					<Text>{review.sender.role === "recruiter" ? "Recruteur" : ""}</Text>
				</View>
				<View className="flex-col flex-1 ml-5">
					<Text className="font-bold text-lg">{review.offer.job_title}</Text>
					<Text>{review.grade}/5</Text>
					<Text className="whitespace-pre-wrap">{review.message}</Text>
					<Text className="mt-3 w-full">{formatIsoToSimpleDate(review.date)}</Text>
				</View>
			</View>
			<View className="border-t border-primary ">
				<Text className="font-bold text-lg mb-2">Réponses</Text>
				{ review.responseList.map((response) => (
					<View key={response.id} className="flex flex-row mb-2 border-primary border rounded-lg p-2 flex-1 justify-between">
						<Text className="text-sm">{response.message}</Text>
						{ response.senderId === getUserId() &&
							<Pressable onPress={() => handleDeleteResponse(response)}>
								<MaterialCommunityIcons name="delete" size={20} />
							</Pressable>
						}
					</View>
				))}

			</View>
			<View className="flex flex-row flex-1 border-t border-primary mt-5 p-2 justify-center">
				<TextInputForm
					label=""
					name="message"
					control={control}
					rules={{}}
					placeholder="Répondre"
					className="flex-1"
				/>
				<Pressable className="p-2" onPress={handleSubmit(onSubmit)}>
					<Text>Envoyer</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default ReviewCard;