import axios from "axios";

export const getAll = async (endpointUrl: String) => {
    const res = await axios.get(endpointUrl);
    console.log(res.data)
    return res.data;
}