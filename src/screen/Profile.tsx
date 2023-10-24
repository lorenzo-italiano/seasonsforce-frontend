import {Button, SafeAreaView, Text} from "react-native";
import React from "react";
import {logout} from "../auth/Auth";

const Profile = ({ onLogout }) => {

	const handleLogout = async () => {
		await logout()

		onLogout()
	}


    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                Profile
            </Text>

			<Button title="dicconnect" onPress={handleLogout} />

        </SafeAreaView>
    )
}

export default Profile;

