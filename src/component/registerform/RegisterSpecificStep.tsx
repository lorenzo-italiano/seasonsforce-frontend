import {SafeAreaView, Text} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import RegisterFormCandidateStep from "./specificforms/RegisterFormCandidateStep";
import RegisterFormRecruiterStep from "./specificforms/RegisterFormRecruiterStep";


const RegisterSpecificStep = () => {

	const { getUserRole } = useContext(AuthContext)

	return (
		<>
			{ getUserRole() === "candidate" ?  <RegisterFormCandidateStep /> : <RegisterFormRecruiterStep /> }
		</>
	)
}

export default RegisterSpecificStep;