import {Image, SafeAreaView, Text} from "react-native";
import React from "react";
import Logo from "../../assets/logo.png";

const Conversation = () => {


    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Image source={Logo} style={{width: 100, height: 100}} />
            <Text className="text-xl font-bold my-5">Désolé, mais cette fonctionnalité n'est pas encore là !</Text>
        </SafeAreaView>
    )
}

export default Conversation;

