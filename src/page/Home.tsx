import {SafeAreaView, Text} from "react-native";
import Test from "../Test";
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {Notification as NotificationModel} from "../model/notification/Notification";
import useNotificationSSE from "../rest/hook/notification/useNotificationSSE";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

const Home = () => {

	const { getUserId, getValidToken, getUserById, isRegistered, isUserAuthenticated, userToken } = useContext(AuthContext)

	const {data} = useNotificationSSE(getUserId(), getValidToken)

    const navigation = useNavigation();

	useEffect(() => {
		async function test() {
			console.log("is registered ? " + await isRegistered())
			console.log("is user authenticated ? " + isUserAuthenticated)
		}

		test()

	}, [])

    useEffect(() => {
        if (!data) return;
        data.onmessage = (event) => {
            const notification: NotificationModel = JSON.parse(event.data);
            console.log(notification);
            Toast.show({
                type: 'info',
                text1: notification.category,
                text2: notification.message,
                position: 'top',
                onPress: () => {
                    navigation.navigate("Notifications")
                }
            });
        };

        return () => {
            data.close();
        };
    }, [data]);


    // const recruiterList = useFetchRecruiterList()

    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                Open up App.js to start working on your app!
            </Text>
            <Test></Test>

            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

export default Home;

