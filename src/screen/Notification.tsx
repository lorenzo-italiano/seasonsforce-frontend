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
        <SafeAreaView className="flex-1 w-screen h-screen items-center justify-center bg-white">
        </SafeAreaView>
    )
}

export default Notification;

