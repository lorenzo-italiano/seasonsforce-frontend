import {Button, Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {logout} from "../auth/Auth";
import {AuthContext} from "../context/AuthContext";
import LanguageSelector from "../component/i18n/LanguageSelector";
import defaultProfilePicture from "../../assets/images/default-profile-picture.png";
import useAskToDeleteUserAccount from "../rest/hook/user/useAskToDeleteUserAccount";
import {useNavigation} from "@react-navigation/native";

const Profile = () => {

	const { logout, getUserById, getValidToken, getUserRole } = useContext(AuthContext)

	const [user, setUser] = useState(null)
	const [userRole, setUserRole] = useState(null)
	// const [profilePicture, setProfilePicture ] = useState<string>(null)
	const [toBeRemoved, setToBeRemoved] = useState(null)
	const askToDelete = useAskToDeleteUserAccount(getValidToken)
	const navigation = useNavigation()

	const getUserInfos = async () => {
		const user = await getUserById()
		setToBeRemoved(user.toBeRemoved ?? false)
		setUser(user)
		setUserRole(getUserRole())
	}

	useEffect(() => {
		getUserInfos()
	}, [])

	const askToDeleteAccount = async () => {
		try {
			await askToDelete.mutateAsync(user.id)
			await getUserInfos()
		}
		catch (e) {
			// console.error(e)
			return
		}
	}

	// const handleLogout = async () => {
	// 	await logout()
	//
	// 	onLogout()
	// }


    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
			<ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10}}>
				{ user !== null && user.profilePictureUrl &&
					<Image source={{uri: user.profilePictureUrl}} style={{width: 200, height: 200}} />
				}
				{ user !== null && user.profilePictureUrl === null &&
					<Image source={defaultProfilePicture} style={{width: 200, height: 200}} />
				}

				{/*{ user.profilePictureUrl === null && <Image source={{uri: user.profilePictureUrl}} style={{width: 200, height: 200}} /> }`*/}

				{/*{ user.profilePictureUrl !== null && <Image source={require('../../assets/images/default-profile-picture.png')} style={{width: 200, height: 200}} /> }*/}

				{/*<Text>{user}</Text>*/}

				<LanguageSelector />

				{ userRole !== "admin" && toBeRemoved &&
					<Text className="text-center font-bold">Votre demande de suppression à bien été prise en compte</Text>
				}

				{ userRole !== "admin" && !toBeRemoved &&
					<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={askToDeleteAccount}>
						<Text className="text-center text-background font-bold text-xl">Supprimer mon compte</Text>
					</Pressable>
				}

				{ userRole === "admin" &&
					<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={() => navigation.navigate("AdminPanel")}>
						<Text className="text-center text-background font-bold text-xl">Accéder au panel d'administateur</Text>
					</Pressable>
				}

				{/*{(userRole === "recruiter" || userRole === "candidate") &&*/}
				{/*	<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={() => navigation.navigate("CreateOfferForm")}>*/}
				{/*		<Text className="text-center text-background font-bold text-xl">Créer une offre</Text>*/}
				{/*	</Pressable>*/}
				{/*}*/}

				{(userRole === "recruiter" || userRole === "candidate") &&
					<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={() => navigation.navigate("ProfilePage")}>
						<Text className="text-center text-background font-bold text-xl">Mon Profil</Text>
					</Pressable>
				}


				<Pressable className="border-primary rounded-lg bg-primary p-2" onPress={logout}>
					<Text className="text-center text-background font-bold text-xl">Deconnexion</Text>
				</Pressable>

			</ScrollView>



        </SafeAreaView>
    )
}

export default Profile;

