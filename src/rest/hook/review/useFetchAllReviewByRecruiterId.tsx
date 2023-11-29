import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";
import {UserByPlan} from "../../../model/UserByPlan";

export default function useFetchAllReviewByRecruiterId(senderId: string, getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["review-list-by-sender", senderId],
		// TODO put real type and create type
		queryFn: async (): Promise<UserByPlan[]> => {
			return await getAll("http://localhost:8090/api/v1/review/sender/" + senderId, getValidToken);
		},
		enabled: !!senderId
	})

}