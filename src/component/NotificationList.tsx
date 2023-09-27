import React from 'react';
import {Text, FlatList, View, SafeAreaView,} from "react-native";
import useFetchNotificationList from "../rest/hook/useFetchNotificationList";

const NotificationList = () => {

    const notificationList = useFetchNotificationList()

    return(
        <FlatList
            className="flex w-full"
            data={notificationList.data as ArrayLike<any>}
            renderItem={({item}) => {
                return(
                    <SafeAreaView className="border-b border-gray-300 p-2 ml-2 mr-2">
                        <Text className="font-bold">{item.title}</Text>
                        <Text>{item.content}</Text>
                    </SafeAreaView>
                )
            }}
        />
    )
}

export default NotificationList;
