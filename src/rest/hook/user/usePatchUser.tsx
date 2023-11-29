import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";

interface params {
	id: string
	userPatch: Object
}

export default function usePatchUser(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation<Object, Error, params>({
		mutationFn: async (param: params) => {
			return await patch("http://localhost:8090/api/v1/user/" + param.id, param.userPatch, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			return data
		}
	})
}