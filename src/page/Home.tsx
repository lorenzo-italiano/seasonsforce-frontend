import {SafeAreaView, Text} from "react-native";
import Test from "../Test";
import RecruiterList from "../component/RecruiterList";
import {StatusBar} from "expo-status-bar";
import useFetchRecruiterList from "../rest/hook/useFetchRecruiterList";
import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";

const Home = () => {

	const { getUserById, isRegistered, isUserAuthenticated, userToken } = useContext(AuthContext)

	useEffect(() => {
		async function test() {
			console.log("is registered ? " + await isRegistered())
			console.log("is user authenticated ? " + isUserAuthenticated)
		}

		test()

	}, [])

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

