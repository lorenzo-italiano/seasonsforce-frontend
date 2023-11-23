import React, {useContext, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, Image} from "react-native";
import {AuthContext} from "../../context/AuthContext";
import defaultProfilePicture from "../../../assets/images/default-profile-picture.png";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CandidateProfile from "../../component/profile/CandidateProfile";

const ProfilePage = () => {

	const { getUserById, getValidToken, getUserRole } = useContext(AuthContext)

	const [user, setUser] = useState(null)
	const [userRole, setUserRole] = useState(null)
	const [profilePicture, setProfilePicture] = useState(null)
	const navigation = useNavigation()

	const getUserInfos = async () => {
		const user = await getUserById()
		console.log(user)
		setProfilePicture(user.profilePictureUrl ?? defaultProfilePicture)
		setUser(user)
		setUserRole(getUserRole())
	}

	useEffect(() => {
		getUserInfos()
	}, [])

	return (
		<SafeAreaView>
			<ScrollView>
				<Text>Profile Page</Text>
				<Image source={{uri: profilePicture}} style={{width: 200, height: 200}} />

				{ userRole === "candidate" &&
					<CandidateProfile />
				}

			</ScrollView>
		</SafeAreaView>
	)
}

export default ProfilePage;