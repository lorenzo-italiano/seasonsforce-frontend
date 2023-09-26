import axios from "axios";

const getAllRecruiters = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/recruiter/");
    console.log(res.data);
    return res.data;
}

export default getAllRecruiters;