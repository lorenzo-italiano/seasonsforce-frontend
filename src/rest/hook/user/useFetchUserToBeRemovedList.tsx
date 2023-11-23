import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";

export default function useFetchUserToBeRemovedList(getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["user-to-remove-list"],
		// TODO put real type and create type
		queryFn: async (): Promise<Object[]> => {
			return await getAll("http://localhost:8090/api/v1/user/to-be-removed", getValidToken);
		}
	})

}