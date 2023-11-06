import axios from "axios";

export async function getAll(endpointUrl: String, getValidToken: () => Promise<string>) {

	let token: String = "Bearer " + await getValidToken()
	//
	console.log(token)
	//
	const config = {
		headers: {
			Authorization: token,
		}
	}

    const res = await axios.get(endpointUrl, config);

    console.log(res.data)
    return res.data;
}