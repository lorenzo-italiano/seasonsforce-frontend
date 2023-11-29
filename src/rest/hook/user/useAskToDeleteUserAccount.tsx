import {useMutation, useQueryClient} from "@tanstack/react-query";
import {post} from "../../queries/QueryService";

export default function useAskToDeleteUserAccount(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id) => {
			return await post("http://localhost:8090/api/v1/user/delete-me/" + id, {}, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			return data
		}
	})
}