import React, {useContext, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, Image} from "react-native";
import {AuthContext} from "../../context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CandidateProfile from "../../component/profile/CandidateProfile";
import RecruiterProfile from "../../component/profile/RecruiterProfile";

const ProfilePage = () => {

	const { getUserById, getValidToken, getUserRole } = useContext(AuthContext)

	const [user, setUser] = useState(null)
	const [userRole, setUserRole] = useState(null)
	const navigation = useNavigation()

	const getUserInfos = async () => {
		const user = await getUserById()
		setUser(user)
		setUserRole(getUserRole())
	}

	useEffect(() => {
		getUserInfos()
	}, [])

	return (
		<SafeAreaView className="flex flex-col items-center w-screen flex-1 bg-white gap-y-5">
			{ userRole === "candidate" &&
				<CandidateProfile />
			}
			{ userRole === "recruiter" &&
				<RecruiterProfile />
			}
		</SafeAreaView>
	)
}

export default ProfilePage;