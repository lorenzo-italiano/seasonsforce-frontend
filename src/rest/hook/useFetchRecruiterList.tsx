import {useQuery} from "@tanstack/react-query";
import {getAll} from "../queries/RecruiterQueries";

export default function useFetchRecruiterList() {
    return useQuery({
        queryKey: ["recruiter-list"],
        queryFn: async (): Promise<number> => {
            return await getAll("http://localhost:8080/api/v1/recruiter/");
        }
    })

}