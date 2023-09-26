import {SafeAreaView, Text} from "react-native";
import Test from "../Test";
import RecruiterList from "../RecruiterList";
import {StatusBar} from "expo-status-bar";
import useFetchRecruiterList from "../rest/hook/useFetchRecruiterList";
import React from "react";

const Notification = () => {

    // const recruiterList = useFetchRecruiterList()

    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                geosgioseioefsgjoiefsjiosefjio
            </Text>

        </SafeAreaView>
    )
}

export default Notification;

