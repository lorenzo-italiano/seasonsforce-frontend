import {Image, SafeAreaView, Text} from "react-native";
import Logo from "../../../assets/logo.png"
import React from "react";

const ErrorMessage = ({message}) => {
    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Image source={Logo} style={{width: 100, height: 100}} />
            <Text className="text-4xl font-bold my-5 text-accent-orange">{message}</Text>
        </SafeAreaView>
    )
}

export default ErrorMessage;

