import React from 'react';
import {Text, FlatList,} from "react-native";
import useFetchNotificationList from "../rest/hook/useFetchNotificationList";

const NotificationList = () => {

    const notificationList = useFetchNotificationList()

    return(
        <FlatList
            data={notificationList.data as ArrayLike<any>}
            renderItem={({item}) => <Text>{item.title} {item.content}</Text>}
        />
    )
}

export default NotificationList;
