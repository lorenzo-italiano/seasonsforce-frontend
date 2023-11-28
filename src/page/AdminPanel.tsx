import React, {useContext} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import useFetchUserToBeRemovedList from "../rest/hook/user/useFetchUserToBeRemovedList";
import {AuthContext} from "../context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useDeleteUser from "../rest/hook/user/useDeleteUser";
import ErrorMessage from "../component/error/Error";

const AdminPanel = () => {

	const { getValidToken } = useContext(AuthContext)
	const navigation = useNavigation()

	const { data, isLoading, isError, error } = useFetchUserToBeRemovedList(getValidToken)
	const deleteUser = useDeleteUser(getValidToken)

	if (isLoading) {
		return (<Text>...Loading</Text>)
	}

	if (isError) {
		return (<ErrorMessage message={error.message || "Une erreur est survenue !"}></ErrorMessage>)
	}

	const handleDeleteUser = async (id: string) => {
		try {
			await deleteUser.mutateAsync(id)
		}
		catch (e) {
			// console.error(e)
			return
		}
	}

	return (
		<SafeAreaView className="w-screen">
			<ScrollView contentContainerStyle={{ display: "flex", justifyContent: "center", marginTop: 10, gap: 10, width: "100%"}}>
				<Pressable className="flex w-full items-start justify-start px-5" onPress={() => navigation.navigate("Profile")}>
					<FontAwesome name="arrow-left" size={32}/>
				</Pressable>

				<Text className="font-bold text-3xl px-5">Panneau d'administration</Text>

				<Text className="text-lg px-5">Demandes de suppressions de comptes</Text>

				<View className="flex flex-col mx-5">
					{data.map((user) => {
						return (
							<View className="flex flex-row items-center justify-between border-2 border-primary rounded-lg p-1" key={user.id}>
								<Text className="ml-2">{user.email}</Text>
								<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={() => handleDeleteUser(user.id)}>
									<Text className="text-center text-background font-bold">Supprimer</Text>
								</Pressable>
							</View>
						)
					})}
				</View>

			</ScrollView>
		</SafeAreaView>
	)
}

export default AdminPanel;