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
			console.error(e)
			return
		}
	}

	return (
		<SafeAreaView className="w-screen">
			<ScrollView contentContainerStyle={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10, gap: 10, width: "100%"}}>
				<Pressable className="items-start justify-start" onPress={() => navigation.navigate("Profile")}>
					<FontAwesome name="arrow-left" size={32}/>
				</Pressable>
				<Text>Admin Panel</Text>

				<Text>Users to be removed</Text>
				{data.map((user) => {
					return (
						<View key={user.id}>
							<Text>{user.email}</Text>
							<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={() => handleDeleteUser(user.id)}>
								<Text className="text-center text-background font-bold">Supprimer</Text>
							</Pressable>
						</View>
					)
				})}
			</ScrollView>
		</SafeAreaView>
	)
}

export default AdminPanel;