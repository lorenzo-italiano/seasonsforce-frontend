import {Button, SafeAreaView, Text} from "react-native";
import React, {useContext} from "react";
import {logout} from "../auth/Auth";
import {AuthContext} from "../context/AuthContext";

const Profile = () => {

	const { logout } = useContext(AuthContext)

	// const handleLogout = async () => {
	// 	await logout()
	//
	// 	onLogout()
	// }


    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                Profile
            </Text>

			<Button title="dicconnect" onPress={logout} />

        </SafeAreaView>
    )
}

export default Profile;

