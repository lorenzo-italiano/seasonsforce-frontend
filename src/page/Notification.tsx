import {SafeAreaView, Text} from "react-native";
import React from "react";
import NotificationList from "../component/list/NotificationList";

const Notification = () => {

    return(
        <SafeAreaView className="flex-1 w-screen h-screen justify-center bg-white p-6">
            <Text className=" text-4xl font-bold my-5">Mes notifications</Text>
			<NotificationList />
        </SafeAreaView>
    )
}

export default Notification;

