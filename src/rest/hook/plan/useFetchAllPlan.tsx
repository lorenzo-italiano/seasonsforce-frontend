import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";

export default function useFetchAllPlan(getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["plan-list"],
		queryFn: async (): Promise<Object[]> => {
			return await getAll("http://localhost:8090/api/v1/plan/", getValidToken);
		}
	})

}