import {useQuery} from "@tanstack/react-query";
import getAllRecruiters from "../queries/RecruiterQueries";

export default function useFetchRecruiterList() {
    return useQuery({
        queryKey: ["recruiter-list"],
        queryFn: async (): Promise<number> => {
            return await getAllRecruiters();
        }
    })

}