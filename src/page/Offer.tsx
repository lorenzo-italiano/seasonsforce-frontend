import {Pressable, SafeAreaView, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import CandidateOfferList from "../component/list/offer/CandidateOfferList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RecruiterOfferList from "../component/list/offer/RecruiterOfferList";
import {useNavigation} from "@react-navigation/native";
import {OfferDetailRouteParams} from "../model/create/OfferDetailRouteParams";

const Offer = () => {

	const {getUserRole, userToken} = useContext(AuthContext)
	const [role, setRole] = useState<string>(null)
	const navigation = useNavigation()

	useEffect(() => {
		setRole(getUserRole())
	}, [userToken]);

    return(
        <SafeAreaView className="w-screen flex-1 flex bg-background">

			{ role === "candidate" &&
				<>
					<Text className="w-full px-16 text-4xl font-bold my-5">Offres d'emplois</Text>
					<CandidateOfferList />
				</>
			}

			{ role === "recruiter" &&
				<>
					<View className="flex flex-row justify-between items-center w-full px-16">
						<Text className=" text-4xl font-bold my-5">Offres d'emplois de mon entreprise</Text>
						<Pressable onPress={() => {
							const param : OfferDetailRouteParams = {
								initialValues: undefined,
								isUpdate: false
							}
							navigation.navigate("CreateOfferForm", param)
						}}>
							<MaterialCommunityIcons name="plus-circle" size={32}/>
						</Pressable>
					</View>

					<RecruiterOfferList />
				</>
			}

        </SafeAreaView>
    )
}

export default Offer;

