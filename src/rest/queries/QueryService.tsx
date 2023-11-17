import axios from "axios";

export async function getAll(endpointUrl: String, getValidToken: () => Promise<string>) {

	let token: String = "Bearer " + await getValidToken()

	// console.log(token)

	const config = {
		headers: {
			Authorization: token,
		}
	}

    const res = await axios.get(endpointUrl, config);

    // console.log(res.data)
    return res.data;
}

export async function post(endpointUrl: String, data: Object, getValidToken: () => Promise<string>) {

	let token: String = "Bearer " + await getValidToken()

	const config = {
		headers: {
			Authorization: token,
		}
	}

	const res = await axios.post(endpointUrl, data, config);

	return res.data;
}

export async function postWithoutAuth(endpointUrl: String, data: Object) {

	const res = await axios.post(endpointUrl, data);

	return res.data;
}



export async function patch(endpointUrl: String, data: Object, getValidToken: () => Promise<string>) {

	let token: String = "Bearer " + await getValidToken()

	const config = {
		headers: {
			Authorization: token,
		}
	}

	const res = await axios.patch(endpointUrl, data, config);

	return res.data;
}

export async function put(endpointUrl: String, data: Object, getValidToken: () => Promise<string>) {

	let token: String = "Bearer " + await getValidToken()

	const config = {
		headers: {
			Authorization: token,
		}
	}

	const res = await axios.put(endpointUrl, data, config);

	return res.data;
}

export async function deleteById(endpointUrl: String, getValidToken: () => Promise<string>) {

	let token: String = "Bearer " + await getValidToken()

	const config = {
		headers: {
			Authorization: token,
		}
	}

	const res = await axios.delete(endpointUrl, config);

	return res.data;
}