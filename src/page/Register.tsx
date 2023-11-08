import {
	View,
	Text,
	SafeAreaView,
	Image,
	Pressable,
	TouchableOpacity, ScrollView
} from 'react-native';
import Logo from "../../assets/logo.png"
import React, {useRef, useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Platform } from 'react-native';
import RegisterFormFirstStep from "../component/registerform/RegisterFormFirstStep";
import RegisterFormSecondStep from "../component/registerform/RegisterFormSecondStep";
import {formatDateToISO} from "../utils/DateHelper";
import axios from "axios";

interface FirstStepData {
	email: string
	password: string
}

function Register() {

	const firstStepRef = useRef();
	const secondStepRef = useRef();

	const [step, setStep] = useState<number>(1)
	const [role, setRole] = useState<string>("candidate")
	const [firstStepData, setFirstStepData] = useState<FirstStepData>(null)

	const onSubmitFirstStep = async (data) => {

		if (data.password !== data.confirmPassword) {
			if (firstStepRef.current) {
				console.log("here")
				firstStepRef.current.setError('password', {
					type: 'manual',
					message: 'Les mots de passe doivent être identiques !',
				});

				firstStepRef.current.setError('confirmPassword', {
					type: 'manual',
					message: 'Les mots de passe doivent être identiques !',
				})
			}
		}
		else {
			setFirstStepData({
				email: data.email,
				password: data.password
			})
			setStep(2)
		}

	}

	const onSubmitSecondStep = async (data) => {
		console.log("Test")

		console.log(data.gender); // Replace by 0 or 1
		console.log(data.birthdate); // Replace by a date generated by DD/MM/YYYY

		const isoTimestamp = formatDateToISO(data.birthdate);

		if (isoTimestamp !== null) {
			console.log(isoTimestamp);
		} else {
			console.log('Date invalide');
			// TODO Indicate an error
			return
		}

		// http://localhost:8090/api/v1/user/auth/register
		if (role === "candidate" || role === "recruiter"){
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			};

			const obj = {
				"email": firstStepData.email,
				"password": firstStepData.password,
				"phone": data.phone,
				"gender": 1,
				"firstName": data.firstName,
				"lastName": data.lastName,
				"citizenship": data.citizenship,
				"birthdate": isoTimestamp,
				"role": role
			}

			try {
				const resp = await axios.post("http://localhost:8090/api/v1/user/auth/register", obj, config);
				// Traitez la réponse réussie ici
				console.log("Réponse réussie : ", resp.data);
			} catch (error) {
				if (error.response) {
					// Erreur de réponse HTTP (statut de réponse différent de 2xx)
					console.error("Erreur de réponse HTTP : ", error.response.status, error.response.data);
					return
				} else if (error.request) {
					// Erreur de demande (pas de réponse reçue)
					console.error("Erreur de demande : ", error.request);
					return
				} else {
					// Erreur lors de la configuration de la requête
					console.error("Erreur lors de la configuration de la requête : ", error.message);
					return
				}
			}

			setStep(3)
		}


	}

	return (
		<SafeAreaView className="w-screen h-screen bg-background">

			{step === 2 &&
				<Pressable className="flex w-full px-4" onPress={() => setStep(prevState => prevState - 1)}>
					<FontAwesome className="w-full justify-start" name="arrow-left" size={32}/>
				</Pressable>
			}

			<ScrollView className="flex-col w-full h-full" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
				<View className="flex-col items-center mb-10">
					<Image source={Logo} className="w-40 h-40" />
					<Text className="text-4xl font-bold">Création de compte</Text>
				</View>

				<View className={`flex items-center justify-center ${Platform.OS === "web" ? "w-2/5" : "w-full"}`}>
					<View className="flex w-1/2 items-center justify-center flex-row border rounded-2xl">
						<TouchableOpacity className="w-1/2 h-10" onPress={() => setRole("candidate")}>
							<View className={`flex items-center justify-center w-full h-full rounded-2xl ${role === "candidate" ? "bg-primary" : "bg-background"}`}>
								<Text className={`font-bold text-xl ${role === "candidate" ? "text-background" : "text-black"}`}>Candidat</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity className="w-1/2 h-10" onPress={() => setRole("recruiter")}>
							<View className={`flex items-center justify-center w-full h-full rounded-2xl ${role === "recruiter" ? "bg-primary" : "bg-background"}`}>
								<Text className={`font-bold text-xl ${role === "recruiter" ? "text-background" : "text-black"}`}>Recruteur</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				{ step === 1 &&
					<RegisterFormFirstStep ref={firstStepRef} onSubmitFirstStep={onSubmitFirstStep} />
				}

				{ step === 2 &&
					<RegisterFormSecondStep ref={secondStepRef} onSubmitSecondStep={onSubmitSecondStep} />
				}

				{ step === 3 && role === "candidate" &&
					<Text>Candidate</Text>
				}

				{ step === 3 && role === "recruiter" &&
					<Text>Recruiter</Text>
				}

			</ScrollView>

		</SafeAreaView>
	)
}

export default Register
