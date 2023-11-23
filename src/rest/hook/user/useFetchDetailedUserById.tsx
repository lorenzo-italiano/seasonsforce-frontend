import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";

export default function useFetchDetailedUserById(getValidToken: () => Promise<string>, userId: string) {

	return useQuery({
		queryKey: ["user-detailed", userId],
		// TODO put real type and create type
		queryFn: async (): Promise<Object[]> => {
			return await getAll("http://localhost:8090/api/v1/user/detailed/" + userId, getValidToken);
		},
		enabled: !!userId
	})

}