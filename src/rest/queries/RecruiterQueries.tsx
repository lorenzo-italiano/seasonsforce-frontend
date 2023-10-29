import axios from "axios";
import {getToken} from "../../auth/Auth";

export const getAll = async (endpointUrl: String) => {

	// console.log("here")

	let token: String = "Bearer " + await getToken()
	//
	console.log(token)
	//
	const config = {
		headers: {
			Authorization: token,
		}
	}

	console.log("here")

    const res = await axios.get(endpointUrl, config);

	console.log("there")
    console.log(res.data)
    return res.data;
}