import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";
import {UserByPlan} from "../../../model/UserByPlan";

export default function useFetchMatchedUserForOffer(offerId: string, getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["match-list", offerId],
		// TODO put real type and create type
		queryFn: async (): Promise<UserByPlan[]> => {
			return await getAll("http://localhost:8090/api/v1/user/match/" + offerId, getValidToken);
		}
	})

}