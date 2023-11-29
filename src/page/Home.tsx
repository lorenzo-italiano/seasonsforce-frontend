import {Image, SafeAreaView, Text} from "react-native";
import Logo from "../../assets/logo.png"
import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {Notification as NotificationModel} from "../model/notification/Notification";
import useNotificationSSE from "../rest/hook/notification/useNotificationSSE";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

const Home = () => {

	const { getUserId, getValidToken, isRegistered, isUserAuthenticated } = useContext(AuthContext)

	const {data} = useNotificationSSE(getUserId(), getValidToken)

    const navigation = useNavigation();

    useEffect(() => {
        if (!data) return;
        data.onmessage = (event) => {
            const notification: NotificationModel = JSON.parse(event.data);
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
            <Image source={Logo} style={{width: 200, height: 200}} />
            <Text className="text-4xl font-bold my-5">Bienvenue sur SeasonsForce !</Text>
        </SafeAreaView>
    )
}

export default Home;

