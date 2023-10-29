import {SafeAreaView, Text} from "react-native";
import React from "react";
import useFetchOfferList from "../rest/hook/useFetchOfferList";

const Jobs = () => {

	const offerList = useFetchOfferList()


    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                Job List
            </Text>

        </SafeAreaView>
    )
}

export default Jobs;

