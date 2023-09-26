import React, {Component} from 'react';
import {Text, FlatList, SafeAreaView} from "react-native";
import useFetchRecruiterList from "../rest/hook/useFetchRecruiterList";

const RecruiterList = () => {

    const recruiterList = useFetchRecruiterList()

    return(
        <FlatList
            data={recruiterList.data as ArrayLike<any>}
            renderItem={({item}) => <Text>{item.firstName} {item.surName}</Text>}
        />
    )
}

export default RecruiterList;
