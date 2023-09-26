import {SafeAreaView, Text} from "react-native";
import Test from "../Test";
import RecruiterList from "../component/RecruiterList";
import {StatusBar} from "expo-status-bar";
import useFetchRecruiterList from "../rest/hook/useFetchRecruiterList";
import React from "react";
import NotificationList from "../component/NotificationList";

const Notification = () => {

    // const recruiterList = useFetchRecruiterList()

    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                geosgioseioefsgjoiefsjiosefjio
            </Text>

            <NotificationList />

        </SafeAreaView>
    )
}

export default Notification;

