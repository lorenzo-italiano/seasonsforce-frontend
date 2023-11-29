import React, {useContext, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from "react-native";
import {AuthContext} from "../../../context/AuthContext";
import TextInputForm from "../../../component/form/input/TextInputForm";
import {useForm} from "react-hook-form";
import {useNavigation, useRoute} from "@react-navigation/native";
import usePatchReview from "../../../rest/hook/review/usePatchReview";

const UpdateReview = () => {
	const route = useRoute();
	const { review } = route.params;

	const { getValidToken } = useContext(AuthContext)

	const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();

	const updateReview = usePatchReview(review, getValidToken)

	useEffect(() => {
		setValue("grade", review.grade)
		setValue("message", review.message)
	})

	const navigation = useNavigation()

	const onSubmit = async (data) => {

		const obj = {
			grade: data.grade,
			message: data.message,
		}

		try {
			await updateReview.mutateAsync(obj)
			navigation.navigate("Offer")
		}
		catch (error) {
			console.error(error.message)
			return
		}
	}

	return (
		<SafeAreaView>

			<View className="flex flex-col justify-center h-full px-10">
				<Text className="font-bold text-3xl">Modification d'un avis</Text>

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

				<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={handleSubmit(onSubmit)}>
					<Text className="text-center text-background font-bold text-xl">Modifier</Text>
				</Pressable>
			</View>

		</SafeAreaView>
	)
}

export default UpdateReview;