import React, {useContext} from 'react';
import {FlatList, SafeAreaView, Text} from "react-native";
import { parseISO, format } from "date-fns";
import {AuthContext} from "../../context/AuthContext";
import LoadingSpinner from "../loading/LoadingSpinner";
import useFetchAllNotificationByReceiverId from "../../rest/hook/notification/useFetchAllNotificationByReceiverId";
import ErrorMessage from "../error/Error";

const NotificationList = ({}) => {

    const { getValidToken, getUserId } = useContext(AuthContext)

    const { data, isLoading, isError } = useFetchAllNotificationByReceiverId(getUserId(), getValidToken)

    const formatDate = (isoString: string): string => {
        const date = parseISO(isoString);
        return format(date, "dd/MM/yyyy 'à' HH:mm:ss");
    };

    if (isLoading) {
        return (
            <LoadingSpinner/>
        )
    }

    if (isError) {
        return (
            <ErrorMessage message={"Une erreur est survenue !"}></ErrorMessage>
        )
    }

    return(
        // Render a flatlist with all notifications ordered by date (most recent first)
        <FlatList
            className="flex w-full"
            data={data?.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })}
            renderItem={({item}) => {
                return(
                    <SafeAreaView className="border-b border-gray-300 p-2">
                        <Text className="font-bold">{item.category}</Text>
                        <Text>{item.message}</Text>
                        <Text className="italic text-xs mt-2 text-light-gray">{formatDate(item.date.toString())}</Text>
                    </SafeAreaView>
                )
            }}
        />
    );
}

export default NotificationList;