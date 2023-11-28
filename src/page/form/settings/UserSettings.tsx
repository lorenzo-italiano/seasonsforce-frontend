import {Pressable, SafeAreaView, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const UserSettings = () => {

	const navigation = useNavigation()

	return (
		<SafeAreaView>
			<Pressable onPress={() => navigation.navigate("ProfilePage")}>
				<MaterialCommunityIcons name="arrow-left" size={32} />
			</Pressable>
			<Text>Settings page</Text>
		</SafeAreaView>
	)
}

export default UserSettings;