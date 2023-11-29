import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";

export default function useRemoveReferenceToUser(userId: string, getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data) => {
			return await patch("http://localhost:8090/api/v1/user/reference/remove/" + userId, data, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", userId]})
			return data
		}
	})
}